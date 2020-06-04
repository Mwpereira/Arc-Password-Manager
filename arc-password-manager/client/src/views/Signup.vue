<template>
    <div class="signup">
        <h1>Arc</h1>
        <form @submit.prevent="createAccount" class="validation-form">
            <input
                autofocus
                class="input-bar"
                type="text"
                v-model="username"
                placeholder="Username"
                minlength="3"
                required
            />
            <input
                class="input-bar"
                type="password"
                v-model="password"
                placeholder="Password"
                minlength="7"
                required
            />
            <input
                class="input-bar"
                type="password"
                v-model="confirmPassword"
                placeholder="Confirm Password"
                required
            />
            <input type="submit" class="action-btn" id="register" value="Register" />
            <input
                class="action-btn"
                id="signupArc-btn"
                value="Already created an account? Login"
                onclick="javascript:location.href='/login'"
            />
            <p class="signup-error-message" v-if="errorMessage != ''">
                {{ errorMessage }}
            </p>
        </form>
    </div>
</template>

<script>
import bcrypt from "bcryptjs";

export default {
    name: "Signup",
    data: () => {
        return {
            username: "",
            password: "",
            confirmPassword: "",
            errorMessage: "",
        };
    },
    methods: {
        async createAccount() {
            let form = document.getElementsByTagName("form")[0];

            try {
                let username = form.children[0].value;
                let password = form.children[1].value;
                let confirmpassword = form.children[2].value;

                if (username != "" && password != "" && confirmpassword != "") {
                    if (
                        password.localeCompare(confirmpassword) == 0 &&
                        localStorage.getItem(username) === null
                    ) {
                        const salt = await bcrypt.genSaltSync();
                        const hashedPassword = await bcrypt.hashSync(password, salt);

                        localStorage.setItem(username, hashedPassword);
                        localStorage.setItem("salt", "10");
                        localStorage.setItem("adEnabled", "true");
                        localStorage.setItem("darkMode", "false");

                        window.location.href = "/login";
                    } else if (password.localeCompare(confirmpassword) != 0) {
                        this.errorMessage = "Signup Error";
                    } else {
                        this.errorMessage = "Signup Error";
                    }
                } else {
                    this.errorMessage = "Signup Error";
                }
            } catch {
                console.log("Account Creation Failed!");
            }
        },
    },
};
</script>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    background-image: url("../assets/background900.jpg");
    height: 100%;
}

p {
    font-weight: bold;
    font-size: 20px;
    font-style: italic;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    color: red;
}

@media (min-width: 900px), (min-height: 700px) {
    div {
        background-image: url("../assets/background1920.jpg");
    }
}
</style>
