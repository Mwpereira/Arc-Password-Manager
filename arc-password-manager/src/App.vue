<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Varela+Round&display=swap");

* {
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100vh;
}

#app {
  height: 100%;
}

img > .logo{
	background-image: url("./assets/logo.png");
}

h1 {
	font-family: 'Varela Round', sans-serif;
	font-size: 72px;
	color: white;
	cursor: default;
}

.input-bar {
	outline: none;
	border: none;
	border-bottom: 2px solid black;
	background-color: rgba(255, 255, 255, 0);
	margin: 10px;
	font-size: 24px;
	font-family: 'Bitter';
	color: white;
	padding: 5px 5px;
}

.action-btn {
	background-color: whitesmoke;
	color: black;
	justify-content: center;
	border: none;
	border-radius: 10px;
	width: 175px;
	height: 50px;
	outline: none;
	font-size: large;
	margin: 10px;
	cursor: pointer;
}

#actions {
	text-align: center;
}

#loginArc-btn,
#signupArc-btn {
	background-color: transparent;
	color: white;
	font-size: 16px;
	text-decoration: underline;
	width: 20rem;
	height: 2rem;
	text-align: center;
}

.validation-form {
	width: 22.5rem;
	border-radius: 15px;
	background-color: rgba(28, 28, 33, 0.92);
	padding: 0.25rem 0.25rem;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

</style>