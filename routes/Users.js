const router = require('express').Router();
const { check, validationResult } = require('express-validator/check')
const gravatar = require('gravatar');
const bcrypt = require('bcrypt')

const User = require('../models/User');


router.post('/', [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please Include a valid email").not().isEmpty().isEmail(),
    check("password", "Please enter a valid password").isLength({ min: 6 })],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        try {
            let user = await User.findOne({ email });

            if (user) {
                res.status(400).send({ errors: [{ msg: "user already exists" }] });
            }

            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pr',
                d: 'mm'
            })


            user = new User({
                name,
                email,
                avatar,
                password
            })

            //Encryption

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt)

            await user.save();

            res.send('user registered')

        } catch (error) {
            console.log(error.message)
        }


        // res.send('User route')
    })


module.exports = router;