import bcrypt from 'bcrypt'
import pkg from 'mongoose'

const { Schema, model } = pkg

const UserSchema = new Schema(
    {
        email: {
            type: String,
        },
        name: {
            type: String,
        },
        avatarUrl: {
            type: String,
        },
        password: {
            type: String,
        },
    },
    { collection: 'user', timestamps: true }
)

export const User = model('User', UserSchema)

const SALT_ROUNDS = 10
//Hashes the password
export const hashPassword = (password) => bcrypt.hash(password, SALT_ROUNDS)
//Compares the password
export const comparePassword = async (plainTextPassword, hash) => {
    return bcrypt.compare(plainTextPassword, hash)
}
//Create a new user
export const createUser = async ({ email, name, password }) => {
    const hashedPassword = await hashPassword(password)

    const user = await User.create({ email, name, password: hashedPassword })
    return user
}
//Get the user by id
export const getUserById = async (id) => User.findOne({ _id: id }).lean()
//Get the user by email
export const getUserByEmail = async (email) =>
    User.findOne({ email: email }).lean()
