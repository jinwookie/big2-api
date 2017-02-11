import Pool from './ConnectionPool';

export function getPlayers(offset = 0, size = 200) {
  return Pool.query({
    text: 'SELECT * FROM bigtwo.players LIMIT $1 OFFSET $2',
    values: [ size, offset ]
  });
}

export function getPlayer(id) {
  return Pool.query({
    text: 'SELECT * FROM bigtwo.players WHERE id = $1',
    values: [ id ]
  });
}

export function addPlayer(player) {
  return Pool.query({
    text: 'INSERT INTO bigtwo.players (id, firstname, lastname) VALUES ($1, $2, $3)',
    values: [ player.id, player.firstname, player.lastname ]
  });
}

export function deletePlayer(playerId) {
  return Pool.query({
    text: 'DELETE FROM bigtwo.players WHERE id = $1',
    values: [ playerId ]
  });
}

export function updatePlayer(player) {
  return Pool.query({
    text: 'UPDATE bigtwo.players SET firstname = $2, lastname = $3 WHERE id = $1',
    values: [ player.id, player.firstname, player.lastname ]
  });
}
