import { getUserByEmail, createUser } from '../../models/user.js'
import { generateJWT } from '../../jwt.js'

//Fct to sign up
async function signup(req, res) {
    const { name, email, password } = req.body

    //Dummy validation
    if (!email || !password || !name)
        return res
            .status(400)
            .send({ message: 'Email,name and password are required' })

    const userWithEmail = await getUserByEmail(email)

    if (userWithEmail)
        return res
            .status(409)
            .send({ message: 'User with this Email already exists' })

    const newUser = await createUser({ email, name, password })

    //Before returning the user you might want to add a DTO layer
    //to Stop information such as password, _id (internal ID) from being sent.

    const token = await generateJWT({ user: newUser })
    return res.status(201).send({ user: newUser, token })
}

export default signup
