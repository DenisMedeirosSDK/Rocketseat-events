import { Router } from 'express'
import { MessageController } from './controllers/MessageController'
import { SettingsController } from './controllers/SettingsController'
import { UsersController } from './controllers/UsersController'

const settingsController = new SettingsController()
const usersController = new UsersController()
const messageController = new MessageController()

const routes = Router()

routes.post('/settings', settingsController.create)
routes.get('/settings/:username', settingsController.findByUsername)
routes.put('/settings/:username', settingsController.update)

routes.post('/users', usersController.create)

routes.post('/messages', messageController.create)
routes.get('/messages/:id', messageController.showByUser)

export { routes }
