let form = document.getElementsByTagName('form')[0];

// Events
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (form.id == "login-form") login();
    else if (form.id == "signup-form") signup();
});

//Validation
function login() {
	let username = form.children[0].value;

	if (username == '') {
		$('input:first-child').attr('placeholder', 'Cannot Be Empty');
	}
	if (password == '') {
		$('input:nth-child(2)').attr('placeholder', 'Cannot Be Empty');
	}

	if (username != '' && password != '') {
		try {
			console.log('works');
		} catch {
			console.log('error');
		}
	}
}