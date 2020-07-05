<template>
    <div class="addForm">
        <form @submit.prevent="saveAccount">
            <span>
                <label>Website/App:</label>
                <input autofocus class="input-bar" type="text" v-model="webApp" />
            </span>
            <span>
                <label>Email:</label>
                <input autofocus class="input-bar" type="text" v-model="email" />
            </span>
            <span>
                <label>Username:</label>
                <input class="input-bar" type="text" v-model="username" />
            </span>
            <span>
                <label>Password:</label>
                <input class="input-bar" type="text" v-model="password" />
            </span>
            <span>
                <label>Security Answer 1:</label>
                <input class="input-bar" type="text" v-model="sa1" />
            </span>
            <span>
                <label>Security Answer 2:</label>
                <input class="input-bar" type="text" v-model="sa2" />
            </span>
            <span>
                <label>Security Answer 3:</label>
                <input class="input-bar" type="text" v-model="sa3" />
            </span>
            <span>
                <input class="action-btn" type="submit" value="Save" @click="saveAccount" />
                <input class="action-btn" type="submit" value="Cancel" @click="completeAccount" />
            </span>
        </form>
    </div>
</template>

<script>
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
        saveAccount() {
            let form = document.getElementsByTagName("form")[0];
            this.completeAccount();

            let webApp = form.children[0].value;
            let email = form.children[1].value;
            let username = form.children[2].value;
            let password = form.children[3].value;
            let securityAnswer1 = form.children[4].value;
            let securityAnswer2 = form.children[5].value;
            let securityAnswer3 = form.children[6].value;

            let account = {
                webApp: webApp,
                email: email,
                username: username,
                password: password,
                securityAnswer1: securityAnswer1,
                securityAnswer2: securityAnswer2,
                securityAnswer3: securityAnswer3,
            };

            sessionStorage.setItem("account", account);
        },
    },
    mounted() {},
};
</script>

<style scoped>
div {
    position: relative;
    height: 100%;
    width: 100%;
    margin-top: 1rem;
    margin-left: 2rem;
    display: flex;
    flex-direction: column;
}

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
}

.addForm {
    display: flex;
    flex-direction: column;

    align-items: center;
    height: auto;
    width: 38rem;
    background-color: rgb(229, 229, 229);
}
</style>
