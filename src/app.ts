import express, { Request, Response } from 'express';
import AppDataSource from './data-source';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors, { CorsOptions } from 'cors';

import userRoutes from './routes/user.route';

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
const corsOption: CorsOptions = {
  origin: process.env.IP,
  credentials: true,
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

if (process.env.NODE_ENV !== 'test') {
  AppDataSource.initialize()
    .then(() => {
      console.log('Database initialized');
      app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`);
      });
    })
    .catch((error) => console.log(error));
}

export default app;
