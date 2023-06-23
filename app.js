const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const bodyParser = require('body-parser');
const multer = require('multer');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./utils/swagger');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');


const { errors } = require('celebrate');

const createDefaultAdmin = require('./config/defaultAdmin');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(multer().array())

// 1. Middlewares
//Implement CORS
app.use(cors());
//Access-Control-Allow-Origin
app.options('*', cors());
//app.options('/api/v1/roles/:id', cors());

app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  // console.log('From middleware');
  next();
})
// Routes
app.use('/api/v1/users', userRouter);


createDefaultAdmin();

// errror handler from celebrate
app.use(errors());

// API documentation Route
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

