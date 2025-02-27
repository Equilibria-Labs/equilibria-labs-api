import { app } from './server';
import { env } from './config/env';
import cors from 'cors';

const port = process.env.PORT || 3001;

const allowedOrigins = [
  'http://localhost:3000',
  'https://equilibria-labs.vercel.app',
  'https://thesleeplab.app',
  'https://www.thesleeplab.app',
  'https://dev.thesleeplab.app',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
