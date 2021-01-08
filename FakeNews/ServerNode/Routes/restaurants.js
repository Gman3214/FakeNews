const express = require('express');
const bodyParser = require('body-parser');
const Restaurant = require('../Models/Restaurant');

const { type } = require('os');
const { authVerify } = require('./authentication');
const { json } = require('express');

const router = express.Router();



router.use(bodyParser.json());


router.post('/', authVerify, async (req, res) => {

    let body = req.body;

    const { pl } = req.user

    if (pl > 0) {
        switch (body.actionkey) {
            case 'addrest': if (pl === 4){
                await addRestaurant(body)
                res.send('added new rest')
            }
                break;
            case 'getallrests': if (pl === 1){
                getAllRestaurants()
                    .then((rests) => res.json(rests))
            }
                break;
            case 'getfilterrests': if (pl === 1){
                getFilterRestaurants(body.filter)
                    .then((rests) => res.json(rests))
            }
                break;
        }
    }
    else{
        return res.sendStatus(403);
    }
});

async function addRestaurant(body) {
    console.log('rest add key activated')
        let rest = new Restaurant({
            name: body.name,
            description: body.description,
            address: body.address,
            geo_location: body.geo_location,
            country: body.country,
            likes: body.likes,
            menu: body.menu,
            icon: body.icon
        });

        await rest.save();
}

async function getAllRestaurants() {
    return Restaurant.find({}, (err) => {
        if (err) {
            console.log(err)
        }
    });
}

async function getFilterRestaurants(filter) {
    console.log('return filter rest key activated');

        console.log(filter)

        return Restaurant.find(filter, (err) => {
            if(err){
                console.log(err)
            }
        } )
}

module.exports = router;

// retracted code will be removed by the next commit

/*
router.post('/', async (req, res) => {
    
    let body = req.body;

    if (body.actionkey === 'addrest')
    {


        console.log('rest add key activated')
        let rest = new Restaurant({
            name: body.name,
            description: body.description,
            address: body.address,
            geo_location: body.geo_location,
            country: body.country,
            likes: body.likes,
            menu: body.menu,
            icon: body.icon
        });

        await rest.save();


        res.send('addedone');

    }else if (body.actionkey === 'returnallrest')
    {
        console.log('return all rest key activated');

        Restaurant.find({}, (err, result) => {
            if(err){
                console.log(err)
            }else{
                 res.json(result);
            }
        } )
        console.log(Restaurant.find({}, ))

    }else if (body.actionkey === 'getfilteredrest')
    {
        console.log('return all rest key activated');

        console.log(body.filter)

        body.filter

        Restaurant.find(body.filter, (err, result) => {
            if(err){
                console.log(err)
            }else{
                 res.json(result);
            }
        } )


    }
});*/



