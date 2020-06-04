const express = require("express"); //Express Framework
const router = express.Router();

const arcAccounts = require("../models/arcAccounts.js"); //Accounts Database Route

router.post("/", async (req, res) => {
    let responseCode = await arcAccounts.createAccount(req);
    res.sendStatus(responseCode).send(); //Appropriate Response Code sent back to user
});

module.exports = router;
