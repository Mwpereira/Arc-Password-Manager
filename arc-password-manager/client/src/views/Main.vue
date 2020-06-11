<template>
    <div class="main">
      <Header />
      <router-view />
    </div>
</template>

<script>
import Header from '@/components/Header';

export default {
    name: "Main",
    props: ['mode'],
    components: { Header },
    data: () => {
    return {
      mode: 'light',
    };
  },
  methods: {
 
  }
};
</script>

<style scoped>
div{
  height: calc(100vh-4rem);
}

.main{
  height: 100vh;
}
</style>