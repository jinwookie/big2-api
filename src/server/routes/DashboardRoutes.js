import express from 'express';
import * as GameService from '../../services/GameService';

const router = express.Router();

router.get('/', (req, res) =>
  GameService.getTotals()
    .then(data => res.json(data))
    .catch(err => res.status(400).send(err))
);

export default router;
