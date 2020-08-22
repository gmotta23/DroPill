import { Router } from 'express'
import handler from '../database/handler'

const router = Router()

import MedicoRouter from './medico'
import UserRouter from './user'
import PacienteRouter from './paciente'
import FarmaciaRouter from './farmacia'

router.use('/medico', MedicoRouter)
router.use('/paciente', PacienteRouter)
router.use('/user', UserRouter)
router.use('/farmacia', FarmaciaRouter)

router.get('/', (req, res) => {
  res.send('Custom route!')
})

router.get('/json', (req, res) => {
  let data = handler.getDatabase()
  res.send(data)
})

module.exports = router