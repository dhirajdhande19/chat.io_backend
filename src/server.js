import app from './app.js';
import { connectToDB } from './config/db.js';
import { PORT } from './config/env.js';

app.listen(PORT, () => {
  connectToDB();
  console.log(`Running on: ${PORT}`);
});
