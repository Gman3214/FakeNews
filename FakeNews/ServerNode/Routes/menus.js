const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Menu = require('../Models/Menu');
const { authVerify } = require('./authentication');


router.use(bodyParser.json());

router.post('/', authVerify, async (req, res) => {

    let body = req.body;

    const { pl } = req.user

    if (pl > 0) {
        switch (body.actionkey) {
            case 'addmenu': if (pl === 4) {
                await addMenu(body)
                res.send('added new drink')
            }
                break;
            case 'getallmenus': if (pl === 1) {
                getAllMenus()
                    .then((menus) => res.json(menus))
            }
                break;
            case 'getfiltermenus': if (pl === 1) {
                getFilterMenus(body.filter)
                    .then((menus) => res.json(menus))
            }
                break;
        }
    } else {
        return res.sendStatus(403);
    }
});

async function addMenu(body) {
    console.log('meal add key activated');

    let menu = new Menu({
        title: body.title,
        meals: body.meals,
        drinks: body.drinks,
        background: body.background
    });
    await menu.save();
}

async function getAllMenus(){
    return Menu.find({}, (err) => {
        if(err){
            console.log(err)
        }
    } )
}

async function getFilterMenus(filter) {
    console.log('return filter menus key activated');

        console.log(filter)

        return Menu.find(filter, (err) => {
            if(err){
                console.log(err)
            }
        } )
}

module.exports = router;

// retracted code will be removed by the next commit

/*router.post('/', async (req, res) => {

    let body = req.body;
    if(body.actionkey === 'addmenu')
    {
        console.log('meal add key activated');

        let menu = new Menu({
            title: body.title,
            meals: body.meals,
            drinks: body.drinks,
            background: body.background
        });
        await menu.save();

        res.send('done');

    }else if (body.actionkey === 'returnallmenus')
    {
        console.log('return all menus key activated');

        Menu.find({}, (err, result) => {
            if(err){
                console.log(err)
            }else{
                 res.json(result);
            }
        } )

    }else if (body.actionkey === 'returnfiltermenus')
    {
        console.log('return all menus key activated');

        console.log(body.filter)

        body.filter

        Menu.find(body.filter, (err, result) => {
            if(err){
                console.log(err)
            }else{
                 res.json(result);
            }
        } )
        

    }
});*/

