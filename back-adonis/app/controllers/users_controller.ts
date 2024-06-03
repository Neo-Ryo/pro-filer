import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class UsersController {
  async getAllUsers(_ctx: HttpContext) {
    const users = await db.query().from('users').select('*')
    return users
  }

  async createUser(ctx: HttpContext) {
    const { auth, request, params } = ctx
    console.log(auth)
    console.log(params)
    console.log(request.body())

    return 'ok'
  }
}
