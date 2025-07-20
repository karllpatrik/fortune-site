// API endpoint для получения данных персонажей
import charactersData from '../../public/characters.json';

export async function onRequest({ request }) {
  if (request.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  return Response.json(charactersData);
}