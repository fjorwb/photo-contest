const path = require('path');

const uploadPhoto = async (req, res) => {
	let photoImage = req.files.image;

	const imagePath = path.join(__dirname, '../public/uploadPhotos/' + `${photoImage.name}`);

	await photoImage.mv(imagePath, err => {
		console.log(err);
	});

	// console.log(photoImage);

	res.status(200).json({ image: { src: `/uploadPhotos/${photoImage.name}` } });
};

module.exports = { uploadPhoto };
