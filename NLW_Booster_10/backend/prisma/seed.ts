import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@email.com',
      avatarUrl: 'https://github.com/DenisMedeirosSDK.png',
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: '12qwe',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: '2022-11-01T14:00:57.484Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    },
  });
  await prisma.game.create({
    data: {
      date: '2022-11-03T14:00:57.484Z',
      firstTeamCountryCode: 'AR',
      secondTeamCountryCode: 'BR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}
main();
