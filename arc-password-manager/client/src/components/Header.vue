<template>
	<menu>
	<div class="menu" :class="mode">
		<span>
			<img class="logo" src="../assets/logo.png" />
			<h1>Arc</h1>
		</span>
        <h2></h2>
		<span @submit.prevent="pageSwitch">
			<img class="home" src="../assets/home.png"  v-on:click="pageSwitch('Home')">
			<img class="information" src="../assets/i.png" v-on:click="pageSwitch('Information')" />
			<img class="settings" src="../assets/settings.png" v-on:click="pageSwitch('Settings')" />	
		</span>
	</div>
	</menu>
</template>

<script>
export default {
	name: 'Header',
	props: ["mode"],
	components: {  },
	data: () => {
        return {
            mode: "",
            saltLevel: "",
            adEnabled: "",
        };
    },
    methods: {
        pageSwitch(p){
			var title = document.getElementsByTagName("h2");
			title[0].innerText = p;
			this.$router.push(`${p}`);
		},
		toggle () {
    if (this.mode === "dark") {
		this.mode = "light";
    } else {
		this.mode = "dark";
		}
		}
	},
	mounted(){
		this.pageSwitch('Home');
	}
};
</script>

<style scoped>
menu {
  background: white;
  color: #15202B;;
  transition: background 0.3s ease-in-out;
}
.dark menu {
  background: #15202B;
  color: white;
}

div {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	overflow: hidden;
	border-bottom: 3px solid;
    border-image-slice: 1;
    border-width: 5px;
    border-image-source: linear-gradient(to left, #ff9d00, #3ab1d5);
	height: 9%;
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

.logo {
	width: 3rem;
	height: 3rem;
	padding: 0.5rem;
}

.home {
	width: 2rem;
	height: 2rem;
	padding: 0.5rem;
	cursor: pointer;
	margin-top: 0.4rem;
}

.information {
	width: 2rem;
	height: 2rem;
	padding: 0.5rem;
	cursor: pointer;
	margin-top: 0.4rem;
}

.settings {
	width: 2rem;
	height: 2rem;
	padding: 0.5rem;
	cursor: pointer;
	margin-top: 0.4rem;
	margin-right: 0.5rem;
}
</style>
