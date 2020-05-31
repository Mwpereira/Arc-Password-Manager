<template>
	<div class="signup">
            <h1>Arc</h1>
            <form class="validation-form">
                <input autofocus class="input-bar" type="text" name="username" placeholder="Username">
                <input class="input-bar" type="password" name="password" placeholder="Password">
                <input class="input-bar" type="password" name="confirm-password" placeholder="Confirm Password">
                <input type="submit" class="action-btn" id="register" value="Register">
                <input class="action-btn" id="signupArc-btn" value="Already created an account? Login" onclick="javascript:location.href='/login'">
            </form>     
            <p id="signup-error-message">An Account With This Username Already Exists</p>
            <p id="password-match-error">Passwords Do Not Match</p>
            <p id="field-empty">Fields Cannot Be Left Empty</p>
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