import { Router } from 'express';

import { auth } from '../middleware/auth';
import {
  get_sekolah,
  get_sekolahById,
  create_sekolah,
  update_sekolah,
  delete_sekolah,
} from '../controller/sekolah.controller';

const router = Router();

router.get('/', get_sekolah);
router.get('/:id', get_sekolahById);
router.post('/create', auth, create_sekolah);
router.put('/update/:id', auth, update_sekolah);
router.delete('/:id', auth, delete_sekolah);

export default router;
