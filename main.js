let charactersData = null;
let currentCharacter = null;
let isAsked = false;

async function loadCharacters() {
    try {
        const response = await fetch('/api/characters');
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

async function askQuestion() {
    if (isAsked) return;
    
    const questionInput = document.getElementById('question-input');
    const question = questionInput.value.trim();
    
    if (!question) return;
    
    addMessage(question, true);
    isAsked = true;
    
    try {
        const response = await fetch('/api/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                slug: currentCharacter,
                question: question
            })
        });
        
        const data = await response.json();
        addMessage(data.answer);
        hideInput();
    } catch (error) {
        console.error('Failed to ask question:', error);
        addMessage('Произошла ошибка при обращении к магическому предмету.');
        hideInput();
    }
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
        
        setBackground(`/items/${slug}/image.jpg`);
        addMessage(character.greeting);
        
        document.getElementById('ask-button').addEventListener('click', askQuestion);
        document.getElementById('question-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                askQuestion();
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', init);