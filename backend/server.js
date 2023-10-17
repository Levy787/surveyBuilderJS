const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const mongoSanitize = require('express-mongo-sanitize');
var cookieParser = require('cookie-parser');
const helmet = require("helmet");
const xss = require('xss-clean');
const { rateLimit } = require('express-rate-limit');
var hpp = require('hpp');
var cors = require('cors');

//Load env vars
dotenv.config({path: './config/config.env'});

connectDB();

const app = express();

//Route files
const questions = require("./routes/questions");
const questionnaires = require("./routes/questionnaires");
const questionnaireResponses = require("./routes/questionnaireResponses");
const auth = require("./routes/auth");
const users = require("./routes/users");

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: ... , // Use an external store for more precise rate limiting
})

// Body parser
app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(limiter);
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));


// Dev logging middleware
if (process.env.NODE_ENV == 'development') {
    app.use(morgan('dev'));
}

//Mount routers
app.use('/api/v1/questions', questions);
app.use('/api/v1/questionnaires', questionnaires);
app.use('/api/v1/questionnaireResponses', questionnaireResponses);
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});