import { Router } from 'express'
import handler from '../database/handler'

const router = Router()

import DeviceRouter from './device'

router.use('/device', DeviceRouter)

router.get('/', (req, res) => {
  res.send('Custom route!')
})

router.get('/json', (req, res) => {
  let data = handler.getDatabase()
  res.send(data)
})

module.exports = router