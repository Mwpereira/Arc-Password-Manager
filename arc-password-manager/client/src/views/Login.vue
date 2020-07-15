<template>
    <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="authorizeAccount" class="validation-form">
            <span id="inputs">
            <input
                autofocus
                class="input-bar"
                type="text"
                placeholder="Username"
                v-model="username"
                required
            />
            <input
                class="input-bar"
                type="password"
                placeholder="Password"
                v-model="password"
                required
            />
            </span>
            <input type="submit" class="action-btn" id="login" value="Login" />
            <span id="signupItems">
                <label id="signupArc-label">Need to create an account?</label>
                <label id="signupArc-btn" onclick="javascript:location.href='/signup'">Sign up</label>
            </span>
            <p class="login-error-message" v-if="errorMessage != ''">
                {{ errorMessage }}
            </p>
        </form>
    </div>
</template>

<script>
import bcrypt from "bcryptjs";
import store from "@/store";

export default {
    name: "Login",
    data: () => {
        return {
            username: "",
            password: "",
            errorMessage: "",
        };
    },
    methods: {
        async authorizeAccount() {
            let form = document.getElementById("inputs");

            let username = form.children[0].value;
            let password = form.children[1].value;

            if (username != "" && password != "") {
                try {
                    if (localStorage.getItem(username) != null) {
                        if (await bcrypt.compare(password, localStorage.getItem(username))) {
                            await store.commit('setUser', username);
                            if (localStorage.getItem("slidesEnabled") == "false") {
                                window.location.href = "/main/home";
                            } else {
                                window.location.href = "/newUser";
                            }
                        } else {
                            this.errorMessage = "Username or Password Is Incorrect";
                        }
                    } else {
                        this.errorMessage = "Username or Password Is Incorrect";
                    }
                } catch {
                    this.errorMessage = "Username or Password Is Incorrect";
                }
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
    height: 100%;
    width: 100%;
    overflow: hidden;
}

h2{
    font-size: 40px;
    margin-bottom: 2rem;
}

p {
    font-weight: bold;
    font-size: 20px;
    font-style: italic;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    color: red;
}

.validation-form {
	width: 22.5rem;
	border-radius: 15px;
	padding: 0.25rem 0.25rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.action-btn{
	color: white;
	justify-content: center;
	border: none;
	border-radius: 100px;
	width: 150px;
	height: 50px;
	outline: none;
	font-size: large;
	font-weight: 550;
	margin: 10px;
	cursor: pointer;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.action-btn:hover{
    transform: scale(1.1,1.1);
}

.input-bar {
	outline: none;
	border: none;
    border-bottom: 2px solid black;
	background-color: rgba(255, 255, 255, 0);
	margin: 10px;
	font-size: 22px;
	font-family: 'Bitter';
	color: black;
	padding: 5px 5px;
	cursor: text;
    width: 20rem;
}

.input-bar:hover,:focus{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-bottom: none;
}

#inputs{
   height: 125px;
}

#login{
    margin-top: 2rem;  
    background: linear-gradient(to right, rgb(46, 126, 255), #0040b6);
    color: white;
}

#signupItems{
    margin-top: 2rem;
}   

#signupArc-label{
    background-color: transparent;
	color: black;
	font-size: 20px;
    font-weight: bold;
	width: 20rem;
	height: 2rem;
	text-align: center;
}

#signupArc-btn {
	background-color: transparent;
    outline: none;
    border: none;
	color: blue;
	font-size: 20px;
    font-weight: bold;
	width: 10rem;
	height: 2rem;
	text-align: center;
    cursor: pointer;
    margin-left: 0.5rem;
}

#lock{
    position: relative;
    transform: rotate(310deg);
    margin-left: 160vh;
    margin-top: -30rem;
    height: 40vh;
    width: auto;
}
</style>
