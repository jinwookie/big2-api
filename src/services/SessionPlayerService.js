import * as SessionPlayerData from '../data/SessionPlayerData';

export const getSessionPlayers = sessionId =>
  SessionPlayerData.getSessionPlayers(sessionId).then(response => response.rows);

export const addSessionPlayers = (sessionId, sessionPlayers) =>
  Promise.all(
    sessionPlayers.map(player =>
      SessionPlayerData.addSessionPlayer(sessionId, player.playerId)
    )
  );

export const deleteSessionPlayer = (sessionId, playerId) =>
  SessionPlayerData.deleteSessionPlayer(sessionId, playerId);
