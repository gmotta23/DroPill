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
    console.log(req.body)

    res.send('ok')
  } catch (error) {
    
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