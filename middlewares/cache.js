const NodeCache = require('node-cache');

const myCache = new NodeCache();

function cache(req, res, next) {
	const { id } = req.params;

	client.get('photos', (err, data) => {
		if (err) throw err;
		if (data !== null) {
			res.send(JSON.parse(data));
		} else {
			next();
		}
	});
}
