import shortid from 'shortid';
import moment from 'moment';
import * as GameData from '../data/GameData';
import * as ScoreData from '../data/ScoreData';

export const getGames = sessionId =>
  GameData.getSessionGames(sessionId).then(response =>
    response.rows.reduce((acc, current) => {
      if (!acc.some(game => game.id === current.id)) {
        return [
          ...acc,
          {
            id: current.id,
            timestamp: current.timestamp,
            sessionid: current.sessionid,
            scores: current.playerid ?
            [
              {
                playerid: current.playerid,
                score: current.score
              }
            ] : [ ]
          }
        ];
      }

      acc.find(game => game.id === current.id).scores.push({ playerid: current.playerid, score: current.score });
      return acc;
    }, [ ])
  );

/*export const getGames = sessionId =>
  GameData.getSessionGames(sessionId).then(response => response.rows);*/

export const getGame = id =>
  GameData.getGame(id).then(responses => {
    let game = responses[0].rows && responses[0].rows.length > 0 ? responses[0].rows[0] : null;
    if (game)
      game.scores = responses[1].rows;
    return game;
  });

export const getScores = gameId =>
  ScoreData.getScores(gameId).then(response => response.rows);

// scores: [ { playerId: 'id', score: 1 } ]
export const addGame = (sessionId, scores) => {
  const game = {
    id: shortid.generate(),
    sessionId,
    timestamp: moment.utc()
  };
  return GameData.addGame(game).then(() =>
    Promise.all(
      scores.map(score => {
        score.id = shortid.generate();
        score.gameId = game.id;
        return ScoreData.addScore(score);
      })
    )
  );
};

export const deleteGame = id => GameData.deleteGame(id);

// game: { id: 'id', scores: [ { id: 'id', score: 1 } ] }
export const updateGame = game =>
  game.scores.map(score => ScoreData.updateScore(score));
