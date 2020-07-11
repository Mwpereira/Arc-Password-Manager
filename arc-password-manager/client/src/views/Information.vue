<template>
	<div class="information">
		<img id="logo" src="../assets/logo.png" />
		<h1>Arc</h1>
		<p>Created By: Michael Pereira</p>
		<p>Version: 1.0.0</p>
		<span @submit.prevent="openLink">
		<button type="submit" style="border: 0; background: transparent; outline: none;" @click="openLink('https://www.linkedin.com/in/michael-pereira-0237a0193/')" >
            <img class="btns" src="../assets/linkedin.png" alt="submit" />
        </button>
		<button type="submit" style="border: 0; background: transparent; outline: none;" @click="openLink('https://github.com/Mwpereira')">
            <img class="btns" src="../assets/github.png" alt="submit" />
        </button>	
	</span>
	</div>
</template>

<script>
export default {
	name: "Information",
    data: () => {
        return{
            url: '',
        }
	},
	methods: {
    openLink(url) {
        window.open(url);
    }
    }
};
</script>

<style scoped>
div {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin-top: 10vh;
}

h1 {
	font-size: 100px;
	color: black;
	margin-bottom: 2rem;
	text-align: center;
}

p {
	font-size: 20px;
	cursor: default;
}

img {
	margin-top: 4rem;
	width: 5rem;
	cursor: pointer;
}

.btns{
	padding-right: 0.5rem;
	padding-left: 0.5rem;
}

#logo {
	margin-top: 0rem;
	width: 10rem;
	cursor: default;
}
</style>
