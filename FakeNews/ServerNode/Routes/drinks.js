const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Drink = require('../Models/Drink');
const { func } = require('@hapi/joi');
const { json } = require('express');
const { authVerify } = require('./authentication');


router.use(bodyParser.json());

router.post('/', authVerify, async (req, res) => {

    let body = req.body;

    const { pl } = req.user
    if (pl > 0) {
        switch (body.actionkey) {
            case 'adddrink': if (pl === 4){
                addDrink(body)
                res.send('added new drink')
            }
                break;
            case 'getalldrinks': if (pl === 1){
                getAllDrinks()
                    .then((drinks) => res.json(drinks))
            }
                break;
            case 'getfilterdrinks': if (pl === 1){
                getFilterDrinks(body.filter)
                    .then((drinks) => res.json(drinks))
            }
                break;
        }
    }
    else {
        return res.sendStatus(403);
    }
});

async function addDrink(body) {
    console.log('meal add key activated');

    let drink = new Drink({
        title: body.title,
        description: body.description,
        vegan: body.vegan,
        catagory: body.catagory,
        subcatagory: body.subcatagory,
        likes: body.likes,
        ingredients: body.ingredients,
        picture: body.picture,
        price: body.price
    });
    await drink.save();
}

async function getAllDrinks(){
    return Drink.find({}, (err) => {
        if(err){
            console.log(err)
        }
    } )
}

async function getFilterDrinks(filter) {
    console.log('return filter drinks key activated');

        console.log(filter)

        return Drink.find(filter, (err) => {
            if(err){
                console.log(err)
            }
        } )
}

module.exports = router;


// retracted code will be removed by the next commit

/*if(body.actionkey === 'adddrink')
    {
        console.log('meal add key activated');

        let drink = new Drink({
            title: body.title,
            description: body.description,
            vegan: body.vegan,
            catagory: body.catagory,
            subcatagory: body.subcatagory,
            likes: body.likes,
            ingredients: body.ingredients,
            picture: body.picture,
            price: body.price
        });
        await drink.save();

        res.send('done');

    }else if (body.actionkey === 'returnalldrinks')
    {
        console.log('return all menus key activated');

        Drink.find({}, (err, result) => {
            if(err){
                console.log(err)
            }else{
                 res.json(result);
            }
        } )

    }else if (body.actionkey === 'getfilterdrinks')
    {
        console.log('return all menus key activated');

        console.log(body.filter)

        body.filter

        Drink.find(body.filter, (err, result) => {
            if(err){
                console.log(err)
            }else{
                 res.json(result);
            }
        } )
        

    }
*/

