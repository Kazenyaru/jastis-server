import { Router } from 'express';

import { auth } from '../middleware/auth';
import {
  get_jadwal,
  get_jadwalById,
  create_jadwal,
  update_jadwal,
  delete_jadwal,
} from '../controller/jadwal.controller';

const router = Router();

router.get('/', get_jadwal);
router.get('/:id', get_jadwalById);
router.post('/create', auth, create_jadwal);
router.put('/update/:id', auth, update_jadwal);
router.delete('/:id', auth, delete_jadwal);

export default router;
