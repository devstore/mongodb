const assert = require('assert')
const User = require('../src/user')

describe('Reading users out of the database', () => {
  let joe

  beforeEach((done) => {
    joe = new User({ name: 'Joe' })
    joe.save().then(() => {
      done()
    })
  })

  it('find all users with a name of joe', (done) => {
    User.find({ name: 'Joe' }).then((users) => {
      assert(joe._id.toString() === users[0]._id.toString())
      done()
    })
  })
})
