<template>
    <div class="loadForm">
        <form>
            <span>
                <label>Website/App:</label>
                <label class="value">Empty</label>
            </span>
            <span>
                <label>Email:</label>
                <label class="value">Empty</label>
            </span>
            <span>
                <label>Username:</label>
                <label class="value">Empty</label>
            </span>
            <span>
                <label>Password:</label>
                <label class="value">Empty</label>
            </span>
            <span class="inputSC">
                <label>Security Answer 1:</label>
                <label class="value">Empty</label>
            </span>
            <span class="inputSC">
                <label>Security Answer 2:</label>
                <label class="value">Empty</label>
            </span>
            <span class="inputSC">
                <label>Security Answer 3:</label>
                <label class="value">Empty</label>
            </span>
            <span>
                <input class="action-btn" type="button" value="Edit" @click="editAccount" />
                <input class="action-btn" type="button" value="Exit" id="btnExit" @click="exit" />
            </span>
        </form>
    </div>
</template>

<script>
import CryptoJS from "crypto-js";
import store from "@/store";

export default {
    name: "LoadForm",
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
        editAccount(){
            this.$emit('editForm');
            store.commit('editForm');
        },
        exit() {
            this.$emit("clearComponent");
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
        loadAccount() {
            try {                
                   
            let details = document.getElementsByTagName("label");
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

            details[1].innerText = this.decrypt(account.webApp, passPhraseCode, encryptionType);
            details[3].innerText = this.decrypt(account.email, passPhraseCode, encryptionType);
            details[5].innerText = this.decrypt(account.username, passPhraseCode, encryptionType);
            details[7].innerText = this.decrypt(account.password, passPhraseCode, encryptionType);

            let tempSCA;

            tempSCA = this.decrypt(account.securityAnswer1, passPhraseCode, encryptionType);
            if(tempSCA != ""){details[9].innerText = tempSCA}

            tempSCA = this.decrypt(account.securityAnswer2, passPhraseCode, encryptionType);
            if(tempSCA != ""){details[11].innerText = tempSCA}

            tempSCA = this.decrypt(account.securityAnswer3, passPhraseCode, encryptionType);
            if(tempSCA != ""){details[13].innerText = tempSCA}

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
    margin-bottom: 1rem;
    display: flex;
    flex-direction: row;
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

.loadForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    width: auto;
    margin-top: 1rem;
    background-color: rgb(229, 229, 229);
    justify-content: center;
	border: none;
	border-radius: 10px;
}

.action-btn{
    color: black;
	justify-content: center;
	border: none;
	border-radius: 100px;
	width: 175px;
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

.value{
    font-style: italic;
    margin-left: 1rem;
}
</style>
