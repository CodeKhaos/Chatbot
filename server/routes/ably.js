const express  = require ("express");
const Ably = require( "ably");

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /redemption.
const router = express.Router();

const rest = new Ably.Rest(process.env.REACT_APP_ABLY_REALTIME_KEY);

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
router.get("/auth", async (req, res) => {
  const tokenParams = {
    clientId: "Chatbot",
  };
  const authOptions = { key: process.env.REACT_APP_ABLY_REALTIME_KEY, authCallback: callback }
  const token =  await rest.auth.createTokenRequest(tokenParams, authOptions);
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(token));
  return res
  
});


export default router;