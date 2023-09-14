import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { createWriteStream } from 'node:fs'
import { extname, resolve } from 'node:path'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const pump = promisify(pipeline)

export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (req, reply) => {
    const upload = await req.file({
      limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
      },
    })

    if (!upload) {
      return reply.code(400).send({
        message: 'No file uploaded',
      })
    }

    const mimeTypeRegex = /^(image|video)\/[a-zA-Z]+/
    const isValidFileFormat = mimeTypeRegex.test(upload?.mimetype)

    if (!isValidFileFormat) {
      return reply.code(400).send()
    }

    const fileId = randomUUID()
    const extension = extname(upload?.filename)
    const fileName = fileId.concat(extension)

    const writeStream = createWriteStream(
      resolve(__dirname, '..', '..', 'uploads', fileName),
    )

    await pump(upload.file, writeStream)

    const fullUrl = `${req.protocol}://${req.hostname}/uploads/${fileName}`

    console.log(fullUrl)
  })
}
