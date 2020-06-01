<template>
	<div class="signup">
		<h1>Arc</h1>
		<form @submit.prevent="createAccount" class="validation-form">
			<input autofocus class="input-bar" type="text" v-model="username" placeholder="Username" minlength="3" />
			<input class="input-bar" type="password" v-model="password" placeholder="Password" minlength="7" />
			<input class="input-bar" type="password" v-model="confirmPassword" placeholder="Confirm Password" />
			<input type="submit" class="action-btn" id="register" value="Register" />
			<input class="action-btn" id="signupArc-btn" value="Already created an account? Login" onclick="javascript:location.href='/login'" />
		</form>
		<p id="signup-error-message">An Account With This Username Already Exists</p>
		<p id="password-match-error">Passwords Do Not Match</p>
		<p id="field-empty">Fields Cannot Be Left Empty</p>
	</div>
</template>

<script>
import bcrypt from 'bcryptjs';

export default {
	name: 'Signup',
	data: () => {
		return {
			username: '',
			password: '',
			confirmPassword: '',
			emailMismatch: false,
			passwordMismatch: false,
			accountExists: false,
		};
	},
	methods: {
		async createAccount() {
			let form = document.getElementsByTagName('form')[0];

			try {
				let username = form.children[0].value;
				let password = form.children[1].value;
				let confirmpassword = form.children[2].value;

				if (username != '' && password != '' && confirmpassword != '') {
					if (password.localeCompare(confirmpassword) == 0 && localStorage.getItem(username) === null) {
						const salt = await bcrypt.genSaltSync();
						const hashedPassword = await bcrypt.hashSync(password, salt);

						localStorage.setItem(username, hashedPassword);

                        window.location.href = '/login';
                        
					} else if (password.localeCompare(confirmpassword) != 0) {
						//	$('#password-match-error').css('display', 'block');
						//	$('#signup-error-message').css('display', 'none');
						//	$('#field-empty').css('display', 'none');
					} else {
						//	$('#password-match-error').css('display', 'none');
						//	$('#field-empty').css('display', 'none');
						//	$('#signup-error-message').css('display', 'block');
					}
				} else {
					//	$('#field-empty').css('display', 'block');
					//	$('#password-match-error').css('display', 'none');
					//	$('#signup-error-message').css('display', 'none');
				}
			} catch {
				console.log('Account Creation Failed!');
			}
		},
	},
};
</script>

<style scoped>
div {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;

	background-image: url('../assets/background900.jpg');
	height: 100%;
}

p {
	display: none;
}

@media (min-width: 900px), (min-height: 700px) {
	div {
		background-image: url('../assets/background1920.jpg');
	}
}
</style>
