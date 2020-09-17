import { Router } from 'express';

import { auth } from '../middleware/auth';
import {
  get_event,
  get_eventById,
  create_event,
  update_event,
  delete_event,
} from '../controller/event.controller';

const router = Router();

router.get('/', get_event);
router.get('/:id', get_eventById);
router.post('/create', auth, create_event);
router.put('/update/:id', auth, update_event);
router.delete('/:id', auth, delete_event);

export default router;
