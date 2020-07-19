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
    addAccount(state, payload){
      state.accounts.push(payload);
      state.accounts.sort();
    },
    clearForm(state){
      state.accounts = "";
    },
    deleteAccount(state, payload){
      state.accounts.splice(payload,1);
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
      let accounts = this.accounts;
      if(accounts != null) {state.accounts = accounts}
    },
    setAccounts(state, payload){
      state.accounts = payload;
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
    },
    updateUserData(state){
      let localAccounts = state.accounts;
      sessionStorage.setItem("$accounts."+state.user, JSON.stringify(state.accounts));
      let newPassPhrase = state.passPhrase.substring(0, 32);
      let password = state.passPhrase.substring(32, state.passPhrase.length);
      let localPassPhrase = CryptoJS.AES.encrypt(newPassPhrase, password).toString();
      let localEncryptionType = CryptoJS.AES.encrypt(state.encryptionType, password).toString();
      let localSlidesEnabled = CryptoJS.AES.encrypt(state.slidesEnabled, password).toString();

      let arcData = {
        accounts: localAccounts,
        passPhrase: localPassPhrase,
        encryptionType: localEncryptionType,
        slidesEnabled: localSlidesEnabled
      }
      
      localStorage.setItem("$data."+state.user, CryptoJS.AES.encrypt(JSON.stringify(arcData), password).toString());

      Accounts.methods.updateAccounts();
    }
  },
  actions: {
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
    setAccounts(state, payload){
      state.commit("setAccounts", payload);
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

