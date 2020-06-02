<template>
	<div class="information">
		<img id="logo" src="../assets/logo.png" />
		<h1>Arc</h1>
		<p>Created By: Michael Pereira</p>
		<p>Version: 1.0.0</p>
		<span @submit.prevent="openLink">
			<img type="submit" src="../assets/linkedin.png" v-on:click="openLink('https://www.linkedin.com/in/michael-pereira-0237a0193/')" />
			<img type="submit" src="../assets/github.png" v-on:click="openLink('https://github.com/Mwpereira')" />
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
}

h1 {
	font-size: 100px;
	color: black;
	margin-bottom: 2rem;
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

#logo {
	margin-top: 3rem;
	width: 10rem;
	cursor: default;
}
</style>
