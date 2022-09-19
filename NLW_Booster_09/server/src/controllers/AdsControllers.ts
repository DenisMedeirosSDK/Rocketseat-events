import { Request, Response } from 'express';

import { prisma } from '../utils/prisma';
import {
  converterHourStringToMinutes,
  converterMinutesToHourString,
} from '../utils/converters';

export async function createAd(request: Request, response: Response) {
  const gameId = request.params.id;
  const {
    name,
    discord,
    yearPlaying,
    weekDays,
    hourStart,
    hourEnd,
    useVoiceChannel,
  } = request.body;

  const ad = await prisma.ad.create({
    data: {
      name,
      discord,
      yearPlaying,
      weekDays: weekDays.join(','),
      hourStart: converterHourStringToMinutes(hourStart),
      hourEnd: converterHourStringToMinutes(hourEnd),
      useVoiceChannel,
      gameId,
    },
  });

  return response.status(201).json({
    data: ad,
  });
}

export async function getAdsByGameId(request: Request, response: Response) {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      gameId: true,
      yearPlaying: true,
      weekDays: true,
      hourStart: true,
      hourEnd: true,
      useVoiceChannel: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formmatedAds = ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: converterMinutesToHourString(ad.hourStart),
      hourEnd: converterMinutesToHourString(ad.hourEnd),
    };
  });

  return response.status(200).json({
    data: formmatedAds,
  });
}

export async function getDiscordByAdsId(request: Request, response: Response) {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return response.status(200).json({
    data: {
      discord: ad.discord,
    },
  });
}
