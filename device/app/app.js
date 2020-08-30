require('dotenv').config()

import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import axios from 'axios'

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
  // setTimeout(async () => {
  //   try {
  //     await axios({
  //       method: 'patch',
  //       url: 'http://localhost:2999/device/status'
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }, 3000);
})