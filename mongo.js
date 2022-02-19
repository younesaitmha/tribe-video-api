import mongoose from 'mongoose'

import * as config from './config.js'

const { mongo: mongoConfig } = config

async function connectToMongo() {
    try {
        const connection = await mongoose.connect(mongoConfig.uri, {
            keepAlive: true,
            autoIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        const {
            connection: { host, port },
        } = connection
        console.log(
            `Successfully connected to ${host}:${port} MongoDB cluster in ${process.env.NODE_ENV} mode.`
        )
        return connection
    } catch (err) {
        console.warn('Error while attempting to connect to MongoDB:', err)
        // Exit app if we fail to connect to Mongo
        throw err
    }
}

export default connectToMongo
