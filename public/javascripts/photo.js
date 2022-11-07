photoZ = getLocalStorage('photoZ') || 2;

// Photos&Captions
// ------------------------------------------------------------------

async function photoShow() {
	const photo = await fetch(`/photos/${photoZ}`, {})
		.then(response => response.json())
		.then(data => {
			return data;
		});

	const img_url = photo;

	const caption_lenght = photo.captions.length - 1;
	const ndx1 = { counter: 0 };

	const img_photo = document.querySelector('.photo-main');
	const img_caption = document.querySelector('.caption-main');
	const caption_buttons = document.querySelectorAll('[data-caption-btn]');

	img_photo.src = photo.url;
	img_url.captions[0].caption
		? (img_caption.innerHTML = img_url.captions[0].caption)
		: (img_caption.innerHTML = 'No caption');

	photoId = photoZ;
	captionId = img_url.captions[0].id;

	caption_buttons.forEach(button => {
		button.addEventListener('click', e => {
			e.preventDefault();
			const offset = button.dataset.captionBtn === 'next' ? 1 : -1;
			ndx1.counter += offset;

			if (ndx1.counter < 0) {
				ndx1.counter = caption_lenght;
			} else if (ndx1.counter > caption_lenght) {
				ndx1.counter = 0;
			}

			const { caption } = img_url.captions[ndx1.counter] ?? img_url.captions[0];
			img_caption.innerHTML = caption;

			photoId = img_url.id;
			captionId = img_url.captions[ndx1.counter].id ?? img_url.captions[0];
		});
	});
}

photoShow();
