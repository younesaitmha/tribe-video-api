import { AuthenticationError } from 'apollo-server-express'
import { getUserById } from './models/user.js'

// Require that the user must be authenticated and exists in the database
export function requireUser(resolver) {
  return async (obj, args, context, info) => {
    // user payload from the token (only holds the ID)
    const { user: userJWTPayload } = context

    if (!userJWTPayload || !userJWTPayload.id) {
      throw new AuthenticationError('You must be signed in to do this')
    }

    //Retrieve the user from the DB
    const user = await getUserById(userJWTPayload.id)

    //Call our resovler at the end pass the context and overwrite the user object.
    return resolver(obj, args, { ...context, user }, info)
  }
}
