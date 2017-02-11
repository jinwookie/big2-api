import express from 'express';
import * as SessionService from '../../services/SessionService';

const router = express.Router();

router.get('/', (req, res) => {
  SessionService.getSessions()
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err.message));
});

router.get('/:id', (req, res) => {
  SessionService.getSession(req.params.id)
    .then(result => res.json(result))
    .catch(err => res.status(400).send(err.message));
});

router.delete('/:id', (req, res) => {
  SessionService.deleteSession(req.params.id)
    .then(() => res.status(204).send())
    .catch(err => res.status(400).send(err.message));
});

router.post('/', (req, res) => {
  SessionService.addSession(req.body)
    .then(result => res.status(201).json(result))
    .catch(err => res.status(400).send(err.message));
});

router.put('/:id', (req, res) => {
  SessionService.updateSession(req.body)
    .then(() => res.status(204).send())
    .catch(err => res.status(400).send(err.message));
});

export default router;
