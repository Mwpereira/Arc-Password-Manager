<template>
        <div class="settings">
            <form>
                <span class="encryptionType">
                <h2>Encrption Type:</h2>
                <select name="encryptions" id="lbET" @click="setEncryptionType()">
                    <option value="AES">AES</option>
                    <option value="DES">DES</option>
                    <option value="TripleDES">TripleDES</option>
                    <option value="Rabbit">Rabbit</option>
                </select>
                </span>
                <label id="lblDefault">Default: AES</label>
                <label id="lblDefault">Requires A Longer Save Time To Convert Your Already Saved Data</label>
                <span class="arcSlides">
                    <h2>Arc Startup Slides:</h2>
                    <input type="checkbox" id="cbSlides" value="Enabled" v-model="ckSlidesEnabled" />
                    <label for="cbSlides" id="lblSlides">Enabled</label>
                </span>
                <span class="dAD">
                    <h2 id="lbldAD">Delete All Arc Data</h2>
                    <input class="main-btn" id="deleteBtn" type="button" value="Delete Data" @click="deleteArcData"/>
                </span>
                <label id="lblDefault">Action Cannot Be Undone - App Will Exit</label>
                <span class="buttons">
                    <input
                        class="main-btn"
                        id="formBtns"
                        type="submit"
                        value="Save"
                        v-on:click="saveSettings"
                    />
                    <input
                        class="main-btn"
                        id="formBtns"
                        type="submit"
                        value="Cancel"
                        v-on:click="loadSettings"
                    />
                </span>
            </form>
        </div>
</template>

<script>
import store from "@/store";
import CryptoJS from "crypto-js";

export default {
    name: "Settings",
    data: () => {
        return {
            encryptionType: "",
            ckSlidesEnabled: "",
        };
    },
    methods: {
        convertEncryptions(fromEncryption, toEncryption){
            let accounts = store.getters.encryptionType;
            let passPhrase = store.getters.passPhrase;
            let newAccounts = [];
            accounts.forEach(element => {
                newAccounts.push({
                    webApp: this.encrypt(this.decrypt(element.webApp, passPhrase, fromEncryption),passPhrase, toEncryption),
                    email: this.encrypt(this.decrypt(element.email, passPhrase, fromEncryption),passPhrase, toEncryption),
                    username: this.encrypt(this.decrypt(element.username, passPhrase, fromEncryption),passPhrase, toEncryption),
                    password: this.encrypt(this.decrypt(element.password, passPhrase, fromEncryption),passPhrase, toEncryption),
                    securityAnswer1: this.encrypt(this.decrypt(element.securityAnswer1, passPhrase, fromEncryption),passPhrase, toEncryption),
                    securityAnswer2: this.encrypt(this.decrypt(element.securityAnswer2, passPhrase, fromEncryption),passPhrase, toEncryption),
                    securityAnswer3: this.encrypt(this.decrypt(element.securityAnswer3, passPhrase, fromEncryption),passPhrase, toEncryption)
                });
            });
            sessionStorage.setItem("done", "yes");
            store.commit('setAccounts', newAccounts);
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
        deleteArcData(){
            localStorage.clear();
            const remote = require('electron').remote
            let w = remote.getCurrentWindow()
            w.close()
        },
        encrypt(text, passPhrase, encryptionType){
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
        loadSettings() {
            let encryptionType = store.getters.encryptionType;
            let ckSlidesEnabled = store.getters.slidesEnabled;
            let checkedValue = document.getElementById("cbSlides");

            this.encryptionType = encryptionType;
            document.getElementById('lbET').value = encryptionType;

            if (ckSlidesEnabled == "true") {
                checkedValue.checked = true;
                this.ckSlidesEnabled = true;
                this.checkedValue = true;
            } else {
                checkedValue.checked = false;
                this.ckSlidesEnabled = false;
                this.checkedValue = false;
            }
        },
        saveSettings() {
            let encryptionType = this.encryptionType;
            let ckSlidesEnabled = this.ckSlidesEnabled;
            
            if (encryptionType != undefined) {
                if(this.encryptionType != encryptionType){
                 this.convertEncryptions(this.encryptionType, encryptionType);
                 store.commit('setEncryptionType', encryptionType);
                }     
            }

            if (ckSlidesEnabled != undefined) {
                store.commit('setSlidesEnabled', ckSlidesEnabled);
            }

            store.commit('updateUserData');
        },
        setEncryptionType(){
            var e = document.getElementById("lbET");
            var type = e.options[e.selectedIndex].text;
            if(this.encryptionType != type){
                this.encryptionType = type;
            }
        },
    },
    mounted() {
        this.loadSettings();
    },
};
</script>

<style scoped>
form{
    display: flex;
    flex-direction: column;
    margin-left: 5rem;
}

h2{
    margin-bottom: 1rem;
}

select{
    font-size: 20px;
}

span{
    margin-top: 4rem;
}

label {
    font-size: 20px;
}

p {
    font-size: 20px;
    cursor: default;
}

.encryptionType{
    display: flex;
    flex-direction: row;
}

.arcSlides {
    display: flex;
    flex-direction: row;
}

.dAD{
    display: flex;
    flex-direction: row;
}

.main-btn{
	color: black;
	justify-content: center;
	border: none;
	border-radius: 100px;
	width: 125px;
	height: 40px;
	outline: none;
	font-size: large;
	font-weight: 550;
	margin: 5px;
	cursor: pointer;
    background-color: white;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#lbldAD{
    margin-top: 0.5rem;
}

#lbET{
    margin-left: 1rem;
    margin-top: 0.15rem;
    margin-bottom: 1rem;
    width: 7.5rem;
}

#lblDefault{
    font-size: 20px;
    font-style: italic;
}

#cbSlides{
    margin-top: 0.5rem;
    margin-left: 1rem;
    margin-right: 0.5rem;
}

#lblSlides{
    margin-top: 0.1rem;
}

#deleteBtn{
    margin-left: 1rem;
    height: 30px;
}

#formBtns{
    background-color: white;
    width: 175px;
    height: 50px;
}
</style>
