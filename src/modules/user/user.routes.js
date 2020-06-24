import userModel from './user.model'
import winston from 'winston'
import { response } from '../../utils/response';


module.exports = (server, options, next) => {
  server.post(
    "/user",
    async (request, reply) => {
      const data = request.body
      if (data) {
        winston.info(`add new user: ${data}`)
        const newUser = new userModel(data)

        await newUser
          .save()
          .then((user) => {
            reply
              .code(201)
              .send(response("success", user))
          })
          .catch((err) => {
            reply
              .code(400)
              .send(response(err))
          })

      }
    })
  next()
}