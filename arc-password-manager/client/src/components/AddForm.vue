<template>
    <div class="addForm">
        <form @submit.prevent="saveAccount">
            <span>
                <label>Website/App:</label>
                <input autofocus class="input-bar" type="text" v-model="webApp" minlength="7" required/>
            </span>
            <span>
                <label>Email:</label>
                <input autofocus class="input-bar" type="text" v-model="email" />
            </span>
            <span>
                <label>Username:</label>
                <input class="input-bar" type="text" v-model="username" minlength="7" required/>
            </span>
            <span>
                <label>Password:</label>
                <input class="input-bar" type="text" v-model="password" minlength="7" required/>
            </span>
            <span>
                <label>Security Answer 1:</label>
                <input class="input-bar" type="text" v-model="securityAnswer1" />
            </span>
            <span>
                <label>Security Answer 2:</label>
                <input class="input-bar" type="text" v-model="securityAnswer2" />
            </span>
            <span>
                <label>Security Answer 3:</label>
                <input class="input-bar" type="text" v-model="securityAnswer3" />
            </span>
            <span>
                <input class="action-btn" type="submit" value="Save" @click="saveAccount" />
                <input class="action-btn" type="submit" value="Cancel" @click="completeAccount" />
            </span>
        </form>
    </div>
</template>

<script>
import bcrypt from "bcryptjs";

export default {
    name: "AddForm",
    props: ["component"],
    data: () => {
        return {
            webApp: "",
            email: "",
            username: "",
            password: "",
            securityAnswer1: "",
            securityAnswer2: "",
            securityAnswer3: "",
        };
    },
    methods: {
        completeAccount() {
            this.$emit("eventname");
        },
        async saveAccount() {

            try {

            let details = document.getElementsByTagName("input");
            this.completeAccount();

            const salt = await bcrypt.genSaltSync();

            const webApp = await bcrypt.hashSync(details[2].value, salt);
            const email = await bcrypt.hashSync(details[3].value, salt);
            const username = await bcrypt.hashSync(details[4].value, salt);
            const password = await bcrypt.hashSync(details[5].value, salt);
            const securityAnswer1 = await bcrypt.hashSync(details[6].value, salt);
            const securityAnswer2 = await bcrypt.hashSync(details[7].value, salt);
            const securityAnswer3 = await bcrypt.hashSync(details[8].value, salt);

            let account = {
                webApp: webApp,
                email: email,
                username: username,
                password: password,
                securityAnswer1: securityAnswer1,
                securityAnswer2: securityAnswer2,
                securityAnswer3: securityAnswer3,
            };

            localStorage.setItem("abcDEF", JSON.stringify(account));
            }
            catch{
                console.log("ERROR");
            }
        },
    },
    mounted() {},
};
</script>

<style scoped>
span {
    margin-top: 2rem;
    display: flex;
    flex-direction: row;
    margin-bottom: 2rem;
    align-items: center;
    justify-content: flex-end;
}

h1 {
    color: black;
}

label {
    font-size: 24px;
    cursor: default;
}

input {
    background-color: white;
    color: black;
    cursor: pointer;
}

form{
    margin-left: 0.75rem;
}

.addForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 110vh;
    width: 78vh;
    margin-left: 1.5rem;
    background-color: rgb(229, 229, 229);
}

.action-btn {
    margin-right: 2rem;
}

@media (min-width: 900px), (min-height: 900px) {
    .addForm{
        height: 82vh;
    }
}
</style>
