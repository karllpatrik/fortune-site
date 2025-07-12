// API endpoint для получения данных персонажей
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

export async function onRequest({ request }) {
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  return Response.json(characters);
}