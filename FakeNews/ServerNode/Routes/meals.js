const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Meal = require('../Models/Meal');
const { authVerify } = require('./authentication');


router.use(bodyParser.json());

router.post('/', authVerify, async (req, res) => {

    let body = req.body;

    const { pl } = req.user
    
    if (pl > 0) {
        switch (body.actionkey) {
            case 'addmeal': if (pl === 4){
                await addMeal(body);
                res.send('added new Meal')
            }
                break;
            case 'getallmeals': if (pl === 1){
                getAllMeals()
                    .then((meals) => res.json(meals))
            }
                break;
            case 'getfiltermeals': if (pl === 1){
                getFilterMeals(body.filter)
                    .then((meals) => res.json(meals))
            }
                break;
        }
    }
    else {
        return res.sendStatus(403);
    }

});

async function addMeal(body) {
    console.log('meal add key activated');

    let meal = new Meal({
        title: body.title,
        description: body.description,
        average_wait: body.average_wait,
        gloten_free: body.gloten_free,
        vegan: body.vegan,
        vegetarian: body.vegetarian,
        catagory: body.catagory,
        likes: body.likes,
        ingredients: body.ingredients,
        extras: body.extras,
        picture: body.picture,
        price: body.price,
        subcatagory: body.subcatagory
    });
    await meal.save();
}

async function getAllMeals(){
    return Meal.find({}, (err) => {
        if(err){
            console.log(err)
        }
    } )
}

async function getFilterMeals(filter) {
    console.log('return filter meals key activated');

        console.log(filter)

        return Meal.find(filter, (err) => {
            if(err){
                console.log(err)
            }
        } )
}

module.exports = router;

// retracted code will be removed by the next commit

/*router.post('/', async (req, res) => {

    let body = req.body;
    if(body.actionkey === 'addmeal')
    {
        console.log('meal add key activated');

        let meal = new Meal({
            title: body.title,
            description: body.description,
            average_wait : body.average_wait,
            gloten_free: body.gloten_free,
            vegan: body.vegan,
            vegetarian: body.vegetarian,
            catagory: body.catagory,
            likes: body.likes,
            ingredients: body.ingredients,
            extras: body.extras,
            picture: body.picture,
            price: body.price,
            subcatagory: body.subcatagory
        });
        await meal.save();

        res.send('done');

    }else if (body.actionkey === 'returnallmeals')
    {
        console.log('return all meals key activated');

        Meal.find({}, (err, result) => {
            if(err){
                console.log(err)
            }else{
                 res.json(result);
            }
        } )

    }else if (body.actionkey === 'getfiltermeals')
    {
        console.log('return all meals key activated');

        console.log(body.filter)

        body.filter

        Meal.find(body.filter, (err, result) => {
            if(err){
                console.log(err)
            }else{
                 res.json(result);
            }
        } )
        

    }
});*/

