import { Request, Response } from 'express';
import apiResponse from '../services/api';
import { PokemonAPIResponse, PokemonInfoResponse } from '../types/Pokemon';
import { pokemonCache } from '../middleware';
import { POKEMON_API, capitalize } from '../helpers';
import { isAxiosError } from 'axios';

export const pokemonController = async (
  req: Request<{
    pokemonName: string;
  }>,
  res: Response,
) => {
  try {
    const { pokemonName } = req.params;

    const { data, success, error } = await apiResponse<PokemonAPIResponse>(
      `${POKEMON_API}${pokemonName}`,
    );

    if (success && data) {
      const returnData: PokemonInfoResponse = {
        id: data.id,
        height: data.height / 10,
        weight: data.weight / 10,
        name: capitalize(data.name),
        abilities: data.abilities.map(item => capitalize(item.ability.name)),
        types: data.types.map(typeItem => capitalize(typeItem.type.name)),
        image: data.sprites.other['official-artwork'].front_default,
        stats: data.stats.map(stat => ({
          label: capitalize(stat.stat.name),
          value: stat.base_stat,
        })),
      };

      pokemonCache.set(pokemonName, returnData);
      res.send(returnData);
      res.status(200);
    } else {
      res.status(error?.response?.status || 500);
      res.send({ error: 'Pokémon not found!' });
    }
  } catch (err) {
    if (isAxiosError(err)) {
      res.status(err.response?.status || 404);
      res.send({ error: 'Pokémon not found!' });

      throw err;
    }

    res.status(500);

    throw err;
  }
};
