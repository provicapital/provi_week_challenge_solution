const {v4} = require('uuid')

// Mongo
const database = {
  users: [
    {
      uuid: '3ceded28-1562-4b47-8e9b-8691bb1fde93',
      email: 'luciano@provi.com.br',
      password: '12345', // do not do this in production
      sessions: [
        {
          token: 'asdasd',
          startedAt: new Date(),
          endedAt: null, // TODO: implement this
          active: false  // TODO: implement this
        }
      ]
    }
  ]
}


class LoginSystem {
  constructor({email, password}) {
    this.email = email
    this.password = password
    this.uuid = v4()
    this.sessions = []
  }

  login() {
    if (!this.email) {
      return {error: true, message: 'invalid email'}
    }
    if (!this.password) {
      return {error: true, message: 'invalid password'}
    }

    const existingUser = database.users.find(user => user.email === this.email)

    if (!existingUser) {
      return {error: true, message: 'user not found'}
    }
    if (existingUser.password !== this.password) {
      return {error: true, message: 'password does not match'}
    }

    this.createNewSession()
  }

  logout() {
    this.email = ''
    this.password = ''
    this.uuid = ''
    this.sessions = []
  }

  changePassword(newPassword) {
    this.password = newPassword

    database.users.map(user => {
      if (user.email === this.email) {
        user.password = newPassword
        return user
      }
    })
  }


  getUserSession() {
    if (!this.email) {
      return {error: true, message: 'invalid email'}
    }

    const _user = database.users.find(user => user.email === this.email)
    return _user.sessions
  }

  createNewSession() {
    database.users.map(user => {
      if (user.email === this.email) {
        user.sessions.push({token: '12345', startedAt: new Date()})
        return user
      }
    })
  }
}

const loginSystem = new LoginSystem({
  email: 'luciano@provi.com.br',
  password: '12345'
})
loginSystem.login()
const userSessions = loginSystem.getUserSession()
console.log('userSessions: ', userSessions)

loginSystem.changePassword('54321')
console.log('password: ', loginSystem.password)

module.exports = {LoginSystem}
