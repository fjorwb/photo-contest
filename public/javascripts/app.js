// Setup variables
// ------------------------------------------------------------------

// const url = 'https://web-production-1704.up.railway.app/';
// console.log(url);

let token = getLocalStorage('token') || null

let role = null
let photoId = null
let captionId = null

let modal = document.querySelector('#modal')
let voteCaptionModal = document.querySelector('.vote')
let closeModal = document.querySelector('.close-button')

role = !token ? null : getLocalStorage('token').role

// login/logout buttons
// ------------------------------------------------------------------

const plogin = document.getElementById('plogin')
const plogout = document.getElementById('plogout')

function pLogin() {
	plogout.style.display = 'none'
	plogin.style.display = 'contents'
}

function pLogout() {
	if (token) {
		plogin.style.display = 'none'
		plogout.style.display = 'contents'
	} else {
		plogin.style.display = 'contents'
		plogout.style.display = 'none'
	}
}

// console.log(role);

if (role === null && token === null) {
	pLogin()
} else {
	pLogout()
}

const logout = document.getElementById('logout')
if (logout) {
	logout.addEventListener('click', () => {
		// console.log('object');
		localStorage.clear()
		location.reload()
	})
}

// check admin role --> send to admin area
// ------------------------------------------------------------------

const admin = document.getElementById('admin')

if (admin) {
	function isAdmin() {
		if (role === 'admin') {
			admin.style.display = 'contents'
			pLogout()
		} else {
			admin.style.display = 'none'
		}
	}

	isAdmin()
}

// localStorage token
// ------------------------------------------------------------------
function getLocalStorage(it) {
	return JSON.parse(localStorage.getItem(`${it}`))
}

function saveLocalStorage(na, it) {
	localStorage.setItem(`${na}`, JSON.stringify(it))
}

token = getLocalStorage('token') || null

const modal_title = document.querySelector('.modal-title')
const modal_msg = document.querySelector('.modal-msg')
const modal_msg2 = document.querySelector('.modal-msg2')

// Menu button
// ------------------------------------------------------------------
const toggleButton = document.getElementsByClassName('toggle-btn')[0]
const navbarLink = document.getElementsByClassName('navbar-link')[0]

toggleButton.addEventListener('click', () => {
	navbarLink.classList.toggle('active')
})

// login button
// ------------------------------------------------------------------
const modal_login = document.querySelector('#modal-login')
const loginModal = document.querySelector('#login')
const closeModal_login = document.querySelector('.close-button-login')

loginModal.addEventListener('click', () => {
	modal_login.showModal()
})

if (closeModal_login) {
	closeModal_login.addEventListener('click', () => {
		// pLogin();
		modal_login.close()
	})
}

const login = document.querySelector('#enter-login')

if (login) {
	login.addEventListener('click', async function () {
		const email = document.querySelector('#email').value
		const password = document.querySelector('#password').value
		loginx(email, password)
	})
}

const loginx = async (email, password) => {
	const data = { email, password }
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}

	token = await fetch(`/auth/login`, options)
		.then(response => response.json())
		.then(data => {
			return data
		})
		.catch(err => {
			console.error
		})

	if (token.message === 'User not found') {
		modal.showModal()

		modal_title.innerHTML = 'Login Failed'
		modal_msg.innerHTML = 'wrong email or password'
		modal_msg2.innerHTML = 'please try again'

		setTimeout(() => {
			location.reload()
		}, 6000)
		return
	}
	// isAdmin();
	pLogout()
	saveLocalStorage('token', token)
	saveLocalStorage('tkn', token.accessToken)
	location.reload()
	modal_login.close()
}

// join button
// ------------------------------------------------------------------
const modal_register = document.querySelector('#modal-register')
const registerModal = document.querySelector('#register')
const closeModal_register = document.querySelector('.close-button-register')

registerModal.addEventListener('click', () => {
	modal_register.showModal()
})

if (closeModal_register) {
	closeModal_register.addEventListener('click', () => {
		modal_register.close()
	})
}

const register = document.querySelector('#enter-register')
if (register) {
	register.addEventListener('click', async function () {
		const firstname = document.querySelector('#first-name').value
		const lastname = document.querySelector('#last-name').value
		const email = document.querySelector('#register-email').value
		const password = document.querySelector('#register-password').value
		const password2 = document.querySelector('#register-password2').value
		const address = document.querySelector('#address').value
		const address2 = document.querySelector('#address2').value || ''
		const city = document.querySelector('#city').value
		const state = document.querySelector('#state').value
		const zipcode = document.querySelector('#zipcode').value
		const country = document.querySelector('#country').value
		const phone = document.querySelector('#phone').value

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
		)
	})
}

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
	}

	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}

	const registerX = await fetch(`/auth/register`, options)
		.then(response => response.json())
		.then(data => {
			return data
		})

	if (!registerX) {
		modal.showModal()

		modal_title.innerHTML = 'Register Failed'
		modal_msg.innerHTML = 'wrong xxxxxxxxxxxx'
		modal_msg2.innerHTML = 'please try again'
	}

	modal_register.close()

	modal_title.innerHTML = 'Register'
	modal_msg.innerHTML = 'Succesfully Registered'
	modal_msg2.innerHTML = ''
}

// Vote button
// ------------------------------------------------------------------
modal = document.querySelector('#modal')
voteCaptionModal = document.querySelector('.vote')
closeModal = document.querySelector('.close-button')

if (voteCaptionModal) {
	voteCaptionModal.addEventListener('click', () => {
		modal.showModal()
	})
}

