const router = require('express').Router();

router.post('/',(req,res)=>{
    res.send('auth page');
})


module.exports= router;