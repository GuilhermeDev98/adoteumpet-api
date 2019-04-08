'use strict'


/** @type {import('@adonisjs/lucid/src/Factory')} 
const Factory = use('Factory')*/

const User = use('App/Models/User')
const Hash = use('Hash')

class UserSeeder {
  async run () {
    const user = new User()
    user.username = 'Guilherme Santos'
    user.email = 'guilhermedev@hotmail.com'
    user.password = 'secret'
    user.photoURL = 'https://scontent.faju8-1.fna.fbcdn.net/v/t1.0-9/34340938_1433451820094364_1690447171486220288_n.jpg?_nc_cat=105&_nc_ht=scontent.faju8-1.fna&oh=65d98a09495533aaa71c57922ea269b1&oe=5D4FEDB4'
    user.cep = '49048430'
    user.cel = '79999042394'
    user.status = 'admin'
    await user.save()
    console.log(user)
  }
}

module.exports = UserSeeder
