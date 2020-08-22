import { Router } from 'express'
import handler from '../database/handler'


const router = Router()

router.get('/', (req, res) => {
  res.send('Custom route Médico!')
})

router.post('/receita/nova', (req, res) => {
  try {
    let new_receita = req.body
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

router.get('/json', (req, res) => {

  let data = handler.getDatabase()

  res.send(data)
})

module.exports = router