<template>
	<div class="autoGenPassForm">
		<form @submit.prevent="generatePassword">
			<span id="spanPassword">
				<label>Suggested Password:</label>
				<input id="password" class="password" type="text" />
			</span>
			<span>
				<label style="margin-top: -0.2rem;">Length:</label>
				<div @submit.prevent="updateLength" class="slidecontainer">
					<input type="range" min="9" max="16" class="slider" id="passwordLength" v-model="passwordLength" v-on:input="updateLength" />
				</div>
				<p type="number" id="length" style="width: 1rem;">9</p>
			</span>
			<span>
				<label>Special Characters:</label>
				<input type="checkbox" id="cbSC" value="Enabled" v-model="ckSpecialChars" checked="true" />
				<label for="cbLength" id="lblLength">Enabled</label>
			</span>
			<span>
				<input class="action-btn" type="button" value="Refresh" @click="generatePassword" />
				<input class="action-btn" type="button" value="Cancel" @click="cancel" />
				<img class="cTCB" src="../assets/clipboard.png" @click="copyToClipBoard" />
			</span>
		</form>
	</div>
</template>

<script>
export default {
	name: 'AutoGenPass',
	props: ['component'],
	data: () => {
		return {
			passwordLength: '',
			ckSpecialChars: '',
		};
	},
	methods: {
		cancel() {
			this.$emit('clearComponent');
		},
		randomPassword(len, specialChars) {
			var length = len;
			var charset;
			if (specialChars == true) {
				charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*./'";
			} else {
				charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
			}
			var pass = '';
			for (var i = 0, n = charset.length; i < length; ++i) {
				pass += charset.charAt(Math.floor(Math.random() * n));
			}
			return pass;
		},
		generatePassword() {
			let length = this.passwordLength;
			let specialChars = this.ckSpecialChars;

			let p = this.randomPassword(length, specialChars);

			if (this.passwordLength >= 12) {
				document.getElementById('password').style.width = '13rem';
			} else {
				document.getElementById('password').style.width = '7rem';
			}

			var lblPassword = document.getElementsByTagName('input');
			lblPassword[2].value = p;
		},
		updateLength() {
			var slider = document.getElementById('passwordLength');
			var output = document.getElementById('length');

			slider.oninput = function() {
				output.innerHTML = this.value;
				this.passwordLength = output.innerHTML;
			};
		},
		copyToClipBoard() {
			var lblPassword = document.getElementsByTagName('input')[2];
			lblPassword.select();
			lblPassword.setSelectionRange(0, 99999);
			document.execCommand('Copy');
		},
	},
	mounted() {
		this.passwordLength = 9;
		this.ckSpecialChars = true;
		this.generatePassword();
	},
};
</script>

<style scoped>
span {
	padding: 2vh;
	display: flex;
	flex-direction: row;
	justify-content: center;
}

h1 {
	color: black;
}

label {
	font-size: 22px;
	cursor: default;
	margin-right: 0.5rem;
	margin-top: -0.5rem;
	width: auto;
}

p {
	font-size: 20px;
	cursor: default;
}

input {
	background-color: white;
	color: black;
}

form {
	margin-top: 1rem;
}

.autoGenPassForm {
	display: flex;
	flex-direction: row;
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

.password {
	width: 7rem;
	font-size: 18px;
	background-color: transparent;
	border: none;
	text-align: center;
	margin-top: -0.3rem;
	cursor: text;
}

.slidecontainer {
	width: 14vh;
	margin-top: 0rem;
	margin-right: 2rem;
	margin-left: 0rem;
}

.slider {
	-webkit-appearance: none;
	appearance: none;
	width: 14vh;
	height: 25px;
	background: #d3d3d3;
	outline: none;
	opacity: 0.7;
	-webkit-transition: 0.25s;
	transition: opacity 0.25s;
}

.slider:hover {
	opacity: 1;
}

.slider::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 25px;
	height: 25px;
	background: lightskyblue;
	cursor: pointer;
}

.slider::-moz-range-thumb {
	width: 25px;
	height: 25px;
	background: indigo;
	cursor: pointer;
}

.cTCB {
	margin-top: 0.75rem;
	margin-left: 0.5rem;
	width: 2.5rem;
	height: 2.5rem;
	cursor: pointer;
}

#spanPassword {
	align-content: flex-start;
}

#cbSC {
	margin-right: 0.5rem;
	cursor: pointer;
}
</style>
