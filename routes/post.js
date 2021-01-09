const router = require('express').Router();

router.post('/',(req,res)=>{
    res.send('post page');
})


module.exports= router;