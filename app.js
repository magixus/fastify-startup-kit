require('dotenv').config()
import winston from 'winston'

global.env = process.env.NODE_ENV || 'development'


winston.setLevels(winston.config.cli.levels)
winston.remove(winston.transports.Console)
winston.add(winston.transports.Console, {
  colorize: true,
  timestamp: function () {
    var date = new Date()
    return (
      date.getMonth() +
      1 +
      '/' +
      date.getDate() +
      ' ' +
      date.toTimeString().substr(0, 8) +
      ' [' +
      global.process.pid +
      ']'
    )
  },
  level: global.env === 'production' ? 'info' : 'verbose'
})

winston.add(winston.transports.File, {
  filename: 'logs/error.log',
  level: 'error'
})
winston.err = function (err) {
  winston.error(err.stack)
}



const start = async () => {

  const _db = require('./src/database')

  _db.init((err, db) => {
    if (err) {
      winston.error('FETAL: ' + err.message)
      winston.warn('Retrying to connect to MongoDB in 10secs...')
      return setTimeout(function () {
        _db.init(dbCallback)
      }, 10000)
    } else {
      dbCallback(err, db)
    }
  })
}

const dbCallback = async (err, db) => {
  if (err || !db) {
    return start()
  } else {
    return launchServer(db)
  }
}

const launchServer = async (db) => {
  const server = require('./src/server')
  server.start(db, (err) => {
    if (err) {
      winston.error(err)
      return
    }
  })
}

start()
