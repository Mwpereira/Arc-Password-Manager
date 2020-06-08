<template>
  <div class="home">
    <Accounts />
    <span class="form">
      <input @click="component = 'AddForm'" id="addAccount" class="main-btn" type="submit" value="+ Add Account" />   
      <component @eventname="clearComponent" :is="component"></component>
    </span>
  </div>
</template>

<script>
import Accounts from '@/components/Accounts';
import AddForm  from '@/components/AddForm';

export default {
  name: "Home",
  components: { Accounts, AddForm },
  data: () => {
    return {
      component: ''
    };
  },
  methods: {
    clearComponent(){
      this.component = "";
    }
  },
  mounted() {
  }
};
</script>

<style scoped>
div {
  height: 90%;
  display: flex;
  flex-direction: row;
	text-align: center;
}

.form{
  display: flex;
  flex-direction: column;
	text-align: center;
}

#addAccount{
  float: left;
  cursor: pointer;
  margin: 2rem;
  position: absolute;
}
</style>