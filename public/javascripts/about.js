// const url = 'http://localhost:3000';

let token;

let photoId = 'photoX';
let captionId = 'captionX';

const modal_title = document.querySelector('.modal-title');
const vote_msg = document.querySelector('.vote-msg');
const vote_msg2 = document.querySelector('.vote-msg2');

// Menu button
// ------------------------------------------------------------------
const toggleButton = document.getElementsByClassName('toggle-btn')[0];
const navbarLink = document.getElementsByClassName('navbar-link')[0];

toggleButton.addEventListener('click', () => {
	navbarLink.classList.toggle('active');
});

// login button
// ------------------------------------------------------------------
const modal_login = document.querySelector('#modal-login');
const loginModal = document.querySelector('#login');
const closeModal_login = document.querySelector('.close-button-login');

loginModal.addEventListener('click', () => {
	modal_login.showModal();
});

closeModal_login.addEventListener('click', () => {
	modal_login.close();
});

const login = document.querySelector('#enter-login');
login.addEventListener('click', async function () {
	const email = document.querySelector('#email').value;
	const password = document.querySelector('#password').value;
	loginx(email, password);
});

const loginx = async (email, password) => {
	const data = { email, password };
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	};

	token = await fetch(`/auth/login`, options)
		.then(response => response.json())
		.then(data => {
			return data;
		});

	console.log(token);

	if (!token.id) {
		modal.showModal();
		console.log(modal_title);

		modal_title.innerHTML = 'Login Failed';
		vote_msg.innerHTML = 'wrong email or password';
		vote_msg2.innerHTML = 'please try again';

		// alert('wrong email or password')
	} else {
		modal_login.close();
	}
};

// join button
// ------------------------------------------------------------------
const modal_register = document.querySelector('#modal-register');
const registerModal = document.querySelector('#register');
const closeModal_register = document.querySelector('.close-button-register');

registerModal.addEventListener('click', () => {
	modal_register.showModal();
});

closeModal_register.addEventListener('click', () => {
	modal_register.close();
});

const register = document.querySelector('#enter-register');
register.addEventListener('click', async function () {
	const firstname = document.querySelector('#first-name').value;
	const lastname = document.querySelector('#last-name').value;
	const email = document.querySelector('#register-email').value;
	const password = document.querySelector('#register-password').value;
	const password2 = document.querySelector('#register-password2').value;
	const address = document.querySelector('#address').value;
	const address2 = document.querySelector('#address2').value || '';
	const city = document.querySelector('#city').value;
	const state = document.querySelector('#state').value;
	const zipcode = document.querySelector('#zipcode').value;
	const country = document.querySelector('#country').value;
	const phone = document.querySelector('#phone').value;

	registerx(
		firstname,
		lastname,
		email,
		password,
		password2,
		address,
		address2,
		city,
		state,
		zipcode,
		country,
		phone
	);
});

const registerx = async (
	firstname,
	lastname,
	email,
	password,
	password2,
	address,
	address2,
	city,
	state,
	zipcode,
	country,
	phone
) => {
	const data = {
		first_name: firstname,
		last_name: lastname,
		email,
		password,
		password2,
		address,
		address2,
		city,
		state,
		zip_code: zipcode,
		country,
		phone,
		role: 'user'
	};
	console.log(data);

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	};

	const registerX = await fetch(`${url}/auth/register`, options)
		.then(response => response.json())
		.then(data => {
			return data;
		});

	console.log(registerX);

	if (!registerX) {
		modal.showModal();
		console.log(modal_title);

		modal_title.innerHTML = 'Register Failed';
		vote_msg.innerHTML = 'wrong xxxxxxxxxxxx';
		vote_msg2.innerHTML = 'please try again';
	} else {
		modal_login.close();
	}

	modal_title.innerHTML = 'Register';
	vote_msg.innerHTML = 'Succesfully Registered';
	vote_msg2.innerHTML = '';
};
