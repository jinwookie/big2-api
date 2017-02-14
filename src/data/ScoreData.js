import Pool from './ConnectionPool';

export function getScores(gameId, offset = 0, size = 200) {
  return Pool.query({
    text: 'SELECT * FROM bigtwo.scores WHERE gameId = $1 LIMIT $2 OFFSET $3',
    values: [ gameId, size, offset ]
  });
}

export function getScore(id) {
  return Pool.query({
    text: 'SELECT * FROM bigtwo.scores WHERE id = $1',
    values: [ id ]
  });
}

export function addScore(score) {
  return Pool.query({
    text: 'INSERT INTO bigtwo.scores (id, gameid, playerid, score) VALUES ($1, $2, $3, $4)',
    values: [ score.id, score.gameId, score.playerId, score.score ]
  });
}

export function deleteScore(id) {
  return Pool.query({
    text: 'DELETE FROM bigtwo.scores WHERE id = $1',
    values: [ id ]
  });
}

export function updateScore(score) {
  return Pool.query({
    text: 'UPDATE bigtwo.scores SET score = $2 WHERE id = $1',
    values: [ score.id, score.score ]
  });
}

export function getTotals() {
  let text = 'SELECT p.id as playerid, p.firstname, p.lastname, SUM(s.score) as total, COUNT(s.id) as games';
  text += ' FROM bigtwo.scores s';
  text += ' INNER JOIN bigtwo.games g ON s.gameid = g.id';
  text += ' INNER JOIN bigtwo.players p ON s.playerid = p.id';
  text += ' GROUP BY p.id, p.firstname, p.lastname';

  return Pool.query({ text, values: [ ] });
}
