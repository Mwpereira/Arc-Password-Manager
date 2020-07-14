<template>
    <div class="signup">
        <h2>Create Account</h2>
        <form @submit.prevent="createAccount"  class="validation-form">
            <span id="inputs">
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
             </span>
        <input type="submit" class="action-btn" id="register" value="Register"/>
        </form>
        <span id="loginItems">
            <label id="loginArc-label">Already created an account?</label>
            <label id="loginArc-btn" value="Login" onclick="javascript:location.href='/login'">Login</label>
        </span>
        <p class="signup-error-message" v-if="errorMessage != ''">
            {{ errorMessage }}
        </p>
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
            let form = document.getElementById("inputs");

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
                        localStorage.setItem("encryptionType", "AES");
                        localStorage.setItem("slidesEnabled", "true");
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
            } catch(e) {
                console.log(e);
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
    box-sizing: border-box;
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

#register{
    margin-top: 2rem;  
    background: linear-gradient(to right, rgb(255, 0, 0), #b60000);
    color: white;
}

#inputs{
   height: 175px;
}

#loginItems{
    margin-top: 2rem;
}   

#loginArc-label{
    background-color: transparent;
	color: black;
	font-size: 20px;
    font-weight: bold;
	width: 20rem;
	height: 2rem;
	text-align: center;
}

#loginArc-btn {
	background-color: transparent;
    outline: none;
    border: none;
	color: red;
	font-size: 20px;
    font-weight: bold;
	width: 5rem;
	height: 2rem;
	text-align: center;
    cursor: pointer;
    margin-left: 0.5rem;
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

#lock{
    position: relative;
    transform: rotate(310deg);
    margin-left: 160vh;
    margin-top: -30rem;
    height: 40vh;
    width: auto;
}
</style>
