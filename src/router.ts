import { Router } from 'express';
import { pokemonCacheMiddleware } from './middleware';
import { pokemonController } from './controllers/pokemon';

const router = Router();

router.get('/pokemon/:pokemonName', pokemonCacheMiddleware, pokemonController);

export default router;
