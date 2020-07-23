<template>
	<div class="loadForm">
		<form>
			<span>
				<label>Website/App:</label>
				<label class="value">Empty</label>
			</span>
			<span>
				<label>Email:</label>
				<label class="value">Empty</label>
			</span>
			<span>
				<label>Username:</label>
				<label class="value">Empty</label>
			</span>
			<span>
				<label>Password:</label>
				<label class="value">Empty</label>
			</span>
			<span class="inputSC">
				<label>Security Answer 1:</label>
				<label class="value">Empty</label>
			</span>
			<span class="inputSC">
				<label>Security Answer 2:</label>
				<label class="value">Empty</label>
			</span>
			<span class="inputSC">
				<label>Security Answer 3:</label>
				<label class="value">Empty</label>
			</span>
			<span>
				<input class="action-btn" type="button" value="Edit" @click="editAccount" />
				<input class="action-btn" type="button" value="Exit" id="btnExit" @click="exit" />
			</span>
		</form>
	</div>
</template>

<script>
import CryptoJS from 'crypto-js';
import store from '@/store';

export default {
	name: 'LoadForm',
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
		editAccount() {
			this.$emit('editForm');
			store.commit('editForm');
		},
		exit() {
			this.$emit('clearComponent');
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
		loadAccount() {
			try {
				let details = document.getElementsByTagName('label');
				let accountsList = store.getters.accounts;
				let loadAccount = store.getters.loadForm;
				let encryptionType = store.getters.encryptionType;
				let passPhraseCode = store.getters.passPhrase;
				let account;

				let i = 0;

				for (i = 0; i < accountsList.length; i++) {
					if (this.decrypt(accountsList[i].webApp, passPhraseCode, encryptionType) == loadAccount) {
						account = accountsList[i];
						break;
					}
				}

				details[1].innerHTML = this.decrypt(account.webApp, passPhraseCode, encryptionType);

				details[3].innerHTML = this.decrypt(account.email, passPhraseCode, encryptionType);
				if (details[3].innerHTML == '') {
					details[3].innerHTML = 'Empty';
				}
				details[5].innerHTML = this.decrypt(account.username, passPhraseCode, encryptionType);
				if (details[5].innerHTML == '') {
					details[5].innerHTML = 'Empty';
				}
				details[7].innerHTML = this.decrypt(account.password, passPhraseCode, encryptionType);
				if (details[7].innerHTML == '') {
					details[7].innerHTML = 'Empty';
				}

				let tempSCA;

				tempSCA = this.decrypt(account.securityAnswer1, passPhraseCode, encryptionType);
				if (tempSCA != '') {
					details[9].innerHTML = tempSCA;
				}

				tempSCA = this.decrypt(account.securityAnswer2, passPhraseCode, encryptionType);
				if (tempSCA != '') {
					details[11].innerHTML = tempSCA;
				}

				tempSCA = this.decrypt(account.securityAnswer3, passPhraseCode, encryptionType);
				if (tempSCA != '') {
					details[13].innerHTML = tempSCA;
				}
			} catch (error) {
				console.log(error);
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
	margin-top: 1rem;
	margin-bottom: 1rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
}

h1 {
	color: black;
}

label {
	font-size: 22px;
	cursor: default;
	margin-left: 1rem;
}

input {
	background-color: white;
	color: black;
	width: 10rem;
	font-size: 22px;
}

.loadForm {
	display: flex;
	flex-direction: column;
	align-items: center;
	height: auto;
	width: auto;
	margin-top: 1rem;
	background-color: rgb(229, 229, 229);
	justify-content: center;
	border: none;
	border-radius: 10px;
}

.action-btn {
	color: black;
	justify-content: center;
	border: none;
	border-radius: 100px;
	width: 175px;
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

.value {
	font-style: italic;
	margin-left: 1rem;
}
</style>
