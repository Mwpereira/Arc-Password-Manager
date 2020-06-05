<template>
    <v-app class="menu" :class="mode">
    <Header :mode="mode" @toggle="('toggle')"  />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
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
    toggle () {
      if (this.mode === "dark") {
		this.mode = "light";
      } else {
		this.mode = "dark";
      }
  } 
  }
};
</script>

<style scoped>

:root {
	--font-color-primary: black;
	--font-color-secondary: white;

	--theme-primary: white;
	--theme-secondary: rgb(35, 36, 43);
}

.menu{
  color: #15202B;
  transition: background 0.3s ease-in-out;
}

.dark {
  background: #192734;
  color: #E8E8E8;
  background-color: red;
}

</style>