import Pool from './ConnectionPool';

export function getSessionGames(sessionId, offset = 0, size = 500) {
  let text = 'SELECT g.id, g.timestamp, g.sessionid, s.playerid, s.score';
  text += ' FROM bigtwo.games AS g LEFT OUTER JOIN bigtwo.scores AS S ON (g.id = s.gameid)';
  text += ' WHERE g.sessionid = $1';
  text += ' ORDER BY g.timestamp DESC';
  text += ' LIMIT $2 OFFSET $3';

  return Pool.query({
    text,
    values: [ sessionId, size, offset ]
  });
}

/*export function getSessionGames(sessionId, offset = 0, size = 200) {
  return Pool.query({
    text: 'SELECT * FROM bigtwo.games WHERE sessionid = $1 LIMIT $2 OFFSET $3',
    values: [ sessionId, size, offset ]
  });
}*/

export function getGame(id) {
  return Pool.queries([
    {
      text: 'SELECT * FROM bigtwo.games WHERE id = $1',
      values: [ id ]
    },
    {
      text: 'SELECT * FROM bigtwo.scores WHERE gameId = $1',
      values: [ id ]
    }
  ]);
}

export function addGame(game) {
  return Pool.query({
    text: 'INSERT INTO bigtwo.games (id, sessionid, timestamp) VALUES ($1, $2, $3)',
    values: [ game.id, game.sessionId, game.timestamp ]
  });
}

export function deleteGame(id) {
  return Pool.queries([
    {
      text: 'DELETE FROM bigtwo.scores WHERE gameid = $1',
      values: [ id ]
    },
    {
      text: 'DELETE FROM bigtwo.games WHERE id = $1',
      values: [ id ]
    }
  ]);
}

/*export function updateGame(game) {
  return Pool.query({
    text: 'UPDATE bigtwo.games SET start = $2, end = $3 WHERE id = $1',
    values: [ session.id, session.start, session.end ]
  });
}*/
