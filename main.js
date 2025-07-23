let charactersData = null;
let currentCharacter = null;
let isAsked = false;
let isWaitingForAnswer = false;

async function loadCharacters() {
    try {
        const response = await fetch('/characters');
        charactersData = await response.json();
    } catch (error) {
        console.error('Failed to load characters:', error);
        showError();
    }
}

function getSlugFromPath() {
    const path = window.location.pathname;
    if (path === '/') return null;
    return path.replace(/^\/+|\/+$/g, '');
}

function showError() {
    document.getElementById('container').classList.add('hidden');
    document.getElementById('error-page').classList.remove('hidden');
}

function setBackground(bgUrl) {
    const background = document.getElementById('background');
    background.style.backgroundImage = `url('${bgUrl}')`;
}

function addMessage(content, isUser = false) {
    const messagesContainer = document.getElementById('messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'character-message'}`;
    messageDiv.textContent = content;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideInput() {
    document.getElementById('input-container').style.display = 'none';
}

function showWaitingState() {
    const button = document.getElementById('ask-button');
    const input = document.getElementById('question-input');
    
    button.innerHTML = 'Ожидаем ответ... ⏳';
    button.disabled = true;
    input.disabled = true;
    isWaitingForAnswer = true;
}

function resetToInitialState() {
    const button = document.getElementById('ask-button');
    const input = document.getElementById('question-input');
    const messagesContainer = document.getElementById('messages');
    const inputContainer = document.getElementById('input-container');
    
    // Очищаем сообщения
    messagesContainer.innerHTML = '';
    
    // Сбрасываем состояние кнопки и инпута
    button.textContent = 'Спросить';
    button.disabled = false;
    input.disabled = false;
    input.value = '';
    
    // Показываем контейнер ввода
    inputContainer.style.display = 'flex';
    
    // Сбрасываем флаги
    isAsked = false;
    isWaitingForAnswer = false;
    
    // Показываем приветствие заново
    if (charactersData && currentCharacter) {
        const character = charactersData[currentCharacter];
        addMessage(character.greeting);
    }
}

async function askQuestionWithRetry(question, maxRetries = 2) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const response = await fetch('/ask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    slug: currentCharacter,
                    question: question
                })
            });
            
            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                // Если ответ не JSON (например, HTML страница ошибки)
                console.error(`Попытка ${attempt}: Сервер вернул не JSON`, response.status, response.statusText);
                if (attempt === maxRetries) {
                    addMessage('Произошла ошибка при обращении к магическому предмету. Возможно, требуется VPN.');
                    hideInput();
                    return;
                }
                continue; // Переходим к следующей попытке
            }
            
            if (response.ok && data.answer) {
                addMessage(data.answer);
                hideInput();
                return;
            } else {
                console.warn(`Попытка ${attempt} не удалась:`, {
                    status: response.status,
                    statusText: response.statusText,
                    data: data
                });
                if (attempt === maxRetries) {
                    addMessage('Магический предмет не может ответить прямо сейчас. Попробуйте позже.');
                    hideInput();
                    return;
                }
            }
        } catch (error) {
            console.error(`Попытка ${attempt} не удалась:`, error);
            console.error('Детали ошибки:', {
                name: error.name,
                message: error.message,
                stack: error.stack
            });
            if (attempt === maxRetries) {
                addMessage('Произошла ошибка при обращении к магическому предмету. Возможно, требуется VPN.');
                hideInput();
                return;
            }
        }
        
        // Увеличенная задержка перед повторной попыткой
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
}

async function askQuestion() {
    if (isAsked) return;
    
    const questionInput = document.getElementById('question-input');
    const question = questionInput.value.trim();
    
    if (!question) return;
    
    addMessage(question, true);
    showWaitingState();
    isAsked = true;
    
    await askQuestionWithRetry(question);
}

function init() {
    const slug = getSlugFromPath();
    
    if (!slug) {
        showError();
        return;
    }
    
    loadCharacters().then(() => {
        if (!charactersData || !charactersData[slug]) {
            showError();
            return;
        }
        
        currentCharacter = slug;
        const character = charactersData[slug];
        
        setBackground(character.bg || `/items/${slug}/image.jpg`);
        
        // Сбрасываем к начальному состоянию при загрузке/перезагрузке
        resetToInitialState();
        
        document.getElementById('ask-button').addEventListener('click', askQuestion);
        document.getElementById('question-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                askQuestion();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', init);