import { Router } from 'express';

import { auth, same_user } from '../middleware/auth';
import {
  get_user,
  get_userById,
  create_user,
  update_user,
  delete_user,
  login_user,
} from '../controller/user.controller';

const router = Router();

router.get('/', auth, get_user);
router.get('/:id', auth, get_userById);
router.post('/auth', login_user);
router.post('/register', create_user);
router.put('/update/:id', [auth, same_user], update_user);
router.delete('/:id', [auth, same_user], delete_user);

export default router;
