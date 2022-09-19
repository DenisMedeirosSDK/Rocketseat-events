import { Router } from 'express';

import {
  createAd,
  getAdsByGameId,
  getDiscordByAdsId,
} from './controllers/AdsControllers';
import { createGame, getGames } from './controllers/GamesControllers';

export const routes = Router();

routes.post('/games', createGame);

routes.get('/games', getGames);

routes.post('/games/:id/ads', createAd);

routes.get('/games/:id/ads', getAdsByGameId);

routes.get('/ads/:id/discord', getDiscordByAdsId);
