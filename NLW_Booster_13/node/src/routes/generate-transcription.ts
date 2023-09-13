import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { openai } from '../lib/openai'
import { prisma } from '../lib/prisma'

export async function generateAITranscriptionRoute(app: FastifyInstance) {
  app.post(
    '/ai/complete',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const bodySchema = z.object({
        videoId: z.string().uuid(),
        template: z.string(),
        temperature: z.number().min(0).max(1).default(0.5),
      })

      const { videoId, template, temperature } = bodySchema.parse(request.body)

      const video = await prisma.video.findUniqueOrThrow({
        where: {
          id: videoId,
        },
      })

      if (!video.transcription) {
        return reply
          .status(400)
          .send({ error: 'Video transcription wa not generated yet.' })
      }

      const promptMessage = template.replace(
        '{transcription}',
        video.transcription,
      )

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature,
        messages: [{ role: 'user', content: promptMessage }],
      })

      return reply.send({
        videoId,
        temperature,
        template,
        response,
      })
    },
  )
}
