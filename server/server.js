import express, {Router} from 'express'
import cors from 'cors'
import rewards from '../server/routes/rewards.js'
import redemptions from '../server/routes/redemptions.js'
import ably from '../server/routes/ably.js'

import serverless from "serverless-http";

const api = express(); 

const router = Router();

api.use("/rewards/", router);
api.use("/redemptions/", router);
api.use("/ably/", router);

export default handler = serverless(api);