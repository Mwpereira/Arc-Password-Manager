const express = require("express"); //Express Framework
const router = express.Router();

const dbAccounts = require("../models/arcAccounts.js"); //Accounts Database Route

const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
    let account = await dbAccounts.authorizeAccount(req); //Login

    if (account.statusCode == 200) {
        const accessToken = jwt.sign(
            //JWT Authorization
            {
                email: req.body.email,
                _id: account._id,
            },
            process.env.ACCESS_TOKEN_SECRET
        );
        res.json({ accessToken });
    } else {
        res.sendStatus(account.statusCode);
    }
});

module.exports = router;
