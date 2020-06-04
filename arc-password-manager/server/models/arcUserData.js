const mongodb = require("mongodb"); //MongoDB Package

class dbUserData {
    //Connect to the database and collection to load user data
    static async loadUserDataCollection() {
        const client = await mongodb.MongoClient.connect(process.env.DBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        return client.db("UniCo").collection("userdata");
    }

    //NOT COMPLETE AT ALL
    static async loadDashboardData(accessToken) {
        try {
            const userData = await this.loadUserDataCollection();

            const user = await userData.findOne({ _id: accessToken._id });

            let dashboardData = {
                cgpa: user.cgpa,
                csgpa: user.csgpa,
                nocc: user.nocc,
                egy: user.egy,
            };
            return dashboardData;
        } catch {
            return null;
        }
    }

    static async createUserData(email, id) {
        try {
            const userData = await this.loadUserDataCollection();

            await userData.insertOne({
                _id: id,
                email: email,
            });
            return 201;
        } catch (err) {
            console.log(err);
            return 500;
        }
    }

    static async addSchool(req) {
        try {
            const userData = await this.loadUserDataCollection();

            await userData.updateOne(
                { _id: id },
                {
                    school: req.school,
                    program: req.program,
                    programType: req.programType,
                    gpaScale: req.gpaScale,
                    requirements: req.requirements,
                }
            );

            return 201;
        } catch (err) {
            console.log(err);
            return 500;
        }
    }

    static async addCourse(req) {
        try {
            const userData = await this.loadUserDataCollection();

            await userData.update(
                { _id: id },
                {
                    courseCode: req.courseCode,
                    requirement: req.requirement,
                    completion: req.completion,
                    gpaGrade: req.gpaGrade,
                }
            );
            return 201;
        } catch (err) {
            console.log(err);
            return 500;
        }
    }
}

module.exports = dbUserData;
