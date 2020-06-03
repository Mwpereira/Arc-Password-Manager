<template>
  <div class="home">
    <input class="action-btn" type="submit" value="+Add Account" v-on:click="addAccount" />
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => {
    return {};
  },
  methods: {
    loadAccounts() {},
    addAccount() {},
    updateAcccount() {},
    removeAccount() {}
  },
  mounted() {
    this.loadAccounts();
  }
};
</script>

<style scoped>
div {
  height: 90%;
}
</style>