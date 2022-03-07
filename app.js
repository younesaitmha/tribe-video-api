import express from 'express'
import bp from 'body-parser'
import cors from 'cors'
//routes
import authRouter from './routes/auth.js'

const { urlencoded, json } = bp
//Express
const app = express()
app.use(urlencoded({ extended: true }))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(json())

app.use('/auth', authRouter)

app.get('/', (req, res) => {
    res.status(200).json({ status: 'OK' })
})

export default app
