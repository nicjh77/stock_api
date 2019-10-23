const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT || 3000;
const app = express();

const stocks = require('./api/stocks');
const auth = require('./auth');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/api/stocks', stocks);
app.use('/auth', auth);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// error handler
// app.use((err, req, res, next) => {
//     res.status(err.status || 500);
//     res.json({
//         message: err.message,
//         error: req.app.get('env') === 'development' ? err : {}
//     });
// });

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//     let err = new Error('not found');
//     err.status = 404;
//     next(err);
// });

module.exports = app;