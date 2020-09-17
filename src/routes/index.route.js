import { Router } from 'express';

import jastis from './jadwal.route';
import event from './event.route';
import user from './user.route';

const router = Router();

router.use(
  '/api/v1',

  router.use('/jadwal', jastis),

  router.use('/event', event),

  router.use('/user', user)
);

export default router;
