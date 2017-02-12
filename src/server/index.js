import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import './env';
import SessionRoutes from './routes/SessionRoutes';
import SessionPlayerRoutes from './routes/SessionPlayerRoutes';
import GameRoutes from './routes/GameRoutes';
import PlayerRoutes from './routes/PlayerRoutes';
import logger from './utils/Logger';
import oauth from './middleware/oauth';

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// enable cors
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/sessions', oauth, SessionRoutes);
app.use('/sessions/:sessionid/games', oauth, GameRoutes);
app.use('/sessions/:sessionid/players', oauth, SessionPlayerRoutes);
app.use('/players', oauth, PlayerRoutes);

app.listen(process.env.PORT || 3000, function () {
  logger.info(`Example app listening on port ${process.env.PORT || 3000}!`);
});
