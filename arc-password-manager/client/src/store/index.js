import Accounts from "@/components/Accounts";
import Home from "@/views/Home";
import LoadForm from "@/components/LoadForm";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: "",
    account: "",
    accounts: [],
    passPhrase: "",
    encryptionType: "",
  },
  mutations: {
    accounts(state, payload){
      state.accounts = payload;
    },
    addAccount(state, payload){
      state.accounts.push(payload);
      localStorage.setItem("accounts", JSON.stringify(state.accounts));
      Accounts.methods.updateAccounts();
    },
    clearForm(state){
      state.accounts = "";
    },
    deleteAccount(state, payload){
      state.accounts.splice(payload,1);
      localStorage.setItem("accounts", JSON.stringify(state.accounts));
    },
    encryptionType(state, payload){
      state.encryptionType = payload;
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
      let accounts = JSON.parse(localStorage.getItem("accounts"));
      let passPhrase = localStorage.getItem("passPhrase");
      if(accounts != null) {state.accounts = accounts}
      if(passPhrase != null) {state.passPhrase = passPhrase}
    },
    passPhrase(state, payload){
      state.passPhrase = payload;
    },
    setUser(state, payload){
      state.user = payload;
    },
    updateAccount(state, payload){
      state.accounts.splice(payload.index, 1, payload.accountUpdated);
      localStorage.setItem("accounts", JSON.stringify(state.accounts));
      Accounts.methods.updateAccounts();
    },
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
      state.commit("loadAccount", payload);
    },
    loadAccounts(state){
      state.commit("loadAccounts");
    },
    passPhrase(state, payload){
      state.commit('passPhrase', payload);
    },
    setUser(state, payload){
      state.commit('setUser', payload);
    },
    updateAccount(state, payload){
      state.commit('updateAccount', payload);
    },
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
    user(state){
      return state.user;
    }
  },
  modules: {
  }
});

