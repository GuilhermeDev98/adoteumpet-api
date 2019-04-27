'use strict'
const Route = use('Route')

const addPrefixToGroup = (group) => {
  group.prefix('api/v1')
  return group
}

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

addPrefixToGroup(
  Route.group(() => {
    Route.post('login', 'AuthController.login')
    Route.post('register', 'AuthController.register')
  }).prefix('auth')
)

addPrefixToGroup(

  Route.group(() => {
    Route.resource('users', 'UserController').apiOnly()

  }).middleware(['auth'])

)

addPrefixToGroup(

  Route.group(() => {
    Route.resource('pets', 'PetController').apiOnly()
    Route.post('upload', 'PetController.uploadPhotos')
  }).middleware(['auth'])

)