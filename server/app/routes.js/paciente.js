import { Router } from 'express'
import handler from '../database/handler'


const router = Router()

router.get('/', (req, res) => {
  res.send('Custom route Paciente!')
})

router.get('/getAll', async (req, res) => {
  try {
    let list = await handler.getDatabase().paciente

    return res.json(list)
  } catch (error) {
    console.log(error)
  }
})


module.exports = router