// YOUR_BASE_DIRECTORY/netlify/functions/api.ts
import express, { Router } from "express";
import serverless from "serverless-http";
import Ably from 'ably'
const api = express();

const router = Router();

const rest = new Ably.Rest(process.env.REACT_APP_ABLY_REALTIME_KEY ?? '');

router.get("/auth", async (req, res) => {
    const callback = (err, tokenRequest) => {
        if (err) {
            res.status(500).send("Error requesting token: " + JSON.stringify(err));
        } else {
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(tokenRequest));
            console.log("res", res)
        }
    return res
  }

    const tokenParams = {
        clientId: "Chatbot",
    };
    const authOptions = { key: process.env.REACT_APP_ABLY_REALTIME_KEY ?? '', authCallback: callback }
    const token =  await rest.auth.createTokenRequest(tokenParams, authOptions);
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(token));
  return res  
});


api.use("/ably/", router);

export const handler = serverless(api);
