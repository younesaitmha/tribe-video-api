import { getAndVerifyJWT } from '../jwt.js'

const applyAuthMiddleware = ({ app }) =>
  app.use((req, res, next) => {
    // if jwt is passed validate it and extract user, else returns null
    try {
      const payload = getAndVerifyJWT(req)
      req.user = payload?.user
      next()
    } catch (e) {
      return res
        .status(401)
        .send({ message: 'Invalid or Expired token please login again' })
    }
  })

export default applyAuthMiddleware
