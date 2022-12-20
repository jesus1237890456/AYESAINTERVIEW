const router = require("express").Router();
const { verify } = require("crypto");
const { hash } = require("./helpers/hash");
const { default: checkauth } = require("./middelware/checkauth");
const User = require("./models/users");

//routes
router.get('/', async (req, res)=>{
    const user = await User.findAll({
        attributes: {exclude:['password']}
    })
    res.json({ user })

})

router.post("/register", async(req, res)=>{
    const {email, password} = req.body
    const exist = await User.findOne({where: { email }});
    if (exist){
        return res
        .status(409)
        .json({error: "alredy exist an accoun with the given email"});
    }
    const user = await User.create({email, password: hash(password) })
    res.json({
        user,
    });
});

router.post("/login", async(req, res)=>{
    const {user_email, user_password} = req.body
    const user = await User.findOne({where: { user_email, user_password }});
    var jwt = require('jsonwebtoken');
    var token = jwt.sign({sub: 'A3SATEL' ,user_id: user.user_id, bureau_id: user.bureau_id, rol_id: user.rol_id }, 'Cl4vePr1vada2022*',{expiresIn:'60000'});
    var refreshToken = jwt.sign({ sub: 'A3SATEL' ,user_id: user.user_id, bureau_id: user.bureau_id, rol_id: user.rol_id}, 'Cl4vePr1vada2022*',{expiresIn:'1d'});
    if (!user){
        return res.status(400).json({
            error: "Bad credentials",
         });
    }else{
        return res.json({
            token: token,
            refreshToken: refreshToken
        });
    }
    
});
router.get('/user/:user_email',checkauth.isAccessTokenValid, async (req, res)=>{
    const {user_email, user_password} = req.params
    const user = await User.findOne({where: { user_email }})
    res.json({ user })

})


module.exports = router;
