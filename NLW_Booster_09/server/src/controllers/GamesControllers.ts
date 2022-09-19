import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export async function createGame(request: Request, response: Response) {
  const { title, bannerUrl, twitchId } = request.body;

  const findGameExistByTwitchId = await prisma.game.findFirst({
    where: {
      twitchId,
    },
  });

  if (!findGameExistByTwitchId) {
    await prisma.game.create({
      data: {
        title,
        bannerUrl,
        twitchId,
      },
    });

    return response.status(201).json({
      message: 'Success creating the game',
    });
  }

  return response.status(200).json({
    message: 'Game already exist!',
  });
}

export async function getGames(request: Request, response: Response) {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          Ads: true,
        },
      },
    },
  });

  return response.status(200).json({
    data: games,
  });
}
