import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@email.com',
      avatarUrl: 'https://github.com/DenisMedeirosSDK.png',
      googleId: '1234567890',
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
      date: '2022-11-20T13:00:00.484Z',
      firstTeamCountryCode: 'QAT',
      secondTeamCountryCode: 'ECU',
    },
  });
  await prisma.game.create({
    data: {
      date: '2022-11-21T10:00:00.484Z',
      firstTeamCountryCode: 'ENG',
      secondTeamCountryCode: 'IRN',

      guesses: {
        create: {
          firstTeamPoints: 1,
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
