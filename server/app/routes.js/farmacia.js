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

router.get('/recargas', (req, res) => {
  try {
    let recargas = handler.getDatabase().recarga

    res.send(recargas)
  } catch (error) {
    console.log(error)
  }
})

router.post('/recarregar', (req, res) => {
  try {
    console.log(req.body)
    let new_recarga = req.body

    let db = handler.getDatabase()

    // db.recarga.filter(r => r.remedio.uuid === new_recarga.remedio.uuid)

    console.log(db.recarga, 'recarga antes')
    console.log(db.receita, 'receita antes')    

    // update recarga
    for (let i in db.recarga) {
      let existing_recarga = db.recarga[i]
      if (existing_recarga.remedio.uuid === new_recarga.remedio.uuid) {
        existing_recarga.inserted = true
      }
    }

    // update receita
    for (let i in db.receita) {
      let existing_receita = db.receita[i]
      if (existing_receita.uuid === new_recarga.remedio.uuid) {
        existing_receita.qtd = parseInt(new_recarga.new_qtd)
      }
    }

    handler.saveDatabase(db)

    res.send('ok')
    
  } catch (error) {
    console.log(error)
  }
})

router.post('/newDrop', (req, res) => {
  try {

    let new_drop = req.body

    let database = handler.getDatabase()

    database.receita.map(receita => {
      if (receita.uuid === new_drop.uuid) {
        receita.inserted = true
        receita.qtd = new_drop.qtd
      }
    })

    handler.saveDatabase(database)
    
    res.status(200).send('ok')

  } catch (error) {
    console.log(error)
  }
})

module.exports = router