const bcrypt = require('bcrypt'); //Encryption Package

let form = document.getElementsByTagName('form')[0];

// Events
form.addEventListener('submit', function (e) {
	e.preventDefault();
	if (form.id == 'login-form') login();
	else if (form.id == 'signup-form') signup();
});

//Validation
async function login() {
	let username = form.children[0].value;
	let password = form.children[1].value;

	if (username == '') {
		$('input:first-child').attr('placeholder', 'Cannot Be Empty');
	}
	if (password == '') {
		$('input:nth-child(2)').attr('placeholder', 'Cannot Be Empty');
	}

	if (username != '' && password != '') {
		try {
			if (localStorage.getItem(username)!=null){
				if (localStorage.getItem(username) == bcrypt.hashSync(password, salt)){
					console.log('Success!');
				}
			}
			else
			{
				console.log('Wrong Username and/or Password!');
			}
		} catch {
			$('#login-error-message').css("display", "block");
			console.log('Wrong Username and/or Password!');
		}
	}
}

//Validation
async function signup() {
		try{

		let username = form.children[0].value;
		let password = form.children[1].value;
		let confirmpassword = form.children[2].value;

		if (username != '' && password != '' && confirmpassword != '') {
			if (password.localeCompare(confirmpassword) == 0 && localStorage.getItem(username) === null) {

				const salt = await bcrypt.genSaltSync();
			
				const hashedPassword = await bcrypt.hashSync(password, salt);
			
				localStorage.setItem(username, hashedPassword);
	
				window.location.href = './login.html';

			}
			else if(password.localeCompare(confirmpassword) != 0){
				$('#password-match-error').css("display", "block");
	
				$('#signup-error-message').css("display", "none");
				$('#field-empty').css('display', 'none');
				
			}else{
				$('#password-match-error').css("display", "none");
				$('#field-empty').css('display', 'none');
	
				$('#signup-error-message').css("display", "block");
			}
		} else {
			$('#field-empty').css('display', 'block');
	
			$('#password-match-error').css("display", "none");
			$('#signup-error-message').css("display", "none");
		}
	}

	catch{
		console.log('Account Creation Failed!');
	}	
	
}
