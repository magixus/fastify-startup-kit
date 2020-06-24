import catModel from './cat.model'
import winston from 'winston'


module.exports = (server, options, next) => {
  server.get(
    "/cats",
    // we will cover schema and authentication later
    // { preValidation: [server.authenticate] },
    async (request, reply) => {
      let query = [{
        $group: {
          _id: "$name",
          count: { $sum: 1 }
        }
      }, {
        $project: {
          name: "$_id",
          count: 1,
          _id: 0
        }
      }]

      winston.info("requested match: " + {...request.query})

      request.query ? query = [{
        $match: {
          ...request.query
        }
      }, ...query]
        : query

      try {
        const cats = await catModel.aggregate(query)
        winston.log("---------" + cats)
        reply.send(cats)
      } catch (err) {
        reply.status(500).send(err)
      }
      request.log.info(`list inventory from db`)

    })

  server.post(
    "/cat",
    async (request, replay) => {
      const name = request.params.name
      const color = request.params.color

    })

  next()
}