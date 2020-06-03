<template>
	<div class="login">
		<h1>Arc</h1>
		<form @submit.prevent="authorizeAccount" class="validation-form">
			<input autofocus class="input-bar" type="text" placeholder="Username" v-model="username"/>
			<input class="input-bar" type="password" placeholder="Password" v-model="password" />
			<input class="action-btn" type="submit" value="Login" />
			<input class="action-btn" id="loginArc-btn" value="Need to create an account? Sign up" onclick="javascript:location.href='/signup'" />
			<p id="login-error-message">Username or Password Is Incorrect</p>
		</form>
	</div>
</template>

<script>
import bcrypt from 'bcryptjs';

export default {
	name: 'Login',
	data: () => {
		return {
			username: '',
			password: '',
            errorMessage: ''
		};
	},
	methods: {
	async authorizeAccount() {
    let form = document.getElementsByTagName('form')[0];

	let username = form.children[0].value;
	let password = form.children[1].value;

	if (username == '') {
	//	$('input:first-child').attr('placeholder', 'Cannot Be Empty');
	}
	if (password == '') {
	//	$('input:nth-child(2)').attr('placeholder', 'Cannot Be Empty');
	}

	if (username != '' && password != '') {
		try {
			if (localStorage.getItem(username) != null) {
				if (await bcrypt.compare(password, localStorage.getItem(username))) {
					if (localStorage.getItem('adEnabled') == "false"){
						window.location.href  ='/main/home';	
					}
					else{
						window.location.href = '/newUser'; //USE IF STATEMENT HERE
					}
					
				} else {
				//	$('#login-error-message').css('display', 'block');
				}
			} else {
			//	$('#login-error-message').css('display', 'block');
			}
		} catch {
		//	$('#login-error-message').css('display', 'block');
		}
	}
    }
    }
}
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