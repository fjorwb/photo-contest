require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// app.locals.url = 'http://localhost:3000';

const { sequelize } = require('./models/index');

const createError = require('http-errors');
const fileUpload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const cors = require('cors');

// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const photosRouter = require('./routes/photos');
const captionsRouter = require('./routes/captions');
const votesRouter = require('./routes/votes');
const inscriptionsRouter = require('./routes/inscriptions');
const categoriesRouter = require('./routes/categories');
const uploadRouter = require('./routes/upload');
const emailRouter = require('./routes/email');
const stripeRouter = require('./routes/stripe');
const docsRouter = require('./routes/docs');

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(fileUpload());

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/stylesheets')));
app.use(express.static(path.join(__dirname, 'public/uploadPhotos')));
app.use(express.static(path.join(__dirname, '')));

// app.use('/', (req, res) => {
//   res.send('Photo Contest API')
// })

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/photos', photosRouter);
app.use('/captions', captionsRouter);
app.use('/votes', votesRouter);
app.use('/inscriptions', inscriptionsRouter);
app.use('/categories', categoriesRouter);
app.use('/upload', uploadRouter);
app.use('/email', emailRouter);
app.use('/stripe', stripeRouter);
app.use('/docs', docsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);

	// sequelize.authenticate().then(() => {
	// 	console.log('Connection to the database successful!');
	// });

	sequelize
		.authenticate()
		.then(() => {
			console.log('Connection has been established successfully.');
		})
		.catch(err => {
			console.error('Unable to connect to the database:', err);
		});
});

module.exports = app;
