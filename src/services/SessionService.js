import shortid from 'shortid';
import moment from 'moment';
import * as SessionData from '../data/SessionData';

export const getSessions = () =>
  SessionData.getSessions().then(response => response.rows);

export const getSession = id =>
  SessionData.getSession(id).then(response => response.rows && response.rows.length > 0 ? response.rows[0] : null);

// { players: [ { id }, ... ] }
export const addSession = () => {
  const session = {
    id: shortid.generate(),
    start: moment.utc()
  };
  return SessionData.addSession(session).then(() => session);
};

export const updateSession = session =>
  SessionData.updateSession(session);

export const deleteSession = id => SessionData.deleteSession(id);
