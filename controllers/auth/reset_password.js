import { getUserByEmail } from '../../models/user.js'

async function resetPassword(req, res) {
    const { email, new_password, conf_password } = req.body

    if (new_password != conf_password) {
        return res
            .status(400)
            .send({
                message:
                    'Password and Confirmation Password should be the same',
            })
    }

    const user = await getUserByEmail(email)

    if (userWithEmail)
        return res
            .status(409)
            .send({ message: "Account with this email doesn't exists" })

    hashed_pass = hashPassword(new_password)
    user.password = new_password
    res.send(user)
}

export default resetPassword
