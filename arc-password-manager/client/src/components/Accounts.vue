<template>
    <div class="accounts">
        <ul class="listAccounts">
            <h1 id="lblAccounts">Accounts</h1>
            <li v-for="account in accounts" :key="account.accountName">
                <h2 @click="loadForm(account.accountName)">{{account.accountName}}</h2>
            </li>
        </ul>
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
        loadForm(elem){
            store.commit('loadForm', elem);
            this.$emit('loadForm');
        },
        loadAccounts(){
            store.commit('loadAccounts');
            this.updateAccounts();
        },
        updateAccounts(){
            let accountsList = store.getters.accounts;
            let passPhraseCode = store.getters.passPhrase;

            if(store.getters.encryptionType == ""){
                store.commit('encryptionType', localStorage.getItem("encryptionType"));
            }

            let encryptionType = store.getters.encryptionType;

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
    background: red;
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
}

#lblAccounts{
    font-size: 32px;
    color: black;
    text-align: center;
    margin-top: 1rem;
}
</style>
