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
            <span id="errorMessage">
            <p class="login-error-message" v-if="errorMessage != ''">
                {{ errorMessage }}
            </p>
            </span>
        </form>
    </div>
</template>

<script>
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";

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

            let errorMessage = "Username or Password Is Incorrect";

            if (username != "" && password != "") {
                try {
                    if (localStorage.getItem(username) != null) {
                        if (await bcrypt.compare(password, localStorage.getItem(username))) {
                            let decUserData = CryptoJS.AES.decrypt(localStorage.getItem("$data."+username), password).toString(CryptoJS.enc.Utf8);
                            let arcData = JSON.parse(decUserData);

                            arcData.passPhrase = CryptoJS.AES.decrypt(arcData.passPhrase, password).toString(CryptoJS.enc.Utf8)+password;
                            arcData.encryptionType =  CryptoJS.AES.decrypt(arcData.encryptionType, password).toString(CryptoJS.enc.Utf8);
                            arcData.slidesEnabled = CryptoJS.AES.decrypt(arcData.slidesEnabled, password).toString(CryptoJS.enc.Utf8);
                            
                            sessionStorage.setItem("$data."+username, JSON.stringify(arcData));
                            sessionStorage.setItem("user", username);
                            sessionStorage.setItem("arcLoaded", "false");

                            if (arcData[3] == "false") {
                                this.$router.push("/main/home");
                            } else {
                                this.$router.push("/newUser");
                            }
                        } else {
                            this.errorMessage = errorMessage;
                        }
                    } else {
                        this.errorMessage = errorMessage;
                    }
                } catch(e) {
                    console.log(e);
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

#errorMessage{
    height: 5vh;
    transform: translate(0px, 20px);
}

#login{
    margin-top: 2rem;  
    background: linear-gradient(to right, rgb(146, 146, 255), rgb(0, 0, 255));
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
