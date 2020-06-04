const mongodb = require("mongodb"); //MongoDB Package
const bcrypt = require("bcrypt"); //Encryption Package

const dbUserData = require("./arcUserData"); //UserData Database Route

class dbAccounts {
    //Connect to the database and collection
    static async loadAccountsCollection() {
        const client = await mongodb.MongoClient.connect(process.env.DBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        return client.db("Arc").collection("accounts");
    }

    static async createAccount(req) {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const accounts = await this.loadAccountsCollection();

            const accountExists = await accounts.find({ username: req.body.username }).count();

            if (accountExists != 0) return 403;

            await accounts.insertOne({
                username: req.body.username,
                password: hashedPassword,
            });

            const createdAccount = await accounts.findOne({ username: req.body.username }, {});
            const _id = createdAccount._id;

            dbUserData.createUserData(req.body.username, _id);

            return 201;
        } catch (err) {
            console.log(err);
            return 500;
        }
    }

    static async authorizeAccount(req) {
        let account = {};
        const accounts = await this.loadAccountsCollection();
        let accountInfo = await accounts.findOne({ username: req.body.username });

        // If account exists
        if (accountInfo == null) {
            account.statusCode = 404;
            return account;
        }

        // If password is correct
        if (await bcrypt.compare(req.body.password, accountInfo.password)) {
            account.statusCode = 200;
            account.id = accountInfo._id;
            return account;
        } else {
            account.statusCode = 401;
            return account;
        }
    }

    static async getID(req) {
        //Unused ATM//
        const accounts = await this.loadAccountsCollection();
        const username = req.body.username;
        let account = await accounts.findOne({ username: username });
        return account._id;
    }
}

module.exports = dbAccounts;
