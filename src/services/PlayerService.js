import shortid from 'shortid';
import * as PlayerData from '../data/PlayerData';

export function getPlayers() {
  return PlayerData.getPlayers().then(response => response.rows);
}

export function addPlayer(player) {
  player.id = shortid.generate();
  return PlayerData.addPlayer(player);
}

export function getPlayer(id) {
  return PlayerData.getPlayer(id).then(response => response.rows.length > 0 ? response.rows[0] : null);
}

export function deletePlayer(id) {
  return PlayerData.deletePlayer(id);
}

export function updatePlayer(id, player) {
  player.id = id;
  return PlayerData.updatePlayer(player);
}
