import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({ msg: 'Home Page!' });
});

export default router;
