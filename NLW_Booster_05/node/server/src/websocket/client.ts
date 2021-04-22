import { io } from "../app";

import { ConnectionsService } from "../services/ConnectionsService";
import { UsersService } from "../services/UsersService";
import { MessageService } from "../services/MessageService";

interface IParams {
  text: string
  email: string
}

io.on('connect', (socket) => {
  const connectionService = new ConnectionsService()
  const usersService = new UsersService()
  const messageService = new MessageService()

  socket.on('client_first_access', async (params) => {
    const socket_id = socket.id
    const { text, email } = params as IParams
    let user_id = null

    const userExits = await usersService.findByEmail(email)

    if (!userExits) {
      const user = await usersService.create(email)

      await connectionService.create({
        socket_id,
        user_id: user.id
      })

      user_id = user.id
    } else {
      user_id = userExits.id
      const connection = await connectionService.findByUserId(userExits.id)

      if (!connection) {
        await connectionService.create({
          socket_id,
          user_id: userExits.id
        })
      } else {
        connection.socket_id = socket_id
        await connectionService.create(connection)
      }
    }

    await messageService.create({
      text,
      user_id
    })

  })
})
