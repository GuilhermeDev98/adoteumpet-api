'use strict'

const User = use('App/Models/User')

class AuthController {
  async login ({ auth, request, response }) {
    const { email, password } = request.only(['email', 'password'])
    try{
      const token = await auth.attempt(email, password)
      return response.send(token)
    }catch(err){
      response.status(400).json({
        status: 'error',
        message: 'Invalid email/password'
      })
    }
  }

  async register({ auth, request, response }){

    try{
      
      const user = new User()
      user.username = request.input('username')
      user.email = request.input('email')
      user.password = request.input('password')
      user.cep = request.input('cep')
      user.cel = request.input('cel')
      user.status = 'user'
      await user.save()

      const token = await auth.attempt(request.input('email'), request.input('password'))
      return response.send(token)

    }catch(err){
      response.status(400).json({
        status: 'error',
        message: err
      })
    }
    
  }
}

module.exports = AuthController
