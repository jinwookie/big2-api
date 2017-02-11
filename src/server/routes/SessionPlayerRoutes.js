import express from 'express';
import * as SessionPlayerService from '../../services/SessionPlayerService';

const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  SessionPlayerService.getSessionPlayers(req.params.sessionId)
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err.message));
});

router.delete('/:playerId', (req, res) => {
  SessionPlayerService.deleteSessionPlayer(req.params.sessionId, req.params.playerId)
    .then(() => res.status(204).send())
    .catch(err => res.status(400).send(err.message));
});

router.post('/', (req, res) => {
  SessionPlayerService.addSessionPlayer(req.params.sessionId, req.body)
    .then(result => res.status(201).json(result))
    .catch(err => res.status(400).send(err.message));
});

export default router;
