import { getUserByEmail, comparePassword } from '../../models/user.js'
import { generateJWT } from '../../jwt.js'

async function login(req, res) {
    const { email, password } = req.body

    //Dummy validation
    if (!email || !password)
        return res
            .status(400)
            .send({ message: 'Email and password are required' })

    const userWithEmail = await getUserByEmail(email)

    if (!userWithEmail)
        return res.status(401).send({ message: 'Wrong email or password' })

    const isCorrectPassword = await comparePassword(
        password,
        userWithEmail.password
    )

    if (!isCorrectPassword)
        return res.status(401).send({ message: 'Wrong email or password' })

    //Before returning the user you might want to add a DTO layer
    //to Stop information such as password, _id (internal ID) from being sent.

    const token = await generateJWT({ user: userWithEmail })

    return res.status(201).send({ user: userWithEmail, token })
}

export default login
