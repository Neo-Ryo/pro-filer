const UsersController = () => import('#controllers/users_controller')

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('users', [UsersController, 'getAllUsers'])
router.post('users', [UsersController, 'createUser'])
