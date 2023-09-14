import { OpenAIStream, streamToResponse } from 'ai'
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
        prompt: z.string(),
        temperature: z.number().min(0).max(1).default(0.5),
      })

      const { videoId, prompt, temperature } = bodySchema.parse(request.body)

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

      const promptMessage = prompt.replace(
        '{transcription}',
        video.transcription,
      )

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature,
        messages: [{ role: 'user', content: promptMessage }],
        stream: true,
      })

      const stream = OpenAIStream(response)

      streamToResponse(stream, reply.raw, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':
            'GET, PUT, DELETE, POST, OPTIONS, PATCH',
        },
      })
    },
  )
}
