import express from "express";
import Ably from "ably";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /redemption.
const router = express.Router();

const rest = new Ably.Rest('f1CM8Q.OoHa3g:8b8NS3jIIx1M2OXIlXH9C8_6nq4weq3P1KXxEIJO1_o');

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
  const authOptions = { key: 'f1CM8Q.OoHa3g:8b8NS3jIIx1M2OXIlXH9C8_6nq4weq3P1KXxEIJO1_o', authCallback: callback }
  const token =  await rest.auth.createTokenRequest(tokenParams, authOptions);
  res.setHeader("Content-Type", "application/json");
  res.send(JSON.stringify(token));
  return res
  
});


export default router;