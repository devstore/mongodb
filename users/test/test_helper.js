const mongoose = require('mongoose')
const dotenv = require('dotenv')

mongoose.Promise = global.Promise
dotenv.config()

before((done) => {
  mongoose.connect(process.env.MONGO_URI)
  mongoose.connection
    .once('open', () => {
      console.log('Db Connection opened successfully!')
      done()
    })
    .on('error', (error) => {
      console.warn('Warning', error)
    })
})

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    //Read to run the next test!
    done()
  })
})
