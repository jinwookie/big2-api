import * as SessionPlayerData from '../data/SessionPlayerData';

export const getSessionPlayers = sessionId =>
  SessionPlayerData.getSessionPlayers(sessionId).then(response => response.rows);

export const addSessionPlayers = (sessionId, sessionPlayers) =>
  SessionPlayerData.addSessionPlayers(sessionId, sessionPlayers);

export const deleteSessionPlayer = (sessionId, playerId) =>
  SessionPlayerData.deleteSessionPlayer(sessionId, playerId);
