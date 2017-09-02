import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('Yo! Welcome to HelloBooks API Page!');
});

export default router;
