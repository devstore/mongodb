const assert = require('assert')
const User = require('../src/user')

describe('Updating records', () => {
  let joe

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 })
    joe.save().then(() => {
      done()
    })
  })

  it('instance type using set n save', (done) => {
    joe.set('name', 'Alex')
    joe
      .save()
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1)
        assert(users[0].name === 'Alex')
        done()
      })
  })

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1)
        assert(users[0].name === 'Alex')
        done()
      })
  }

  it('A model instance can update', (done) => {
    //To avoid typing same .then code like in above set n save test case, we have achieved the same thing using the
    // function assertName. This saves typing the code again and again.
    assertName(joe.update({ name: 'Alex' }), done)
  })

  it('A model class can update', (done) => {
    //This find all the records with name=Joe and updtes it with 'Alex'
    assertName(User.updateMany({ name: 'Joe' }, { name: 'Alex' }), done)
  })

  it('A model class can update one record', (done) => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done)
  })

  it('A model class can find a record with and Id and update', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done)
  })

  it('A user can have their likes incremented by 1', (done) => {
    User.update({ name: 'Joe' }, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.likes === 10)
        done()
      })
  })
})
