require('dotenv').config();

let PORT = process.env.PORT || 4000;
const cors = require('cors');
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { db_Link } = require('./Secret');
const helmet = require("helmet");
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require("express-rate-limit");


mongoose.connect(db_Link).then((msg) => {
    console.log("connected");
}).catch((err) => {
    console.log("err " + err);
})

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 500,
    message: "too many messages"
});

app.use(cors());

app.use(limiter);
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp({ whitelist: ['sort', 'select', 'page', 'limit'] }))
app.use(cookieParser());
app.use(express.json());
app.use(xss())


app.use('/api/auth', require('./Routes/authRouter'));
app.use('/api/user', require('./Routes/userRouter'));
app.use('/api/plan', require('./Routes/planRouter'));
app.use('/api/review', require('./Routes/reviewRouter'));
app.use('/api/booking', require('./Routes/bookingRouter'));
app.use('/api/verification', require('./Routes/verificationRouter'));
app.use('/api/contact', require('./Routes/contactRouter'));

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
})