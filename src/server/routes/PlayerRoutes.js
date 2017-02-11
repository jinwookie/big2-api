import express from 'express';
import * as PlayerService from '../../services/PlayerService';

const router = express.Router();

router.get('/', (req, res) => {
  PlayerService.getPlayers()
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err.message));
});

router.get('/:id', (req, res) => {
  PlayerService.getPlayer(req.params.id)
    .then(result => result ? res.json(result) : res.status(404).send({ error: 'Player not found' }))
    .catch(err => res.status(400).send(err.message));
});

router.delete('/:id', (req, res) => {
  PlayerService.deletePlayer(req.params.id)
    .then(() => res.status(204).send())
    .catch(err => res.status(400).send(err.message));
});

router.post('/', (req, res) => {
  PlayerService.addPlayer(req.body)
    .then(result => res.status(201).json(result))
    .catch(err => res.status(400).send(err.message));
});

router.put('/:id', (req, res) => {
  PlayerService.updatePlayer(req.params.id, req.body)
    .then(() => res.status(204).send())
    .catch(err => res.status(400).send(err.message));
});

export default router;
