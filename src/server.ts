import express from 'express';
import cors from 'cors';

import routes from './routes';

// console.log('Hello Word');
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
// localhost:3333/users
app.listen(3333);