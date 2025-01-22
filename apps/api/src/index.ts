import { app } from './server';
import { env } from './config/env';

const port = env.PORT;

app.listen(port, () => {
  console.log(`API server running on port ${port}`);
});
