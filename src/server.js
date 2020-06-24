const fastify = require('fastify')()
import winston from 'winston'

// export fastify server the server!
export const start = async (db, callback) => {


  // Basic auth
  const validate = (username, password, req, reply, done) => {
    const users = db.on
    if (username === 'oussama' && password === 'rootinfo') {
      done()
    } else {
      done(new Error('Winter is coming'))
    }
  }
  const authenticate = { realm: 'Westeros' }
  fastify
    .register(require('fastify-basic-auth'), { validate, authenticate })
    .register(require('fastify-cors'))
    .register(require('fastify-helmet'))

    // Add user Routers
    .register(require('./modules/user/user.routes'))
    .get('/health', async (request, reply) => {
      reply.send({ server: "working fine" })
    })

    .after(() => {
      fastify.addHook('onRequest', fastify.basicAuth)
    })

  await fastify.listen(3000)
    .then(() => {
      winston.info(`server listening on port ${fastify.server.address().port}`)
    })
    .catch((err) => {
      winston.error(err)
      process.exit(1)
    })
}



