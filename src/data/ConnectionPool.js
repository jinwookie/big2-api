import pg from 'pg';

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
var config = {
  user: process.env.DB_USER, //env var: PGUSER
  database: process.env.DB_DATABASE, //env var: PGDATABASE
  password: process.env.DB_PASSWORD, //env var: PGPASSWORD
  host: process.env.DB_HOST, // Server hosting the postgres database
  port: process.env.DB_PORT, //5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  ssl: true
};

//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
const pool = new pg.Pool(config);

function query(queryString) {
  return pool.connect().then(client => {
    return client.query(queryString).then(result => {
      client.release();
      return result;
      //console.log('hello from', res.rows[0].name);
    })
    .catch(err => {
      client.release();
      throw err;
      //console.error('query error', e.message, e.stack);
    });
  });
}

function queries(queryArray) {
  return pool.connect().then(client => {
    return Promise.all(queryArray.map(query => client.query(query)))
      .then(results => {
        client.release();
        return results;
      })
      .catch(err => {
        client.release();
        throw err;
      });
  });
}

export default { query, queries };
