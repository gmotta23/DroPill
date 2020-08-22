import { Router } from 'express'

const router = Router()

import MedicoRouter from './medico'
import UserRouter from './user'
import PacienteRouter from './paciente'

router.use('/medico', MedicoRouter)
router.use('/paciente', PacienteRouter)
router.use('/user', UserRouter)

router.get('/', (req, res) => {
  res.send('Custom route!')
})

module.exports = router