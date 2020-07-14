<template>
    <div class="editForm">
        <form>
            <span>
                <label>Website/App:</label>
                <input autofocus class="input-bar" type="text" v-model="webApp" minlength="2" required/>
            </span>
            <span>
                <label>Email:</label>
                <input class="input-bar" type="text" v-model="email" minlength="3" required/>
            </span>
            <span>
                <label>Username:</label>
                <input class="input-bar" type="text" v-model="username" minlength="3" required/>
            </span>
            <span>
                <label>Password:</label>
                <input class="input-bar" type="text" v-model="password" minlength="3" required/>
            </span>
            <span class="inputSC">
                <label>Security Answer 1:</label>
                <input class="input-bar" type="text" v-model="securityAnswer1" />
            </span>
            <span class="inputSC">
                <label>Security Answer 2:</label>
                <input class="input-bar" type="text" v-model="securityAnswer2" />
            </span>
            <span class="inputSC">
                <label>Security Answer 3:</label>
                <input class="input-bar" type="text" v-model="securityAnswer3" />
            </span>
            <span>
                <input class="action-btn" type="submit" value="Save" @click="saveAccount" />
                <input class="action-btn" type="submit" value="Cancel" @click="exit" />
                <label type="submit" value>
                <img class="dAC" src="../assets/trashbin.png" @click="deleteAccount" />
                </label>
            </span>
        </form>
    </div>
</template>

<script>
import CryptoJS from "crypto-js";
import store from "@/store";

