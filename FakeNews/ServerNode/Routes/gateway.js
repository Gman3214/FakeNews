const express = require('express');
const BUser = require('../Models/BUser');
const RUser = require('../Models/RUser');
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const validation = require('../validation');
const { valid } = require('@hapi/joi');
const { authSign } = require('./authentication');

const router = express.Router();

router.use(bodyParser.json());

router.post('/businessregister', async (req, res) => {

    const body = req.body;

    try {

        //validate with joi lib that all the data matches the rules
        const valid = await validation.BUserValidation.validateAsync(body)

        if (body.actionkey === 'regnewbus') {

            //check for existing email
            const exist = await BUser.findOne({ email: body.email });

            //hash the password
            const hashedPassword = await bcrypt.hash(body.password, 10)
            //const checkpass = await bcrypt.compare(body.password, hashedPassword) this is to check the password


            // create a new json mongose shcema and upload it to the server
            if (!exist) {

                const buser = new BUser({
                    fullname: body.fullname,
                    email: body.email,
                    username: body.username,
                    password: hashedPassword,
                    permissionlevel: 0,
                    restaurants: body.restaurants,
                    phone: body.phone,
                    billingaddress: body.billingaddress,
                    zip: body.zip
                })

                await buser.save()
                return res.send('user created');
            }
            else {
                return res.send("email exists");
            }

        }

    } catch (err) {
        return res.send(err);
    }
});

router.post('/regularregister', async (req, res) => {

    let body = req.body;

    if (body.actionkey === 'regnewreg') {

        const buser = new RUser({
            email: body.email,
            google: body.google

        })

        try {
            await buser.save()
        } catch
        {
            res.send('there was an error');
        }

        res.send('user created');
    }
});

router.post('/businesslogin', async (req, res) => {

    const body = req.body;

    const exist = await BUser.findOne({ email: body.email });
    console.log("attemt")    

    if (body.actionkey === 'blogin') {

        if (exist) {
            const checkpassword = await bcrypt.compare(body.password, exist.password);
            
            if (checkpassword) {

                try {
                    let token = await authSign(exist._id, exist.permissionlevel)
                    res.send({jwt: token});

                } catch (err) {
                    console.log(err)
                }


            } else {
                res.send('password is not correct');
            }

        } else {
            res.send("email doesnt exist please try again");

        }

    }


});



module.exports = router;