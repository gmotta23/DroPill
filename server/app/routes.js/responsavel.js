import { Router } from 'express'
import handler from '../database/handler'

const router = Router()

router.get('/', (req, res) => {
  res.send('Custom route Responsável!')
})

router.get('/:responsavel_id', (req, res) => {
  try {

    let {responsavel_id} = req.params

    let db = handler.getDatabase()

    let paciente = db.paciente.filter(p => p.responsavel_id === parseInt(responsavel_id))

    let receita = db.receita.filter(r => r.paciente_id === paciente[0].id)

    receita = {
      paciente_id: paciente[0].id,
      receita: receita
    }

    res.send(receita)
  } catch (error) {
    
  }
})

router.put('/recarga', (req, res) => {
  try {
    let recarga = req.body
    let db = handler.getDatabase()

    if (db.recarga.map(r => r.remedio.uuid).indexOf(recarga.remedio.uuid) === -1) {
      recarga.inserted = false
      db.recarga.push(recarga)
      handler.saveDatabase(db)
    }

    res.status(200).send('Sucesso!')
  } catch (error) {
    console.log(error)
  }
  // repo_request
  // receita
  // qtd
  // farmacia_id
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