<template>
	<div class="home">
		<Accounts @clearComponent="clearComponent" @loadForm="loadForm" />
		<span class="components">
			<span class="buttons">
				<input @click="setComponent('AddForm')" id="addAccount" class="main-btn" type="button" value="+ Add Account" />
				<input @click="setComponent('AutoGenPass')" id="autoGenPass" class="main-btn" type="button" value="+ Auto Generate Password" />
			</span>
			<component id="form" @addAccount="addAccount" @editForm="editForm" @clearComponent="clearComponent" :is="component"></component>
		</span>
		<span class="userClass">
			<h1 id="header">Computer Details</h1>
			<span class="userData">
				<h2>Arc Username:</h2>
				<h2>{{ showUser }}</h2>
			</span>
			<span class="userData">
				<h2>Public IPv4:</h2>
				<h2>{{ showIP }}</h2>
			</span>
			<span class="userData">
				<h2>Location:</h2>
				<h2>{{ showLocation }}</h2>
			</span>
			<span>
				<br />
				<br />
				<br />
				<h2>Recommended VPNs Include</h2>
				<h2 class="vpnLink" @click="loadVPNWebsite('expressVPN')">ExpressVPN</h2>
				<h2 class="vpnLink" @click="loadVPNWebsite('nordVPN')">NordVPN</h2>
				<h2 class="vpnLink" @click="loadVPNWebsite('cyberGhost')">CyberGhost</h2>
				<h2 class="vpnLink" @click="loadVPNWebsite('protonVPN')">ProtonVPN</h2>
				<h2 class="vpnLink" @click="loadVPNWebsite('vyprVPN')">VyprVPN</h2>
				<br />
				<h3>Protect Yourself. Get a VPN.</h3>
			</span>
		</span>
	</div>
</template>

<script>
import Accounts from '@/components/Accounts';
import AddForm from '@/components/AddForm';
import AutoGenPass from '@/components/AutoGeneratePassword';
import axios from 'axios';
import EditForm from '@/components/EditForm';
import LoadForm from '@/components/LoadForm';
import store from '@/store';

export default {
	name: 'Home',
	components: { Accounts, AddForm, AutoGenPass, EditForm, LoadForm },
	data: () => {
		return {};
	},
	computed: {
		component() {
			return this.$store.getters.component;
		},
		showIP() {
			return this.$store.getters.publicIP;
		},
		showLocation() {
			return this.$store.getters.location;
		},
		showUser() {
			return this.$store.getters.user;
		},
	},
	methods: {
		addAccount(accountName) {
			Accounts.methods.addAccount(accountName);
		},
		clearComponent() {
			store.commit('setComponent', '');
		},
		editForm() {
			store.commit('setComponent', 'EditForm');
		},
		loadForm() {
			store.commit('setComponent', 'LoadForm');
		},
		loadUserDetails() {
			try {
				axios
					.get('http://api.ipify.org/')
					.then((response) => {
						store.commit('setPublicIP', response.data);

						var access_key = '9c8a0ad01218d47df2c7ac36e8c38421';

						axios
							.get('http://api.ipstack.com/' + response.data + '?access_key=' + access_key)
							.then((response) => {
								store.commit('setLocation', `${response.data.city}, ${response.data.country_name}`);
							})
							.catch(function(error) {
								console.log(error);
							});
					})
					.catch(function(error) {
						console.log(error);
					});
			} catch (error) {
				console.log(error);
			}
		},
		loadVPNWebsite(vpn) {
			if (vpn == 'expressVPN') {
				window.open('https://www.expressvpn.com/');
			}
			if (vpn == 'nordVPN') {
				window.open('https://nordvpn.com/');
			}
			if (vpn == 'cyberGhost') {
				window.open('https://www.cyberghostvpn.com/');
			}
			if (vpn == 'protonVPN') {
				window.open('https://protonvpn.com/');
			}
			if (vpn == 'vyprVPN') {
				window.open('https://www.vyprvpn.com/');
			}
		},
		setComponent(component) {
			store.commit('setComponent', component);
		},
	},
	beforeMount() {
		if (sessionStorage.getItem('arcHome') == 'false') {
			let username = sessionStorage.getItem('user');
			let arcData = JSON.parse(sessionStorage.getItem('$data.' + username));

			this.loadUserDetails();

			store.commit('setPassPhrase', arcData.passPhrase);
			store.commit('setEncryptionType', arcData.encryptionType);
			store.commit('setSlidesEnabled', arcData.slidesEnabled);

			sessionStorage.setItem('arcHome', 'true');
		}
	},
	mounted() {},
};
</script>

<style scoped>
div {
	display: flex;
	flex-direction: row;
	height: 100%;
	width: 100%;
}

span {
	justify-content: flex-start;
}

h1 {
	font-size: 26px;
}

h2 {
	font-family: 'Varela Round', sans-serif;
	font-size: 20px;
	color: black;
	text-align: center;
	margin-top: 1rem;
	margin-left: 1rem;
}

h3 {
	text-align: center;
	margin-top: 2rem;
	font-style: italic;
}

.home {
	background-color: whitesmoke;
	width: auto;
}

.components {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.userClass {
	width: 75vh;
	background: rgba(119, 119, 119, 0.05);
}

.userData {
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.buttons {
	align-items: left;
	margin-left: -1rem;
}

.main-btn {
	color: black;
	justify-content: center;
	border: none;
	border-radius: 100px;
	width: 250px;
	height: 50px;
	outline: none;
	font-size: large;
	font-weight: 550;
	margin: 10px;
	cursor: pointer;
	background-color: white;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.input-bar {
	outline: none;
	border: none;
	border-bottom: 2px solid black;
	background-color: rgba(255, 255, 255, 0);
	margin: 10px;
	font-size: 22px;
	font-family: 'Bitter';
	color: black;
	padding: 5px 5px;
	cursor: text;
	width: 20rem;
}

.input-bar:hover,
:focus {
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	border-bottom: none;
}

h2.vpnLink:hover {
	color: #2693ff;
}

#addAccount {
	cursor: pointer;
	margin-top: 1.5rem;
	margin-left: 1.5rem;
}

#autoGenPass {
	cursor: pointer;
	margin-top: 1.5rem;
	margin-left: 1rem;
}

#header {
	margin-top: 1rem;
	margin-bottom: 1rem;
	text-align: center;
}

@media only screen and (max-width: 1500px) {
	.userClass {
		display: none;
	}
}

@media only screen and (min-height: 900px) {
	#form {
		margin-top: 5rem;
	}
}
</style>
