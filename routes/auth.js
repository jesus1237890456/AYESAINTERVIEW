const { default: checkauth } = require("./middelware/checkauth");
const users = require("./models/users");
const refreshtoken = require("./models/refreshtoken");
const router = require("express").Router();


router.post('/refresh',checkauth.isRefreshTokenValid, async (req, res)=>{
    var jwt = require('jsonwebtoken');

    var decoded = jwt.verify(req.body.refreshToken, 'Cl4vePr1vada2022*');
    
    var token = jwt.sign({sub: 'A3SATEL' ,user_id: decoded.user_id, bureau_id: decoded.bureau_id, rol_id: decoded.rol_id}, 'Cl4vePr1vada2022*',{expiresIn:'60000'});
    var refreshToken = jwt.sign({ sub: 'A3SATEL' ,user_id: decoded.user_id, bureau_id: decoded.bureau_id, rol_id: decoded.rol_id}, 'Cl4vePr1vada2022*',{expiresIn:'1d'});
    await refreshtoken.update({
        refreshtoken_token: refreshToken,
    }, 
    {
        where: {
            user_id: decoded.user_id
        }
    });
    this.user_id = decoded.user_id;
    return res.json({
        token: token,
        refreshToken: refreshToken
    });
    

})
router.get('/tokenvalidate',checkauth.isAccessTokenValid, async (req, res)=>{
   
    res.json({  })

})
router.get('/refreshtokenvalidate',checkauth.isRefreshTokenValid, async (req, res)=>{
   
    res.json({  })

})
router.post('/logout', async (req, res)=>{
    await refreshtoken.update({
        refresh_token: "",
    }, 
    {
        where: {
            user_id: this.user_id
        }
    });
})
router.post("/login", async(req, res)=>{
    var jwt = require('jsonwebtoken');
    
    const {user_email, user_password} = req.body;
    try {
        if (!user_email || !user_password){
            return res.status(400);
        }
    } catch (error) {
        
    }
    try {
        
 
        const user = await users.findOne({where: { user_email, user_password }});
        const user_id = user.user_id;
        const refresh = await refreshtoken.findOne({where: { user_id }});
        if(refresh){
            var jwt = require('jsonwebtoken');
            var token = jwt.sign({sub: 'A3SATEL' ,user_id: user.user_id, bureau_id: user.bureau_id, rol_id: user.rol_id, jit: refresh.refreshtoken_id}, 'Cl4vePr1vada2022*',{expiresIn:'60000'});
            var refreshToken = jwt.sign({ sub: 'A3SATEL' ,user_id: user.user_id, bureau_id: user.bureau_id, rol_id: user.rol_id, jit: refresh.refreshtoken_id}, 'Cl4vePr1vada2022*',{expiresIn:'1d'});
            await refreshtoken.update({
                refreshtoken_token: refreshToken,
            }, 
            {
                where: {
                    user_id: user.user_id
                }
            });
        }else{
            var jwt = require('jsonwebtoken');
            var token = jwt.sign({sub: 'A3SATEL' ,user_id: user.user_id, bureau_id: user.bureau_id, rol_id: user.rol_id}, 'Cl4vePr1vada2022*',{expiresIn:'60000'});
            var refreshToken = jwt.sign({ sub: 'A3SATEL' ,user_id: user.user_id, bureau_id: user.bureau_id, rol_id: user.rol_id}, 'Cl4vePr1vada2022*',{expiresIn:'1d'});
            console.log(refreshToken);
            await refreshtoken.create({  user_id:user.user_id, refreshtoken_token:refreshToken });

        } 
        return res.json({
            token: token,
            refreshToken: refreshToken
        });
        }catch (error) {
            return res.status(400).json({
                error: "Bad credentials",
             });
        }
   
});



module.exports = router;
