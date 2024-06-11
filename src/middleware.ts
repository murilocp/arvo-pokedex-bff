import { isAxiosError } from 'axios';
import { Request, Response, NextFunction } from 'express';
import Cache from 'node-cache';

export const pokemonCache = new Cache({ stdTTL: 60 * 5 });

export const pokemonCacheMiddleware = (
  req: Request<{
    pokemonName: string;
  }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { pokemonName } = req.params;

    if (pokemonCache.has(pokemonName)) {
      return res.send(pokemonCache.get(pokemonName)).status(200);
    }

    return next();
  } catch (err) {
    if (isAxiosError(err)) {
      res.status(err.response?.status || 404);
      res.send({ error: 'Pokémon not found!' });
    }

    res.status(500);
    res.send({ error: 'Internal server error!' });

    throw err;
  }
};
