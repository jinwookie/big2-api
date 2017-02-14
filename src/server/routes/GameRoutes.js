import express from 'express';
import * as GameService from '../../services/GameService';

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  GameService.getGames(req.params.sessionid)
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err.message));
});

router.get('/:id', (req, res) => {
  GameService.getGame(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err.message));
});

router.delete('/:id', (req, res) => {
  GameService.deleteGame(req.params.id)
    .then(() => res.status(204).send())
    .catch(err => res.status(400).send(err.message));
});

router.post('/', (req, res) => {
  GameService.addGame(req.params.sessionid, req.body)
    .then(result => res.status(201).json(result))
    .catch(err => res.status(400).send(err.message));
});

router.put('/:id', (req, res) => {
  GameService.updateGame(req.body)
    .then(() => res.status(204).send())
    .catch(err => res.status(400).send(err.message));
});

export default router;
