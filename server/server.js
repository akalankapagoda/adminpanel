
import express from 'express';
import {initRoutes} from './routes/router.js';


const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.get('/health', (req, res) => {
    res.send('<h1>Server is healthy and running<h1>');
});

initRoutes(app);

app.listen(3000, function () {
    console.log('listening on 3000')
})