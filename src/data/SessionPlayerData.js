import Pool from './ConnectionPool';

export function getSessionPlayers(sessionId, offset = 0, size = 200) {
  let query = 'SELECT sp.sessionid, sp.playerid, p.firstName, p.lastName ';
  query += 'FROM bigtwo.sessionplayers as sp, bigtwo.players as p ';
  query += 'WHERE sp.playerid = p.id and sessionid = $1 LIMIT $2 OFFSET $3';

  return Pool.query({
    text: query,
    values: [ sessionId, size, offset ]
  });
}

/*export function getSession(id) {
  return Pool.query({
    text: 'SELECT * FROM bigtwo.sessions WHERE id = $1',
    values: [ id ]
  });
}*/

export function addSessionPlayer(sessionId, playerId) {
  return Pool.query({
    text: 'INSERT INTO bigtwo.sessionplayers (sessionid, playerid) VALUES ($1, $2)',
    values: [ sessionId, playerId ]
  });
}

export function addSessionPlayers(sessionId, players) {
  const queries = players.map(player => ({
    text: 'INSERT INTO bigtwo.sessionplayers (sessionid, playerid) VALUES ($1, $2)',
    values: [ sessionId, player ]
  }));

  console.log(queries);

  return Pool.queries(queries);
}

export function deleteSessionPlayer(sessionId, playerId) {
  return Pool.query({
    text: 'DELETE FROM bigtwo.sessionplayers WHERE sessionid = $1 AND playerid = $2',
    values: [ sessionId, playerId ]
  });
}

/*export function updateSession(session) {
  return Pool.query({
    text: 'UPDATE bigtwo.sessions SET start = $2, end = $3 WHERE id = $1',
    values: [ session.id, session.start, session.end ]
  });
}*/
