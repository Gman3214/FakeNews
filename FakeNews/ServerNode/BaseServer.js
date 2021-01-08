const express = require('express');
const bodyParser = require('body-parser');  
const mongoose = require('mongoose')
const cors = require('cors');

const app = express();
const port = 6969;



// this is the middleware that converts all reqests to json this will not do anything if it is after the post
const restaurantRoute = require('./Routes/restaurants');
const mealRoute = require('./Routes/meals');
const drinkRoute = require('./Routes/drinks');
const menuRoute = require('./Routes/menus');
const authRoute = require('./Routes/gateway');

app.use(cors());

app.use('/restaurants', restaurantRoute);
app.use('/meals', mealRoute);
app.use('/menus', menuRoute);
app.use('/drinks', drinkRoute);
app.use('/auth', authRoute);


app.get('/', (req, res) => {
    res.send('hello');
});

mongoose.connect('mongodb://localhost:27017/Restapp', { useNewUrlParser: true }, () => {
    console.log('connected to database')
})


app.listen(port, () => {
    console.log('Server started on port:', port);
});