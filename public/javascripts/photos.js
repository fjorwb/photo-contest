let image = null;
let image_name;

let items;

// function getLocalStorage() {
// 	return JSON.parse(localStorage.getItem('items'));
// }

token = getLocalStorage('token') || null;

// photos page
const modal_photo = document.querySelector('#modal-photo');
const photoModal = document.querySelector('.enter-photo');
const closeModal_photo = document.querySelector('.close-button-photo');
const proceed = document.querySelector('#proceed');

photoModal.addEventListener('click', () => {
	if (token === null) {
		modal_title.innerHTML = 'Upload Photo';
		modal_msg.innerHTML = 'Please Log In';
		modal_msg2.innerHTML = '';
		modal.showModal();
		return;
	}

	modal_photo.showModal();

	fetch('/categories', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
			// authorization: `Bearer ${token.accessToken}`
		}
	})
		.then(response => response.json())
		.then(response => {
			const categoryList = document.querySelector('#category');
			response
				.sort((a, b) => (a.category > b.category ? 1 : -1))
				.forEach(category => {
					const option = document.createElement('option');
					option.value = category.id;
					option.innerHTML = category.category;
					categoryList.appendChild(option);
				});
		});
});

proceed.addEventListener('click', () => {
	if (token === null) {
		modal_title.innerHTML = 'Upload Photo';
		modal_msg.innerHTML = 'Please Log In';
		modal_msg2.innerHTML = '';
		modal.showModal();
		return;
	}
	// modal_photo.showModal();
	photo_title = document.querySelector('#photo-title').value;
	photo_description = document.querySelector('#photo-description').value;
	photo_category_id = document.querySelector('#category').value;

	items = [{ id: 'fee', amount: 20 }];
	saveLocalStorage('items', items);

	const photo_data = { photo_title, photo_description, photo_category_id };
	console.log(photo_data);
	saveLocalStorage('photoData', photo_data);

	window.location.href = 'checkout.html';
});

if (closeModal) {
	closeModal.addEventListener('click', () => {
		modal.close();
	});
}

const upload_photo = document.querySelector('#upload-photo');

upload_photo.addEventListener('click', async function () {
	modalUpload = document.querySelector('#modal-upload');
	modalUpload.showModal();
});

const image_upload = document.querySelector('#upload-image');
image_upload.addEventListener('change', async () => {
	image = image_upload.files[0];

	document.querySelector('#image-preview').style.backgroundImage = `url(${URL.createObjectURL(
		image
	)})`;
});

const image_save = document.querySelector('#image-save');
image_save.addEventListener('click', async () => {
	let formData = new FormData();

	formData.append('image', image);
	image_name = image.name;
	console.log(image);

	saveLocalStorage('image', image_name);

	console.log(token.accessToken);

	await fetch(`/upload`, {
		method: 'POST',
		headers: {
			authorization: `Bearer ${token.accessToken}`
		},
		body: formData
	})
		.then(response => response.json())
		.then(response => console.log('success: ', JSON.stringify(response)))
		.catch(error => console.error('error: ', error));

	modalUpload.close();
});

function getSelectValue() {
	var selectedValue = document.getElementById('category').value;
	return selectedValue;
}

modal_photo.close();
