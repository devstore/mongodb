const assert = require('assert')
const User = require('../src/user')

describe('Deleting a user', () => {
  let joe

  beforeEach((done) => {
    joe = new User({ name: 'Joe' })
    joe.save().then(() => {
      done()
    })
  })

  it('model instance delete', (done) => {
    joe.deleteOne().then(() =>
      User.findOne({ name: 'Joe' }).then((user) => {
        assert(user === null)
        done()
      }),
    )
  })

  it('class method delete', (done) => {
    //Use this method to remove a bunch of records with some given criteria
    User.deleteMany({ name: 'Joe' }).then(() =>
      User.findOne({ name: 'Joe' }).then((user) => {
        assert(user === null)
        done()
      }),
    )
  })

  it('class method findOneAndDelete', (done) => {
    User.findOneAndDelete({ name: 'Joe' }).then(() =>
      User.findOne({ name: 'Joe' }).then((user) => {
        assert(user === null)
        done()
      }),
    )
  })

  it('class method findByIdAndDeletend', (done) => {
    User.findByIdAndDelete(joe._id).then(() =>
      User.findOne({ name: 'Joe' }).then((user) => {
        assert(user === null)
        done()
      }),
    )
  })
})
