<template>
	<div class="accounts">
		<ul class="listAccounts">
			<h1 id="lblAccounts">Accounts</h1>
			<li v-for="account in accounts" :key="account.accountName">
				<span class="listValue">
					<img id="logo" :src="loadLogo(account.accountName)" @error="imgUrlAlt" />
					<h2 @click="loadForm(account.accountName)">
						{{ account.accountName }}
					</h2>
				</span>
			</li>
			<a>Logos provided by Clearbit</a>
		</ul>
	</div>
</template>

<script>
import CryptoJS from 'crypto-js';
import store from '@/store';

export default {
	name: 'Accounts',
	data: () => {
		return {};
	},
	computed: {
		accounts() {
			return store.getters.accountNames;
		},
	},
	methods: {
		loadLogo(elem) {
			try {
				return 'http://logo.clearbit.com/' + elem + '.com';
			} catch (error) {
				console.log(error);
				return '../assets/error.png';
			}
		},
		imgUrlAlt(event) {
			event.target.src = `https://img.icons8.com/flat_round/64/000000/question-mark.png`;
		},
		loadForm(elem) {
			store.commit('loadForm', elem);
			this.$emit('loadForm');
		},
		loadAccounts() {
			var accountsList = store.getters.accounts;
			var passPhraseCode = store.getters.passPhrase;
			var encryptionType = store.getters.encryptionType;

			if (encryptionType == 'AES') {
				accountsList.forEach((element) => {
					this.accounts.push({
						accountName: CryptoJS.AES.decrypt(element.webApp, passPhraseCode).toString(CryptoJS.enc.Utf8),
					});
				});
			}

			if (encryptionType == 'DES') {
				accountsList.forEach((element) => {
					this.accounts.push({
						accountName: CryptoJS.DES.decrypt(element.webApp, passPhraseCode).toString(CryptoJS.enc.Utf8),
					});
				});
			}

			if (encryptionType == 'TripleDES') {
				accountsList.forEach((element) => {
					this.accounts.push({
						accountName: CryptoJS.TripleDes.decrypt(element.webApp, passPhraseCode).toString(CryptoJS.enc.Utf8),
					});
				});
			}

			if (encryptionType == 'Rabbit') {
				accountsList.forEach((element) => {
					this.accounts.push({
						accountName: CryptoJS.Rabbit.decrypt(element.webApp, passPhraseCode).toString(CryptoJS.enc.Utf8),
					});
				});
			}

			store.commit('setAccountNames', this.accounts);
			this.loadLogo();
		},
	},
	beforeMount() {
		if (sessionStorage.getItem('arcAccounts') == 'false') {
			let username = sessionStorage.getItem('user');
			let arcData = JSON.parse(sessionStorage.getItem('$data.' + username));

			store.commit('setUser', username);
			store.commit('setAccounts', arcData.accounts);
			this.loadAccounts();

			sessionStorage.setItem('arcAccounts', 'true');
		}
	},
};
</script>

<style scoped>
h1 {
	margin-bottom: 20px;
}

h2 {
	font-family: 'Varela Round', sans-serif;
	color: black;
	text-align: center;
}

h2:hover {
	color: #2693ff;
}

li {
	margin-bottom: 15px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

button {
	widows: 100%;
	z-index: 99;
}

a {
	font-style: italic;
	text-align: center;
	margin: 5px;
}

.accounts {
	width: 40vh;
}

.listAccounts {
	display: flexbox;
	display: flex;
	flex-direction: column;
	padding-left: 0;
	margin-bottom: 0;
	height: 90vh;
	width: 40vh;
	background-color: white;
	color: black;
	overflow: auto;
	overflow-x: hidden;
}

.listValue {
	width: auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

#logo {
	width: 30px;
	height: 30px;
	margin-right: 15px;
	border: none;
	border-radius: 100px;
}

#lblAccounts {
	font-size: 32px;
	color: black;
	text-align: center;
	margin-top: 1rem;
}
</style>
