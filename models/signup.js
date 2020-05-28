const express = require("express"); //Express Framework
const router = express.Router();

//const dbAccounts = require("../models/dbAccounts.js"); //Accounts Database Route

router.post("/", async (req, res) => {
    let responseCode = await dbAccounts.createAccount(req);
    res.sendStatus(responseCode).send(); //Appropriate Response Code sent back to user
  });
  
  module.exports = router;