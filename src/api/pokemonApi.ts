import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonApi = axios.create({
  baseURL: BASE_URL,
});
