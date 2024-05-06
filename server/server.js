const express = require('express')
const cors  = require( 'cors')
const rewards  = require( '../server/routes/rewards.js')
const redemptions  = require( '../server/routes/redemptions.js')
const ably  = require( '../server/routes/ably.js')
const dotenv  = require( 'dotenv')
const app = express(); 

dotenv.config()
const port = process.env.REACT_APP_PORT || 5050;

app.use(cors());
app.use(express.json());
app.use("/rewards", rewards);
app.use("/redemptions", redemptions);
app.use("/ably", ably);

app.listen(port, () => { 
  console.log(`Server is running on port ${port}`); 
});

export default app;