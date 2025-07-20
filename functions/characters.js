import charactersData from '../public/characters.json';

export function onRequest() {
  return Response.json(charactersData);
}