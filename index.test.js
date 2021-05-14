const {LoginSystem} = require('./index')


describe('LoginSystem test case', () => {
  it('LoginSystem should be a class', () => {
    expect(LoginSystem).toBeTruthy()
  })

  it('LoginSystem should persist email and password', () => {
    const loginSystem = new LoginSystem({email: 'luciano@provi.com.br', password: '12345'})

    expect(loginSystem.email).toStrictEqual('luciano@provi.com.br')
    expect(loginSystem.password).toStrictEqual('12345')
  })

  it('LoginSystem.login should return error correctly', () => {
    const loginSystem = new LoginSystem({email: 'luciano@provi.com.br', password: '12345'})

    loginSystem.login()
    loginSystem.logout()

    const resultLacksEmail = loginSystem.login()
    expect(resultLacksEmail.error).toBeTruthy()

    loginSystem.email = 'luciano@provi.com.br'

    const resultLacksPassword = loginSystem.login()
    expect(resultLacksPassword.error).toBeTruthy()
  })


  it('LoginSystem.login should return error when there is no email', () => {
    const loginSystem = new LoginSystem({email: 'fake_email@provi.com.br', password: '12345'})


    const userNotFound = loginSystem.login()
    expect(userNotFound.error).toBeTruthy()
  })
})
