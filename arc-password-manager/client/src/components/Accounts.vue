<template>
    <div class="accounts">
        <ul class="listAccounts">
            <h1 id="lblAccounts">Accounts</h1>
            <li v-for="account in accounts" :key="account.accountName">
                <h2 @click="loadForm(account.accountName)">
                    <img src="../assets/home.png" id="logo" style="width: 25px; height: 25px;">{{account.accountName}}</h2>
            </li>
        </ul>
        <!--a href="https://clearbit.com">Logos provided by Clearbit</a-->
    </div>   
</template>

<script>
import CryptoJS from "crypto-js";
import store from "@/store";

export default {
    name: "Accounts",
    data: () => {
        return {
            accounts: [],
            passPhrase: ""
        };
    },
    methods: {
        arcStartup(){
            if(sessionStorage.getItem("arcLoaded")==false){
                let username = sessionStorage.getItem("user");
                let arcData = JSON.parse(sessionStorage.getItem("$data."+username));
                
                store.commit("setPassPhrase", arcData.passPhrase);
                store.commit("setEncryptionType", arcData.encryptionType);
                store.commit("setSlidesEnabled", arcData.slidesEnabled);
            }
            else{
                sessionStorage.setItem("arcLoaded", "false");
            }
        },
       /* loadLogo(){
            let accountsList = store.getters.accounts;
            accountsList.forEach(element => {
                document.getElementsByTagName("h2")[1].style.width = "10rem";
               // document.getElementsByTagName("img")[4].src = "//logo.clearbit.com/spotify.com";
                console.log(element);
            });
        },*/
        loadForm(elem){
            store.commit('loadForm', elem);
            this.$emit('loadForm');
        },
        loadAccounts(){
            store.commit('loadAccounts');
            this.updateAccounts();
        },
        updateAccounts(){
            let username = sessionStorage.getItem("user");
            
            if(sessionStorage.getItem("$accounts."+username)==undefined){
                let arcData = JSON.parse(sessionStorage.getItem("$data."+username));
                if(arcData.accounts!=""){
                    store.commit("setAccounts", arcData.accounts);
                }             
            }
            else{
                store.commit("setAccounts", JSON.parse(sessionStorage.getItem("$accounts."+username)));
            }              

            let accountsList = store.getters.accounts;
            let passPhraseCode = store.getters.passPhrase;
            let encryptionType = store.getters.encryptionType;

            this.accounts = [];

            if(accountsList.length > 12){
                document.getElementsByClassName("listAccounts")[0].style.overflow = "scroll";
            }
            else{
                document.getElementsByClassName("listAccounts")[0].style.overflow = "hidden";
            }

            if(encryptionType == "AES"){
                accountsList.forEach(element => {
                this.accounts.push({
                    accountName: CryptoJS.AES.decrypt(element.webApp, passPhraseCode).toString(CryptoJS.enc.Utf8),
                    });
                });
            }

            if(encryptionType == "DES"){
                accountsList.forEach(element => {
                this.accounts.push({
                    accountName: CryptoJS.DES.decrypt(element.webApp, passPhraseCode).toString(CryptoJS.enc.Utf8),
                    });
                });
            }

            if(encryptionType == "TripleDES"){
                accountsList.forEach(element => {
                this.accounts.push({
                    accountName: CryptoJS.TripleDes.decrypt(element.webApp, passPhraseCode).toString(CryptoJS.enc.Utf8),
                    });
                });
            }

            if(encryptionType == "Rabbit"){
                accountsList.forEach(element => {
                this.accounts.push({
                    accountName: CryptoJS.Rabbit.decrypt(element.webApp, passPhraseCode).toString(CryptoJS.enc.Utf8),
                    });
                });
            }
        }
    },
    mounted() {
      this.arcStartup();
      this.loadAccounts();
    },
};
</script>

<style scoped>
h2 {
    font-family: "Varela Round", sans-serif;
    color: black;
    text-align: center;
    margin-top: 1rem;
}

h2:hover {
  color: #2693ff;
}

button{
    widows: 100%;
    z-index: 99;
}

.accounts {
    width: 40vh;
}

.listAccounts {
    display: flexbox;
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    height: 90vh;
    width: 40vh;
    background-color: white;
    color: black;
    overflow: scroll;
    overflow-x: hidden;
}

#lblAccounts{
    font-size: 32px;
    color: black;
    text-align: center;
    margin-top: 1rem;
}
</style>
