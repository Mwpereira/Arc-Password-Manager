<template>
	<form class="addForm" @submit.prevent="saveAccount" onsubmit="return false">
		<div class="inputInfo">
			<span>
				<label>Website/App:</label>
				<input autofocus class="input-bar" type="text" v-model="webApp" minlength="2" required />
			</span>
			<span>
				<label>Email:</label>
				<input class="input-bar" type="text" v-model="email" />
			</span>
			<span>
				<label>Username:</label>
				<input class="input-bar" type="text" v-model="username" />
			</span>
			<span>
				<label>Password:</label>
				<input class="input-bar" type="text" v-model="password" />
			</span>
		</div>
		<span class="inputSC">
			<label>Security Answer 1:</label>
			<input class="input-bar" type="text" v-model="securityAnswer1" />
		</span>
		<span class="inputSC">
			<label>Security Answer 2:</label>
			<input class="input-bar" type="text" v-model="securityAnswer2" />
		</span>
		<span class="inputSC">
			<label>Security Answer 3:</label>
			<input class="input-bar" type="text" v-model="securityAnswer3" />
		</span>
		<span>
			<input class="action-btn" type="submit" value="Save" @click="saveAccount" />
			<input class="action-btn" type="button" value="Cancel" @click="exit" />
		</span>
	</form>
</template>

<script>
import CryptoJS from 'crypto-js';
import store from '@/store';

export default {
	name: 'AddForm',
	props: ['component'],
	data: () => {
		return {
			webApp: '',
			email: '',
			username: '',
			password: '',
			securityAnswer1: '',
			securityAnswer2: '',
			securityAnswer3: '',
		};
	},
	methods: {
		exit() {
			this.$emit('clearComponent');
		},
		encryptString(text, passPhrase, encryptionType) {
			if (encryptionType == 'AES') {
				return CryptoJS.AES.encrypt(text, passPhrase).toString();
			}
			if (encryptionType == 'DES') {
				return CryptoJS.DES.encrypt(text, passPhrase).toString();
			}
			if (encryptionType == 'Rabbit') {
				return CryptoJS.Rabbit.encrypt(text, passPhrase).toString();
			}
		},
		saveAccount() {
			try {
				let details = document.getElementsByTagName('input');
				let encryptionType = store.getters.encryptionType;
				let passPhrase = store.getters.passPhrase;

				if (details[2].value.length >= 2) {
					const webApp = this.encryptString(details[2].value, passPhrase, encryptionType);
					const email = this.encryptString(details[3].value, passPhrase, encryptionType);
					const username = this.encryptString(details[4].value, passPhrase, encryptionType);
					const password = this.encryptString(details[5].value, passPhrase, encryptionType);
					const securityAnswer1 = this.encryptString(details[6].value, passPhrase, encryptionType);
					const securityAnswer2 = this.encryptString(details[7].value, passPhrase, encryptionType);
					const securityAnswer3 = this.encryptString(details[8].value, passPhrase, encryptionType);

					let account = {
						webApp: webApp,
						email: email,
						username: username,
						password: password,
						securityAnswer1: securityAnswer1,
						securityAnswer2: securityAnswer2,
						securityAnswer3: securityAnswer3,
					};

					store.commit('addAccount', account);
					store.commit('addAccountName', details[2].value);
					store.commit('updateUserData');

					this.exit();
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
	mounted() {},
};
</script>

<style scoped>
span {
	display: flex;
	flex-direction: row;
	margin-bottom: 0.5rem;
	align-items: center;
}

h1 {
	color: black;
}

label {
	font-size: 22px;
	cursor: default;
}

input {
	background-color: white;
	color: black;
	width: 10rem;
	font-size: 22px;
}

form {
	margin-left: 0.75rem;
}

.addForm {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: auto;
	width: 500px;
	margin-top: 1rem;
	background-color: rgb(229, 229, 229);
	border: none;
	border-radius: 10px;
}

.action-btn {
	color: black;
	justify-content: center;
	border: none;
	border-radius: 100px;
	width: 200px;
	height: 40px;
	outline: none;
	font-size: large;
	font-weight: 550;
	margin: 10px;
	cursor: pointer;
	background-color: white;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.inputInfo {
	margin: 0rem;
}

.inputSC {
	margin: 0rem;
}

.input-bar {
	outline: none;
	border: none;
	background-color: rgba(255, 255, 255, 0);
	margin: 10px;
	font-size: 20px;
	font-family: 'Bitter';
	color: black;
	padding: 5px 5px;
	cursor: text;
	width: 10rem;
	background-color: white;
}

.input-bar:hover,
:focus {
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	border-bottom: none;
}
</style>
