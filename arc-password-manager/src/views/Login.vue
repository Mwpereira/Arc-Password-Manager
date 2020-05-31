<template>
	<div class="login">
		<h1>Arc</h1>
        <form class="validation-form">
                <input autofocus class="input-bar" type="text" placeholder="Username" />
                <input class="input-bar" type="password" placeholder="Password" />
            <input class="action-btn" type="submit" value="Login" />
            <input class="action-btn" id="loginArc-btn" value="Need to create an account? Sign up" onclick="javascript:location.href='/signup'" />
        <p id="login-error-message">Username or Password Is Incorrect</p>
        </form>
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

P{
    display: none;
}

@media (min-width: 900px), (min-height: 700px) {
	div {
		background-image: url('../assets/background1920.jpg');
	}
}

</style>
