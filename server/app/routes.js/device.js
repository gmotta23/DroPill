import { Router } from 'express'
import handler from '../database/handler'

const router = Router()

router.get('/', (req, res) => {
  res.send('Custom route Device!')
})

router.patch('/update', (req, res) => {
  try {

    let {dropill_id, paciente_id, reservas} = req.body

    let db = handler.getDatabase()

    let new_receitas = db.receita.filter(r => r.paciente_id !== paciente_id)

    reservas.forEach(r => {
      if (Object.keys(r).length > 0) {
        new_receitas.push(r)
      }
    })

    db.receita = new_receitas

    handler.saveDatabase(db)

    res.send(new_receitas)
  } catch (error) {
    
  }
})

router.get('/:device_id', (req, res) => {
  try {

    let paciente_id = req.params.device_id

    let receitas = handler.getDatabase().receita

    let dp = receitas.filter(r => r.paciente_id == parseInt(paciente_id))

    res.send(dp)
  } catch (error) {
    
  }
})

module.exports = router