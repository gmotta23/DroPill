import { Router } from 'express'
import handler from '../database/handler'
import { v4 as uuidv4 } from 'uuid'


const router = Router()

router.get('/', (req, res) => {
  res.send('Custom route Médico!')
})

router.post('/receita/nova', (req, res) => {
  try {
    let new_receita = req.body

    new_receita.inserted = false
    new_receita.uuid = uuidv4()

    let database = handler.getDatabase()

    database.receita.push(new_receita)

    handler.saveDatabase(database)

    res.status(200).json({
      message: 'Receita criada com sucesso!'
    })
  } catch (error) {
    console.log(error)
    res.status(400)
  }
})

router.get('/allReceitas', (req, res) => {
  try {
    let receitas = handler.getDatabase().receita
    res.send(receitas)
  } catch (error) {
    
  }
})

router.get('/dropills', (req, res) => {
  try {
    let receitas = handler.getDatabase().receita

    receitas = receitas.filter(receita => receita.inserted)

    let dropills = []

    receitas.forEach(receita => {
      if (!dropills[receita.paciente_id - 1]) dropills[receita.paciente_id - 1] = {paciente_id: receita.paciente_id}
      dropills[receita.paciente_id - 1][`reserv_${receita.dropill_reserv}`] = receita
    })

    res.status(200).send(dropills)
  } catch (error) {
    console.log(error)
  }
})

router.delete('/dropill/:uuid', (req, res) => {
  try {
    let {uuid} = req.params
    let database = handler.getDatabase()

    let receitas = database.receita

    receitas = receitas.filter(r => r.uuid != uuid)

    database.receita = receitas

    handler.saveDatabase(database)    

    res.send('ok')

  } catch (error) {
    console.log(error)
  }
})

router.get('/json', (req, res) => {

  let data = handler.getDatabase()

  res.send(data)
})

module.exports = router