export default {
    name: "EditForm",
    props: ["component" ],
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
        exit() {
            this.$emit("clearComponent");
        },
        encryptString(text, passPhrase, encryptionType){
            if (encryptionType == "AES"){
                return CryptoJS.AES.encrypt(text, passPhrase).toString();
            }
            if(encryptionType == "DES"){
                return CryptoJS.DES.encrypt(text, passPhrase).toString();
            }
            if(encryptionType == "TripleDES"){
                return CryptoJS.TripleDes.encrypt(text, passPhrase).toString();
            }
            if(encryptionType == "Rabbit"){
                return CryptoJS.TripleDes.encrypt(text, passPhrase).toString();
            }            
        },
        decrypt(text, passPhrase, encryptionType){
            if (encryptionType == "AES"){
                return CryptoJS.AES.decrypt(text, passPhrase).toString(CryptoJS.enc.Utf8);
            }
            if(encryptionType == "DES"){
                return CryptoJS.DES.decrypt(text, passPhrase).toString(CryptoJS.enc.Utf8);
            }
            if(encryptionType == "TripleDES"){
                return CryptoJS.TripleDes.decrypt(text, passPhrase).toString(CryptoJS.enc.Utf8);
            }
            if(encryptionType == "Rabbit"){
                return CryptoJS.TripleDes.decrypt(text, passPhrase).toString(CryptoJS.enc.Utf8);
            }       
        },
        deleteAccount(){
            let accountsList = store.getters.accounts;
            let loadAccount = store.getters.loadForm;
            let passPhraseCode = store.getters.passPhrase;
            let encryptionType = localStorage.getItem("encryptionType");

            let i = 0;
    
            for (i = 0; i < accountsList.length; i++){        
                if(this.decrypt(accountsList[i].webApp, passPhraseCode, encryptionType) == loadAccount){
                    break;
                }
            }
            
            store.commit('deleteAccount', i);
            window.location.reload();

            this.exit();
        },
        loadAccount() {
            try {                
                   
            let accountsList = store.getters.accounts;
            let passPhraseCode = store.getters.passPhrase;
            let loadAccount = store.getters.loadForm;
            let encryptionType = localStorage.getItem("encryptionType");
            let account;

            let i = 0;
    
            for (i = 0; i < accountsList.length; i++){       
                if(this.decrypt(accountsList[i].webApp, passPhraseCode, encryptionType) == loadAccount){
                    account = accountsList[i];
                    break;
                }
            }

            this.webApp = this.decrypt(account.webApp, passPhraseCode, encryptionType);
            this.email = this.decrypt(account.email, passPhraseCode, encryptionType);
            this.username = this.decrypt(account.username, passPhraseCode, encryptionType);
            this.password = this.decrypt(account.password, passPhraseCode, encryptionType);

            let tempSCA;

            tempSCA = this.decrypt(account.securityAnswer1, passPhraseCode, encryptionType);
            if(tempSCA != ""){this.securityAnswer1 = tempSCA}
            else{this.securityAnswer1 = "Empty"}

            tempSCA = this.decrypt(account.securityAnswer2, passPhraseCode, encryptionType);
            if(tempSCA != ""){this.securityAnswer2 = tempSCA}
            else{this.securityAnswer2 = "Empty"}

            tempSCA = this.decrypt(account.securityAnswer3, passPhraseCode, encryptionType);
            if(tempSCA != ""){this.securityAnswer3 = tempSCA}
            else{this.securityAnswer3 = "Empty"}

            }
            catch(e){
                console.log(e);
            }
        },
        saveAccount() {
            try {
            let details = document.getElementsByTagName("input");
            let encryptionType = localStorage.getItem("encryptionType");
            let passPhraseCode = "";

            if (localStorage.getItem("passPhrase") != null){
                passPhraseCode = localStorage.getItem("passPhrase");
            }
            else{
                var length = 32;
                var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*./'";
                for (var i = 0, n = charset.length; i < length; ++i) {
                passPhraseCode += charset.charAt(Math.floor(Math.random() * n));
                }
                localStorage.setItem("passPhrase", passPhraseCode);       
            }

            if(details[2].value.length >= 3 && details[3].value.length >= 3 
            && details[4].value.length >= 3 && details[5].value.length >= 3){

            const webApp = this.encryptString(details[2].value, passPhraseCode, encryptionType);
            const email = this.encryptString(details[3].value, passPhraseCode, encryptionType);
            const username = this .encryptString(details[4].value, passPhraseCode, encryptionType);
            const password = this.encryptString(details[5].value, passPhraseCode, encryptionType);
            const securityAnswer1 = this.encryptString(details[6].value, passPhraseCode, encryptionType);
            const securityAnswer2 = this.encryptString(details[7].value, passPhraseCode, encryptionType);
            const securityAnswer3 = this.encryptString(details[8].value, passPhraseCode, encryptionType);

            let account = {
                webApp: webApp,
                email: email,
                username: username,
                password: password,
                securityAnswer1: securityAnswer1,
                securityAnswer2: securityAnswer2,
                securityAnswer3: securityAnswer3,
            };

            let accountsList = store.getters.accounts;

            let i = 0;
    
            for (i = 0; i < accountsList.length; i++){     
                if(this.decrypt(accountsList[i].webApp, passPhraseCode, encryptionType) == store.getters.loadForm){
                    break;
                }
            }
            
            let tuple = {
                accountUpdated : account,
                index : i
            }

            store.commit('updateAccount', tuple);
            this.exit();
            }
            }
            catch(e){
                console.log(e);
            }
        },
    },
    mounted() {
        this.loadAccount();
    },
};
</script>

<style scoped>
span {
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    margin-bottom: 0.5rem;
    align-items: center;
    justify-content: flex-start;
}

h1 {
    color: black;
}

label {
    font-size: 22px;
    cursor: default;
}

input {
    background-color: white;
    color: black;
    width: 10rem;
    font-size: 22px;
}

form{
    margin-left: 0.75rem;
}

.editForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: auto;
    width: auto;
    margin-left: 1.5rem;
    margin-top: 1rem;
    background-color: rgb(229, 229, 229);
}

.action-btn{
    color: black;
	justify-content: center;
	border: none;
	border-radius: 100px;
	width: 200px;
	height: 40px;
	outline: none;
	font-size: large;
	font-weight: 550;
	margin: 10px;
	cursor: pointer;
    background-color: white;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.inputSC{
   margin: 0rem;
}

.input-bar {
	outline: none;
	border: none;
	background-color: rgba(255, 255, 255, 0);
	margin: 10px;
	font-size: 20px;
	font-family: 'Bitter';
	color: black;
	padding: 5px 5px;
	cursor: text;
    width: 10rem;    
    background-color: white;
}

.input-bar:hover,:focus{
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-bottom: none;
}


.dAC{
    margin-top: -0.1rem;
    margin-left: 0.5rem;
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
}
</style>