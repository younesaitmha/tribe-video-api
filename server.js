import dotenv from 'dotenv'
import app from './app.js'
import connectToMongo from './mongo.js'

dotenv.config()

async function startServer() {
    await connectToMongo()

    app.listen(8080, () => {
        console.log('Server on http://localhost:8080 🚀')
    })
}

startServer()
