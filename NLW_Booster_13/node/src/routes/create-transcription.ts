import { createReadStream } from 'node:fs'

import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { openai } from '../lib/openai'
import { prisma } from '../lib/prisma'

export async function createTranscriptionRoute(app: FastifyInstance) {
  app.post(
    '/videos/:videoId/transcription',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const paramsSchema = z.object({
        videoId: z.string().uuid(),
      })

      const { videoId } = paramsSchema.parse(request.params)

      const bodySchema = z.object({
        prompt: z.string(),
      })

      const { prompt } = bodySchema.parse(request.body)

      const video = await prisma.video.findUniqueOrThrow({
        where: {
          id: videoId,
        },
      })

      const videoPath = video.path

      const audioReadStream = createReadStream(videoPath)

      const response = await openai.audio.transcriptions.create({
        file: audioReadStream,
        model: 'whisper-1',
        language: 'pt',
        response_format: 'json',
        temperature: 0,
        prompt,
      })

      return reply.send({ videoId, prompt, openai: response.text })
    },
  )
}
