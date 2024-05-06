import express, {Router} from 'express'
//import cors from 'cors'
import rewards from '../server/routes/rewards.js'
import redemptions from '../server/routes/redemptions.js'
import ably from '../server/routes/ably.js'

import serverless from "serverless-http";

const api = express(); 


//api.use(cors());
const router = Router();

router.get("/hello", (req, res) => res.send("Hello World!"));

router.use("/rewards", rewards);
router.use("/redemptions", redemptions);
router.use("/ably", ably);

api.use("/api/", router);

export default handler = serverless(api);