import express from 'express'
import bp from 'body-parser'

const { urlencoded, json } = bp

const app = express()
app.use(urlencoded({ extended: true }))
app.use(json())

app.get('/', (req, res) => {
    res.json({ status: 'OK' })
})

export default app
