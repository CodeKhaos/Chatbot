import express from 'express'
import cors from 'cors'
import rewards from '../server/routes/rewards.js'
import redemptions from '../server/routes/redemptions.js'
import ably from '../server/routes/ably.js'

import dotenv from 'dotenv'
const app = express(); 
dotenv.config()
const port =  5050;

app.use(cors());
app.use(express.json());
app.use("/rewards", rewards);
app.use("/redemptions", redemptions);
app.use("/ably", ably);

app.listen(port, () => { 
  console.log(`Server is running on port ${port}`); 
});

export default app;