const express = require('express');
const docsRouter = express.Router();
const swagger = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Portfolio / Photo Contest API',
			version: '1.0.0',
			description: 'Backend API to manage portfolio Photo Contest website',
			license: {
				name: 'MIT',
				url: 'https://choosealicense.com/licenses/mit/'
			}
		}
	},
	apis: ['./PhotoContest.yaml']
};
const specs = swagger(swaggerOptions);

docsRouter.use('/', swaggerUi.serve);
docsRouter.get(
	'/',
	swaggerUi.setup(specs, {
		explorer: true
	})
);

module.exports = docsRouter;
