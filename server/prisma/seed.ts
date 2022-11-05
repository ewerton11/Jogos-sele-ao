import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@gmail.com",
      avatarUrl: "https://github.com/ewerton11.png",
    },
  })

  const pool = await prisma.pool.create({
    data: {
      title: "exemple Pool",
      code: "BOL123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  })

  await prisma.game.create({
    data: {
      date: "2022-11-05T12:00:00.201Z",
      firtTeamCountryCode: "DE",
      secoundTeamCountryCode: "BR",
    },
  })

  await prisma.game.create({
    data: {
      date: "2022-11-06T12:00:00.201Z",
      firtTeamCountryCode: "BR",
      secoundTeamCountryCode: "AR",

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
  })
}

main()