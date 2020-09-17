import { Router } from 'express';

import { auth } from '../middleware/auth';
import {
  get_kelas,
  get_kelasById,
  create_kelas,
  update_kelas,
  delete_kelas,
} from '../controller/kelas.controller';

const router = Router();

router.get('/', get_kelas);
router.get('/:id', get_kelasById);
router.post('/create', auth, create_kelas);
router.put('/update/:id', auth, update_kelas);
router.delete('/:id', auth, delete_kelas);

export default router;
