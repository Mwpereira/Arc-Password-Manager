<template>
	<div class="home">
		<span id="co">
			<img class="logo" src="../assets/logo.png" />
			<h1>Arc</h1>
		</span>
		<h2>Keep Yourself Safe.<br />Secure, Advanced, and Customizable Software at Your Service.</h2>
		<span id="btns">
			<input class="action-btn" id="login" value="Login" type="submit" onclick="javascript:location.href='/login'" />
			<input class="action-btn" id="signup" value="Sign up" type="submit" onclick="javascript:location.href='/signup'" />
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
	height: 100%;
}

span{
	justify-content: center;
	align-items: center;
	text-align: center;
	display: flex;
	flex-direction: row;
}

h2 {
	font-size: 24px;
	font-style: italic;
	font-weight: bold;
	height: 4rem;
	color: #15202B;
	font-family: 'Bitter';
	cursor: default;
	align-items: center;
	text-align: center;
}

.action-btn{
	color: white;
	justify-content: center;
	border: none;
	border-radius: 100px;
	width: 150px;
	height: 50px;
	outline: none;
	font-size: large;
	font-weight: 550;
	margin: 10px;
	cursor: pointer;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	background: linear-gradient(to right, rgb(255, 217, 0), rgb(255, 179, 0));
}

.action-btn:hover{
    transform: scale(1.1,1.1);
}

.logo {
	width: 5rem;
	height: 5rem;
	padding: 0.5rem;
	margin-top: -0.5rem;
}

::placeholder {
	color: rgba(255, 255, 255, 0.479);
	font-size: 20px;
}

#co{
	margin-top: 20vh;
	margin-bottom: 5vh;
}

#btns{
	margin-top: 5vh;
	margin-bottom: 5vh;
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
</style>
