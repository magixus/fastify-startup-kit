
import mongoose from 'mongoose'
import winston from 'winston'

winston.info("connecting to database")
var db = {}

var options = {
  keepAlive: 1,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}

const CONNECTION_URI = process.env.MONGO_URL
winston.info("mongodb uri: "+ CONNECTION_URI)
module.exports.init = async (callback) => {

  if (db.connection) {
    return callback(null, db)
  }

  global.CONNECTION_URI = CONNECTION_URI

  mongoose
    .connect(CONNECTION_URI, options)
    .then(function () {
      winston.info('Connected to MongoDB')

      db.connection = mongoose.connection
      mongoose.connection.db.admin().command({ buildInfo: 1 }, function (err, info) {
        if (err) winston.warn(err.message)
        db.version = info.version
        return callback(null, db)
      })
    })
    .catch(function (e) {
      winston.error('Oh no, something went wrong with DB! - ' + e.message)
      db.connection = null

      return callback(e, null)
    })
}

module.exports.db = db
// module.exports.connectionuri = CONNECTION_URI