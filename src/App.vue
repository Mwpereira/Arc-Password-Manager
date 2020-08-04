<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script>
export default {
	name: 'app',
};

</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");

* {
  margin: 0;
  padding: 0;
  cursor: default;
}

html,
body {
  height: 100vh;
}

img > .logo{
	background-image: url("./assets/logo.png");
}

h1 {
	font-family: 'Varela Round', sans-serif;
	font-size: 90px;
	color: #15202B;
}

.app {
  height: 100%;
  background-color: white;
  color: #15202B;
  transition: background 0.3s ease-in-out;
}

#actions {
	text-align: center;
}
</style>