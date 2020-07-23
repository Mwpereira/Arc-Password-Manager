<template>
	<form class="editForm" @submit.prevent="saveAccount" onsubmit="return false">
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
			<img class="dAC" src="../assets/trashbin.png" @click="deleteAccount" />
		</span>
	</form>
</template>

<script>
import CryptoJS from 'crypto-js';
import store from '@/store';

export default {
	name: 'EditForm',
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
		encrypt(text, passPhrase, encryptionType) {
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
		decrypt(text, passPhrase, encryptionType) {
			if (encryptionType == 'AES') {
				return CryptoJS.AES.decrypt(text, passPhrase).toString(CryptoJS.enc.Utf8);
			}
			if (encryptionType == 'DES') {
				return CryptoJS.DES.decrypt(text, passPhrase).toString(CryptoJS.enc.Utf8);
			}
			if (encryptionType == 'Rabbit') {
				return CryptoJS.Rabbit.decrypt(text, passPhrase).toString(CryptoJS.enc.Utf8);
			}
		},
		deleteAccount() {
			let accountsList = store.getters.accounts;
			let loadAccount = store.getters.loadForm;
			let passPhraseCode = store.getters.passPhrase;
			let encryptionType = store.getters.encryptionType;

			let i = 0;

			for (i = 0; i < accountsList.length; i++) {
				if (this.decrypt(accountsList[i].webApp, passPhraseCode, encryptionType) == loadAccount) {
					break;
				}
			}

			store.commit('deleteAccount', i);
			store.commit('deleteAccountName', i);
			store.commit('updateUserData');

			this.exit();
		},
		loadAccount() {
			try {
				let accountsList = store.getters.accounts;
				let loadAccount = store.getters.loadForm;
				let passPhraseCode = store.getters.passPhrase;
				let encryptionType = store.getters.encryptionType;
				let account;

				let i = 0;

				for (i = 0; i < accountsList.length; i++) {
					if (this.decrypt(accountsList[i].webApp, passPhraseCode, encryptionType) == loadAccount) {
						account = accountsList[i];
						break;
					}
				}

				this.webApp = this.decrypt(account.webApp, passPhraseCode, encryptionType);

				this.email = this.decrypt(account.email, passPhraseCode, encryptionType);
				if (this.email == '') {
					this.email = 'Empty';
				}
				this.username = this.decrypt(account.username, passPhraseCode, encryptionType);
				if (this.username == '') {
					this.username = 'Empty';
				}
				this.password = this.decrypt(account.password, passPhraseCode, encryptionType);
				if (this.password == '') {
					this.password = 'Empty';
				}

				let tempSCA;

				tempSCA = this.decrypt(account.securityAnswer1, passPhraseCode, encryptionType);
				if (tempSCA != '') {
					this.securityAnswer1 = tempSCA;
				} else {
					this.securityAnswer1 = 'Empty';
				}

				tempSCA = this.decrypt(account.securityAnswer2, passPhraseCode, encryptionType);
				if (tempSCA != '') {
					this.securityAnswer2 = tempSCA;
				} else {
					this.securityAnswer2 = 'Empty';
				}

				tempSCA = this.decrypt(account.securityAnswer3, passPhraseCode, encryptionType);
				if (tempSCA != '') {
					this.securityAnswer3 = tempSCA;
				} else {
					this.securityAnswer3 = 'Empty';
				}
			} catch (error) {
				console.log(error);
			}
		},
		saveAccount() {
			try {
				let details = document.getElementsByTagName('input');
				let passPhraseCode = store.getters.passPhrase;
				let encryptionType = store.getters.encryptionType;

				if (details[2].value.length >= 2) {
					const webApp = this.encrypt(details[2].value, passPhraseCode, encryptionType);
					const email = this.encrypt(details[3].value, passPhraseCode, encryptionType);
					const username = this.encrypt(details[4].value, passPhraseCode, encryptionType);
					const password = this.encrypt(details[5].value, passPhraseCode, encryptionType);
					const securityAnswer1 = this.encrypt(details[6].value, passPhraseCode, encryptionType);
					const securityAnswer2 = this.encrypt(details[7].value, passPhraseCode, encryptionType);
					const securityAnswer3 = this.encrypt(details[8].value, passPhraseCode, encryptionType);

					let account = {
						webApp: webApp,
						email: email,
						username: username,
						password: password,
						securityAnswer1: securityAnswer1,
						securityAnswer2: securityAnswer2,
						securityAnswer3: securityAnswer3,
					};

					let accountsList = store.getters.accounts;

					let i = 0;

					for (i = 0; i < accountsList.length; i++) {
						if (this.decrypt(accountsList[i].webApp, passPhraseCode, encryptionType) == store.getters.loadForm) {
							break;
						}
					}

					let tuple = {
						accountName: details[2].value,
						accountUpdated: account,
						index: i,
					};

					store.commit('updateAccount', tuple);
					store.commit('updateUserData');
					this.exit();
				}
			} catch (e) {
				console.log(e);
			}
		},
	},
	mounted() {
		this.loadAccount();
	},
};
</script>

<style scoped>
span {
	display: flex;
	flex-direction: row;
	margin-bottom: 0.5rem;
	align-items: center;
	justify-content: center;
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

.editForm {
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
	height: auto;
	width: auto;
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

.dAC {
	margin-top: -0.1rem;
	margin-left: 0.5rem;
	padding-right: 1rem;
	width: 2.5rem;
	height: 2.5rem;
	cursor: pointer;
}
</style>
