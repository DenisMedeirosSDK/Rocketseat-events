import express from 'express'

const app = express()

app.use(express.json())

app.get('/', (request, response) => {
  return response.send('Hello NLW 05')
})

app.listen(3333, () => console.log('Server running in port, 3333'))
