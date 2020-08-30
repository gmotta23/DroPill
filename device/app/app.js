require('dotenv').config()

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
const host = process.env.HOST
const port = process.env.PORT

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())

import IndexRouter from './routes.js'

app.use('/', IndexRouter)

app.listen(port, host, () => {
  console.log(`Server listening on port ${port}`)
})