closeModal.addEventListener('click', () => {
	modal.close()
})

const voteCaption = document.querySelector('.vote')
if (voteCaption) {
	voteCaption.addEventListener('click', async function () {
		let id = 0

		if (token === null) {
			modal_title.innerHTML = 'Captions'
			modal_msg.innerHTML = 'Please Log In'
			modal_msg2.innerHTML = ''
			return
		}

		user_id = token.id

		let check = 0

		voteId = await fetch(`/votes`)
			.then(response => response.json())
			.then(data => {
				return data
			})

		const voteZ = `${user_id.toString()}${photoId.toString()}${captionId.toString()}`

		voteId.forEach(vote => {
			const voteX = `${vote.user_id.toString()}${vote.photo_id.toString()}${vote.caption_id.toString()}`
			check = voteX === voteZ ? 0 : 1
			return
		})

		if (check === 0) {
			modal_title.innerHTML = 'Captions'
			modal_msg.innerHTML = 'You already voted for this caption!'
			modal_msg2.innerHTML = ''
			return
		}

		if (check === 1) {
			// find next id in votes db
			id = voteId[voteId.length - 1].id + 1
			await fetch(`/votes`, {
				method: 'POST',
				headers: {
					authorization: `Bearer ${token.accessToken}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id, user_id, photo_id: photoId, caption_id: captionId })
			})

			modal_title.innerHTML = 'Captions'
			modal_msg.innerHTML = 'You have voted for this caption'
			modal_msg2.innerHTML = ''
		}
	})
}

// Caption button
// ------------------------------------------------------------------
const modal1 = document.querySelector('#modal1')
const enterCaptionModal = document.querySelector('.enter')
const closeModal1 = document.querySelector('.close-button1')

if (enterCaptionModal) {
	enterCaptionModal.addEventListener('click', () => {
		if (token === null) {
			modal.showModal()
			modal_title.innerHTML = 'Captions'
			modal_msg.innerHTML = 'Please Log In'
			modal_msg2.innerHTML = ''
			return
		}

		modal1.showModal()
	})
}

if (closeModal1) {
	closeModal1.addEventListener('click', () => modal1.close())
}

const enterCaption = document.querySelector('#enter-caption')

if (enterCaption)
	enterCaption.addEventListener('click', async function () {
		let num_id = await fetch(`/photos/data`)
			.then(response => response.json())
			.then(data => {
				return data
			})

		await fetch(`/captions`, {
			method: 'POST',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: {
				authorization: `Bearer ${token.accessToken}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(caption)
		})
			.then(res => res.json())
			.then(response => console.log('Success: ', response))
			.catch(error => console.error('Error: ', error))

		if (num_id.length === 0) {
			num_id = 1
		} else {
			num_id = num_id.sort((a, b) => b.id - a.id)[0].id + 1
		}

		const a = document.getElementById('textarea').value
		const caption = { caption: a, user_id: token.id, photo_id: photoId }

		photos_slides()
		location.reload()
	})

// Photos&Captions Slider
// ------------------------------------------------------------------

// const photosSlide = document.getElementById('photos-slide');
async function photos_slides() {
	const array = await fetch(`/photos/data`, {})
		.then(response => response.json())
		.then(data => {
			return data
		})

	const img_url = array.sort((a, b) => a.id - b.id)

	const photo_length = img_url.length - 1
	let caption_lenght = img_url[photo_length].captions.length
	const ndx = { counter: photo_length }
	const ndx1 = { counter: 0 }

	const img_photo = document.querySelector('.photos-main')
	if (img_photo) {
		const img_caption = document.querySelector('.caption-main')
		const photo_buttons = document.querySelectorAll('[data-carousel-btn]')
		const caption_buttons = document.querySelectorAll('[data-caption-btn]')

		img_photo.src = img_url[ndx.counter].url
		if (img_url[ndx.counter].captions[0].caption) {
			img_caption.innerHTML = img_url[ndx.counter].captions[0].caption
		} else {
			img_caption.innerHTML = 'No caption'
		}

		photoId = img_url[ndx.counter].id
		captionId = img_url[ndx.counter].captions[0].id

		photo_buttons.forEach(button => {
			button.addEventListener('click', e => {
				e.preventDefault()
				const offset = button.dataset.carouselBtn === 'next' ? 1 : -1
				ndx.counter += offset

				if (ndx.counter < 0) {
					ndx.counter = photo_length
				} else if (ndx.counter > photo_length) {
					ndx.counter = 0
				}

				img_photo.src = img_url[ndx.counter].url
				img_caption.innerHTML = img_url[ndx.counter].captions[0].caption

				photoId = img_url[ndx.counter].id
				captionId = img_url[ndx.counter].captions[0].id

				caption_lenght = img_url[ndx.counter].captions.length

				caption_buttons.forEach(button => {
					button.addEventListener('click', e => {
						e.preventDefault()
						const offset = button.dataset.captionBtn === 'next' ? 1 : -1
						ndx1.counter += offset

						if (ndx1.counter < 0) {
							ndx1.counter = caption_lenght - 1
						} else if (ndx1.counter > caption_lenght - 1) {
							ndx1.counter = 0
						}

						const { caption } =
							img_url[ndx.counter].captions[ndx1.counter] ?? img_url[ndx.counter].captions[0]
						img_caption.innerHTML = caption

						photoId = img_url[ndx.counter].id

						captionId =
							img_url[ndx.counter].captions[ndx1.counter]?.id ?? img_url[ndx.counter].captions
					})
				})
			})
		})
	}
}

photos_slides()
