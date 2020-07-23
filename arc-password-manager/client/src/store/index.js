import CryptoJS from "crypto-js";
import Home from "@/views/Home";
import LoadForm from "@/components/LoadForm";
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account: "",
    accountNames: [],
    accounts: [],
    component: "",
    encryptionType: "",
    location: "",
    passPhrase: "",
    publicIP: "",
    slidesEnabled: "",
    user: "",
  },
  mutations: {
    addAccount(state, payload){
      state.accounts.push(payload);
    },
    addAccountName(state, payload){
      state.accountNames.push({accountName: payload});
    },
    clearForm(state){
      state.accounts = "";
    },
    deleteAccount(state, payload){
      state.accounts.splice(payload,1);
    },
    deleteAccountName(state, payload){
      state.accountNames.splice(payload,1);
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
    setAccountNames(state, payload){
      state.accountName = payload;
    },
    setAccounts(state, payload){
      state.accounts = payload;
    },
    setComponent(state, payload){
      state.component = payload;
    },
    setEncryptionType(state, payload){
      state.encryptionType = payload;
    },
    setLocation(state, payload){
      state.location = payload;
    },
    setPassPhrase(state, payload){
      state.passPhrase = payload;
    },
    setPublicIP(state, payload){
      state.publicIP = payload;
    },
    setSlidesEnabled(state, payload){
      state.slidesEnabled = payload;
    },
    setUser(state, payload){
      state.user = payload;
    },
    updateAccount(state, payload){
      state.accounts.splice(payload.index, 1, payload.accountUpdated);
      state.accountNames.splice(payload.index, 1, { accountName: payload.accountName});
    },
    updateUserData(state){
      let localAccounts = state.accounts;
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
    }
  },
  actions: {
    addAccount(state, payload){
      state.commit('addAccount', payload);
    },
    addAccountName(state, payload){
      state.commit('addAccountName', payload);
    },
    clearForm(state){
      state.commit('clearForm');
    },
    deleteAccount(state, payload){
      state.commit('deleteAccount', payload);
    },
    deleteAccountName(state, payload){
      state.commit('deleteAccountName', payload);
    },
    editForm(state){
      state.commit('editForm');
    },
    loadAccounts(state){
      state.commit('loadAccounts');
    },
    setAccountNames(state, payload){
      state.commit("setAccountNames", payload);
    },
    setAccounts(state, payload){
      state.commit("setAccounts", payload);
    },
    setComponent(state, payload){
      state.commit('setComponent', payload);
    },
    setEncryptionType(state, payload){
      state.commit('setEncryptionTime', payload);
    },
    setLocation(state, payload){
      state.commit('setLocation', payload);
    },
    setPassPhrase(state, payload){
      state.commit('setPassPhrase', payload);
    },
    setPublicIP(state, payload){
      state.commit('setPublicIP', payload);
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
    accountNames(state){
      return state.accountNames;
    },
    accounts(state){
      return state.accounts;
    },
    addAccount(state){
      return state.accounts;
    },
    component(state){
      return state.component;
    },
    encryptionType(state){
      return state.encryptionType;
    },
    loadForm(state){
      return state.account;
    },
    location(state){
      return state.location;
    },
    passPhrase(state){
      return state.passPhrase;
    },
    publicIP(state){
      return state.publicIP;
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

