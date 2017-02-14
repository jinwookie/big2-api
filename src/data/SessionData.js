import Pool from './ConnectionPool';

export function getSessions(offset = 0, size = 200) {
  return Pool.query({
    text: 'SELECT * FROM bigtwo.sessions ORDER BY start DESC LIMIT $1 OFFSET $2',
    values: [ size, offset ]
  });
}

export function getSession(id) {
  return Pool.query({
    text: 'SELECT * FROM bigtwo.sessions WHERE id = $1',
    values: [ id ]
  });
}

export function addSession(session) {
  return Pool.query({
    text: 'INSERT INTO bigtwo.sessions (id, start) VALUES ($1, $2)',
    values: [ session.id, session.start ]
  });
}

export function deleteSession(id) {
  const queries = [
    {
      text: 'DELETE FROM bigtwo.sessions WHERE id = $1',
      values: [ id ]
    },
    {
      text: 'DELETE FROM bigtwo.sessionplayers WHERE sessionid = $1',
      values: [ id ]
    }
  ];

  return Pool.queries(queries);
}

export function updateSession(session) {
  return Pool.query({
    text: 'UPDATE bigtwo.sessions SET start = $2, "end" = $3 WHERE id = $1',
    values: [ session.id, session.start, session.end ]
  });
}
