const { default: checkauth } = require("./middelware/checkauth");

const router = require("express").Router();

router.get('/',checkauth.isAccessTokenValid, async (req, res)=>{
   
    res.json({  })

})



module.exports = router;
