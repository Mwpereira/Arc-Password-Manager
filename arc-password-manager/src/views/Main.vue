<template>
    <v-app class="menu">
    <Menu />
    <v-content class="primary">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Menu from '@/components/Menu';

export default {
    name: "Main",
    components: { Menu },
    data: () => {
    return {
      links: [{ icon: "mdi-home", text: "Home", route: "/main/home" },
            { icon: "mdi-home", text: "Information", route: "/main/information" },
            { icon: "mdi-home", text: "Settings", route: "/main/settings" } ]
    };
  }
};
</script>
