import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'

export async function getAllPromptsRoute(app: FastifyInstance) {
  app.get('/prompt', async (request: FastifyRequest, reply: FastifyReply) => {
    const prompt = await prisma.prompt.findMany()
    return { prompts: prompt }
  })
}
