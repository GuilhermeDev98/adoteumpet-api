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
    Route.get('/', 'UserController.index')
    Route.get('/:id', 'UserController.show')
    Route.put('/:id', 'UserController.update')
    Route.delete('/:id', 'UserController.delete')
    Route.post('uploadPhoto', 'UserController.uploadPhoto')
  }).middleware(['auth']).prefix('users')

)

addPrefixToGroup(

  Route.group(() => {
    Route.resource('pets', 'PetController').apiOnly()
  }).middleware(['auth'])

)