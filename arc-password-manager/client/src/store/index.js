import Accounts from "@/components/Accounts";
import CryptoJS from "crypto-js";
import Home from "@/views/Home";
import LoadForm from "@/components/LoadForm";
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account: "",
    accounts: [],
    encryptionType: "",
    passPhrase: "",
    slidesEnabled: "",
    user: "",
  },
  mutations: {
    accounts(state, payload){
      state.accounts = payload;
      sessionStorage.setItem("accounts", payload);
      sessionStorage.setItem("payload", payload);
      sessionStorage.setItem("stateAccounts", JSON.stringify(state.accounts));    
    },
    addAccount(state, payload){
      state.accounts.push(payload);
    },
    clearForm(state){
      state.accounts = "";
    },
    deleteAccount(state, payload){
      state.accounts.splice(payload,1);
      sessionStorage.setItem("$data."+state.user, JSON.stringify(state.accounts));
    },
    editForm(){
      Home.methods.editForm();
    },
    loadForm(state, payload){
      if (state.account == ""){
        state.account = payload;
        Home.methods.loadForm();
      }
      else
      {
        state.account = payload;
        LoadForm.methods.loadAccount();  
      }
    },
    loadAccounts(state){
      let accounts = JSON.parse(sessionStorage.getItem("accounts"));
      if(accounts != null) {state.accounts = accounts}
    },
    setEncryptionType(state, payload){
      state.encryptionType = payload;
    },
    setPassPhrase(state, payload){
      state.passPhrase = payload;
    },
    setSlidesEnabled(state, payload){
      state.slidesEnabled = payload;
    },
    setUser(state, payload){
      state.user = payload;
    },
    updateAccount(state, payload){
      state.accounts.splice(payload.index, 1, payload.accountUpdated);
      Accounts.methods.updateAccounts();
    },
    updateUserData(state){
      let localData = [];
      localData.push(state.accounts);
      localData.push(state.passPhrase.substring(0, 33));
      localData.push(state.encryptionType);
      localData.push(state.slidesEnabled);
      CryptoJS.AES.encrypt(localData, state.passPhrase).toString();
      localStorage.setItem("$data."+state.user, localData);
      Accounts.methods.updateAccounts();
    }
  },
  actions: {
    accounts(state, payload){
      state.commit('accounts', payload);
    },
    addAccount(state, payload){
      state.commit('addAccount', payload);
    },
    clearForm(state){
      state.commit('clearForm');
    },
    deleteAccount(state, payload){
      state.commit('deleteAccount', payload);
    },
    editForm(state){
      state.commit('editForm');
    },
    loadForm(state, payload){
      state.commit('loadAccount', payload);
    },
    loadAccounts(state){
      state.commit('loadAccounts');
    },
    setEncryptionType(state, payload){
      state.commit('setEncryptionTime', payload);
    },
    setPassPhrase(state, payload){
      state.commit('setPassPhrase', payload);
    },
    setSlidesEnabled(state, payload){
      state.commit('setSlidesEnabled', payload);
    },
    updateAccount(state, payload){
      state.commit('updateAccount', payload);
    },
    updateUserData(state){
      state.commit('updateUserData');
    }
  },
  getters: {
    accounts(state){
      return state.accounts;
    },
    addAccount(state){
      return state.accounts;
    },
    encryptionType(state){
      return state.encryptionType;
    },
    loadForm(state){
      return state.account;
    },
    passPhrase(state){
      return state.passPhrase;
    },
    slidesEnabled(state){
      return state.slidesEnabled;
    },
    user(state){
      return state.user;
    }
  },
  modules: {
  }
});

