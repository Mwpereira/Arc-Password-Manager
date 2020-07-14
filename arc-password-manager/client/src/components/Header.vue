<template>
	<div class="menu">
		<span>
			<img class="logo" src="../assets/logo.png" />
			<h1>Arc</h1>
		</span>
        <h2>Home</h2>
		<span @submit.prevent="pageSwitch">
			<img class="pageBtns" src="../assets/home.png"  v-on:click="pageSwitch('Home')">
			<img class="pageBtns" src="../assets/i.png" v-on:click="pageSwitch('Information')" />
			<img class="pageBtns" id="settings" src="../assets/settings.png" v-on:click="pageSwitch('Settings')" />	
		</span>
	</div>
</template>

<script>
export default {
	name: 'Header',
	components: {  },
	data: () => {
        return {
            saltLevel: "",
            adEnabled: "",
        };
    },
    methods: {
        pageSwitch(p){
			var title = document.getElementsByTagName("h2")[0];
			if (p != title.innerText){
				title.innerText = p;
				this.$router.push(`${p}`);
			}	
		},
	},
	mounted(){},
	}
</script>

<style scoped>
div {
	position: relative;
	width: 100%;
	z-index: 99;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	border-bottom: 3px solid;
    border-image-slice: 1;
    border-width: 5px;
    border-image-source: linear-gradient(to left, #ff9d00, #3ab1d5);
	height: 8.5vh;
}

span {
	display: flex;
}

h1 {
	color: black;
	font-size: 42px;
	margin-top: 0.5rem;
	cursor: default;
}

h2{
    font-family: 'Varela Round', sans-serif;
	font-size: 30px;
	cursor: default;
    margin-top: 0.5rem;
	margin-left: 1rem;
}

.menu{
	background-color: white;
}

.logo {
	width: 3rem;
	height: 3rem;
	padding: 0.5rem;
}

.pageBtns {
	width: 2rem;
	height: 2rem;
	padding: 0.5rem;
	cursor: pointer;
	margin-top: 0.2rem;
}

.pageBtns:hover{
	transform: scale(1.1,1.1);
}

#settings{
	margin-right: 0.5rem;
}
</style>
