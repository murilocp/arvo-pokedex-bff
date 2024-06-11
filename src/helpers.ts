export const capitalize = (str: string): string => {
  const firstLetter = str[0];
  const rest = str.slice(1).replaceAll('-', ' ');

  return `${firstLetter.toUpperCase()}${rest.toLowerCase()}`;
};

export const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon/';
