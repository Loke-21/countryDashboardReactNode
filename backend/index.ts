import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import cors from 'cors';


import countryRoutes from './routes/router';

const app = express();
const PORT = process.env.port;

app.use(cors());
app.use(express.json());

app.use('/countries', countryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
