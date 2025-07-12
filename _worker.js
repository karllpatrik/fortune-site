// Данные персонажей
const characters = {
  "crystal-ball": {
    "greeting": "Привет, я магический шар. Задай мне вопрос",
    "personaPrompt": "ты - магический шар, который стоит на столе гадалки.\r\nК тебе пришел страждущий путник со своим вопросом. \r\nСделай для него предсказание и ответь на его вопрос\r\nВот его вопрос:",
    "bg": "/bg/crystal-ball.jpg"
  },
  "magic-lamp": {
    "greeting": "Привет, я волшебная лампа. Задай мне вопрос",
    "personaPrompt": "ты - волшебная лампа, которая стоит на столе гадалки.\r\nК тебе пришел страждущий путник со своим вопросом. \r\nСделай для него предсказание и ответь на его вопрос\r\nВот его вопрос:",
    "bg": "/bg/magic-lamp.jpg"
  }
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;

    // API для получения данных персонажей
    if (pathname === '/characters') {
      return Response.json(characters);
    }

    // API для обработки вопросов
    if (pathname === '/ask' && request.method === 'POST') {
      try {
        console.log('API keys available:', !!env.GEMINI_API_KEY, !!env.GEMINI_MODEL);
        
        const { slug, question } = await request.json();
        
        if (!env.GEMINI_API_KEY || !env.GEMINI_MODEL) {
          // Временный mock ответ для тестирования с задержкой
          await new Promise(resolve => setTimeout(resolve, 2000)); // 2 секунды задержки
          const mockAnswer = `🔮 Магический ${slug === 'crystal-ball' ? 'шар' : 'лампа'} отвечает: "${question}" - интересный вопрос! Звезды говорят, что будущее полно возможностей. Верьте в себя и двигайтесь вперед! ✨`;
          return Response.json({ answer: mockAnswer });
        }
        
        if (!slug || !question) {
          return new Response('Missing slug or question', { status: 400 });
        }

        const character = characters[slug];
        if (!character) {
          return new Response('Unknown slug', { status: 404 });
        }

        const { personaPrompt } = character;
        
        const body = {
          contents: [
            { 
              parts: [{ text: `${personaPrompt}\n\nВопрос: ${question}` }] 
            }
          ]
        };

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${env.GEMINI_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
          }
        );

        if (!response.ok) {
          const errorData = await response.text();
          console.error('Gemini API error:', response.status, errorData);
          throw new Error(`Gemini API error: ${response.status} - ${errorData}`);
        }

        const data = await response.json();
        const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Магический предмет не отвечает...';

        return Response.json({ answer });
      } catch (error) {
        console.error('Error in ask function:', error);
        return new Response(`Internal server error: ${error.message}`, { status: 500 });
      }
    }

    // Для всех остальных запросов возвращаем index.html (SPA)
    return env.ASSETS.fetch(request);
  }
}