// Import the framework and instantiate it
import { fastifyCors } from '@fastify/cors'
import Fastify from 'fastify'
import { createTranscriptionRoute } from './routes/create-transcription'
import { generateAITranscriptionRoute } from './routes/generate-transcription'
import { getAllPromptsRoute } from './routes/get-all-prompts'
import { uploadVideoRoute } from './routes/upload-video'

const app = Fastify({
  logger: true,
})

app.register(fastifyCors, {
  origin: '*',
})

// Declare a route
app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)
app.register(generateAITranscriptionRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => console.log(`Server start`))
