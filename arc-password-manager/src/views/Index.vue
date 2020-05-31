<template>
	<div class="home">
		<!--img alt="Arc logo" src="../assets/logo.png">
    <img alt="background" src="../assets/background900.jpg"-->
		<h1>Arc</h1>
		<h2>Keep Yourself Safe.<br />Secure, Advanced, and Customizable Software at Your Service.</h2>
		<span>
			<input class="action-btn" value="Login" type="submit" onclick="javascript:location.href='/login'" />
			<input class="action-btn" value="Sign up" type="submit" onclick="javascript:location.href='/signup'" />
		</span>
	</div>
</template>

<script>
export default {  
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

h2 {
	font-weight: normal;
	font-size: 20px;
	font-style: italic;
	height: 4rem;
	color: white;
	font-family: 'Bitter';
}

.container {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.details {
	font-style: italic;
}

::placeholder {
	color: rgba(255, 255, 255, 0.479);
	font-size: 20px;
}

#login-error-message {
	color: red;
	font-weight: bold;
	font-size: 1.2rem;
	font-family: 'Bitter';
	margin-top: 0.5rem;
	margin-left: 2rem;
	display: none;
	padding-bottom: 0.5rem;
}

#signup-error-message {
	color: red;
	font-weight: bold;
	font-size: 1rem;
	font-family: 'Bitter';
	margin-top: 0.5rem;
	margin-left: 1rem;
	display: none;
	padding-bottom: 0.5rem;
}

#password-match-error {
	color: red;
	font-weight: bold;
	font-size: 1.2rem;
	font-family: 'Bitter';
	margin-top: 0.5rem;
	margin-left: 4.5rem;
	display: none;
	padding-bottom: 0.5rem;
}

#field-empty {
	color: red;
	font-weight: bold;
	font-size: 1.2rem;
	font-family: 'Bitter';
	margin-top: 0.5rem;
	margin-left: 3.8rem;
	display: none;
	padding-bottom: 0.5rem;
}

@media (min-width: 900px), (min-height: 700px) {
	div {
		background-image: url('../assets/background1920.jpg');
	}
}

</style>
