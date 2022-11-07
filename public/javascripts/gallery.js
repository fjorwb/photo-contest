let selval = 0;
let filter = 0;

async function selectCategory() {
	await fetch('/categories', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(response => {
			// console.log(response);
			const filterList = document.querySelector('#filter');
			response
				.sort((a, b) => (a.category > b.category ? 1 : -1))
				.forEach(category => {
					const option = document.createElement('option');
					option.value = category.id;
					option.innerHTML = category.category;
					filterList.appendChild(option);
				});
		});
}

async function displayPhotos(filter) {
	if (filter === 0) {
		const gallery = document.querySelector('#gallery');
		gallery.innerHTML = '';
		await fetch(`/photos/category`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(response => {
				// console.log(response);
				response
					.sort((a, b) => (a.title > b.title ? 1 : -1))
					.forEach(photo => {
						const photoContainer = document.createElement('div');
						photoContainer.classList.add('gallery-container');
						photoContainer.innerHTML = `
						<div class="gallery-box">
							<div class="photo" id="photo${photo.id}" >
								<img class="gallery-image" src="${photo.url}" alt="${photo.title} />
								<div class="photo-info">
									<h2 id="photo-title${photo.id}">${photo.title}</h2>
									<p>${photo.description}</p>
									<p>${photo.categories.category}</p>
								</div>
							</div>
						</div>
					`;
						gallery.appendChild(photoContainer);
					});
				const photoList = document.querySelectorAll('.photo');
				for (photo of photoList) {
					photo.addEventListener('click', function () {
						const photoZ = this.id.split('photo')[1];
						saveLocalStorage('photoZ', photoZ);
						window.location.href = '/photo.html';
					});
				}
			});
	}

	if (filter !== 0) {
		const gallery = document.querySelector('#gallery');
		gallery.innerHTML = '';
		await fetch(`/photos/category/${filter}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(response => {
				// console.log(response);
				response
					.sort((a, b) => (a.title > b.title ? 1 : -1))
					.forEach(photo => {
						const photoContainer = document.createElement('div');
						photoContainer.classList.add('gallery-container');
						if (photo.categories.id === Number(filter)) {
							photoContainer.innerHTML = `
						<div class="gallery-box">
							<div class="photo" id="photo${photo.id}" >
								<img class="gallery-image" src="${photo.url}" alt="${photo.title} />
								<div class="photo-info">
									<h2 id="photo-title${photo.id}">${photo.title}</h2>
									<p>${photo.description}</p>
									<p>${photo.categories.category}</p>
								</div>
							</div>
						</div>
					`;
						}
						gallery.appendChild(photoContainer);
					});
				const photoList = document.querySelectorAll('.photo');
				console.log(photoList);
				for (photo of photoList) {
					photo.addEventListener('click', function () {
						const photoZ = this.id.split('photo')[1];
						saveLocalStorage('photoZ', photoZ);
						window.location.href = '/photo.html';
					});
				}
			});
	}
}

function getSelectValue() {
	const selval = document.getElementById('filter').value;
	displayPhotos(Number(selval));
	return selval;
}

selectCategory();
displayPhotos(filter);
