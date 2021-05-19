
import express from 'express';
import {initRoutes} from './routes/router.js';

// The server application where it all starts

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

// An endpoint to get confirmation of the application server status
app.get('/health', (req, res) => {
    res.send('<h1>Server is healthy and running<h1>');
});

initRoutes(app);

app.listen(3000, function () {
    console.log('listening on 3000')
})