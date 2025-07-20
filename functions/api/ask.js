// Данные персонажей из JSON файла
import charactersData from '../../public/characters.json';
const characters = charactersData;

export async function onRequest({ request, env }) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { slug, question } = await request.json();
    
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
          role: "user", 
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
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Магический предмет не отвечает...';

    return Response.json({ answer });
  } catch (error) {
    console.error('Error in ask function:', error);
    return new Response('Internal server error', { status: 500 });
  }
}