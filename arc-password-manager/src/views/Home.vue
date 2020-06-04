<template>
  <div class="home">
    <Accounts />
    <!--input class="main-btn" type="submit" value="+Add Account" v-on:click="addAccount" /-->
  </div>
</template>

<script>
import Accounts from '@/components/Accounts';

export default {
  name: "Home",
  components: { Accounts },
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