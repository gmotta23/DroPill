import { Router } from 'express'
import handler from '../database/handler'
import axios from 'axios'

const router = Router()

router.get('/', (req, res) => {
  res.send('OK!')
})

router.get('/status', (req, res) => {
  try {
    let dp = handler.getDatabase().reservas

    res.send(dp)
  } catch (error) {
    console.log(error)
  }
})

// atualizar o status interno do device a partir do server

router.patch('/status', async (req, res) => {
  try {
    let db = handler.getDatabase()

    let {data} = await axios({
      method: 'get',
      url: `${process.env.SERVER_URL}/device/${db.dropill.dropill_id}`
    })

    data.forEach(r => {
      db.dropill.reservas[r.dropill_reserv - 1] = r
    })
    
    handler.saveDatabase(db)

    res.send(db)
  } catch (error) {
    console.log(error)
  }
})

// atualizar o server a partir do device

router.get('/update', async (req, res) => {
  try {

    let dp = handler.getDatabase().dropill

    await axios({
      method: 'patch',
      url: `${process.env.SERVER_URL}/device/update`,
      data: dp
    })

    res.send(dp)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router