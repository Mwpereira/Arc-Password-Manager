<template>
  <div class="home">
    <Accounts />
    <!--input class="main-btn" type="submit" value="+Add Account"-->
    <AddForm />
  </div>
</template>

<script>
import Accounts from '@/components/Accounts';
import AddForm  from '@/components/AddForm';

export default {
  name: "Home",
  components: { Accounts, AddForm },
  data: () => {
    return {};
  },
  methods: {
  },
  mounted() {
  }
};
</script>

<style scoped>
div {
  height: 90%;
}
</style>