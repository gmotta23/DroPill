import { Router } from 'express'
import handler from '../database/handler'


const router = Router()

router.get('/', (req, res) => {
  res.send('Custom route Farmácia!')
})

router.get('/farmaciaById', (req, res) => {
  console.log(req.query)

  res.send('ok')
})

router.get('/receitas', (req, res) => {
  try {
    let database = handler.getDatabase()

    return res.status(200).json(database.receita)

  } catch (error) {
    console.log(error)
    res.status(400)
  }
})

router.post('/newDrop', (req, res) => {
  try {

    let new_drop = req.body

    let database = handler.getDatabase()

    database.receita.map(receita => {
      if (receita.uuid === new_drop.uuid) {
        receita.inserted = true
      }
    })

    handler.saveDatabase(database)
    
    res.status(200).send('ok')

  } catch (error) {
    console.log(error)
  }
})

module.exports = router