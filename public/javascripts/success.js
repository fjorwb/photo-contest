let ph1 = getLocalStorage('photoData');

const title = ph1.photo_title;
const description = ph1.photo_description;
const category_id = Number(ph1.photo_category_id);

ph2 = getLocalStorage('token');
const user = ph2.id;
console.log(ph2.accessToken);

ph3 = getLocalStorage('image');
const image = ph3;

document.querySelector('#image-preview').src = image;

const continueButton = document.querySelector('#btn-continue');
continueButton.addEventListener('click', async () => {
	let num_id = 0;
	let num_id2 = 0;

	const array = await fetch('/photos', {
		method: 'GET',
		headers: {
			// authorization: `Bearer ${ph2.accessToken}`,
			'Content-Type': 'application/json'
		}
	}).then(response => response.json());

	num_id.length === 0 ? (num_id = 1) : (num_id = array.sort((a, b) => b.id - a.id)[0].id + 1);

	const photoData = {
		title,
		description,
		category_id: category_id,
		category: 'category',
		user_id: user,
		url: image
	};

	await fetch(`/photos`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${ph2.accessToken}`
		},
		body: JSON.stringify(photoData)
	})
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(error => console.error(error));

	const array2 = await fetch('/captions', {
		method: 'GET',
		headers: {
			'Content-Type': 'applications/json',
			authorization: `Bearer ${ph2.accessToken}`
		}
	}).then(response => response.json());

	num_id2.length === 0 ? (num_id2 = 1) : (num_id2 = array2.sort((a, b) => b.id - a.id)[0].id + 1);

	const captionData = {
		id: num_id2,
		photo_id: num_id,
		user_id: user,
		caption: `caption about photo ${num_id}`
	};

	await fetch(`/captions`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${ph2.accessToken}`
		},
		body: JSON.stringify(captionData)
	})
		.then(response => response.json())
		.then(response => console.log(response))
		.catch(error => console.error(error));

	removeLocalStorage();

	location.reload();
	window.location.href = 'index.html';
});

function removeLocalStorage() {
	localStorage.removeItem('photoData');
	localStorage.removeItem('image');
	localStorage.removeItem('items');
}
