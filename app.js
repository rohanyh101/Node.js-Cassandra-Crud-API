const express = require('express');
const bodyParser = require('body-parser');
const UserRouter = require('./routes/UserRouter')
require('dotenv').config();
const app = express();

const PORT = process.env.APP_PORT || 3000; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.json('server is up and running...');
})

app.use('/api/v1', UserRouter)

app.use('/', (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, function() {
    console.log('listening on port: ' + PORT);
})