import { Router } from 'express'
import handler from '../database/handler'
import axios from 'axios'
const fs = require('fs')

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

router.get('/relatorio', (req, res) => {
  try {

    let relatorio = JSON.parse(fs.readFileSync('../rasp/relatorio.json', 'utf8'))

    res.send(relatorio)

    relatorio = {}
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

// acessar a rota toda vez que ocorrer um update no data.json no py

router.get('/update', async (req, res) => {
  try {

    let internal_dp = require('../../../rasp/data.json')

    let dp = handler.getDatabase().dropill

    // mescla do db que contém o id da dropill com o banco atualizado

    dp.reservas = internal_dp.receita

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