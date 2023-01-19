import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import indexRoutes from './routes/index.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import db from './db.js';

//APP CONFIG
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cors());
app.use(indexRoutes);
app.use(tasksRoutes);
app.use(express.static(join(__dirname, '../client/dist')))

app.listen(PORT)
console.log(`app is listening on port ${PORT}`);


//CONNECT TO DB
db.connect().then(() => {
    console.log('db connected');
}).catch((err) => {
    console.log(err);
});