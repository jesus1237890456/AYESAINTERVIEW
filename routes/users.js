const router = require("express").Router();
const { verify } = require("crypto");
const { hash } = require("./helpers/hash");
const { default: checkauth } = require("./middelware/checkauth");
const User = require("./models/users");
const Invitation = require("./models/invitations");

//routes
router.get('/', async (req, res)=>{
    const user = await User.findAll({
        attributes: {exclude:['password']}
    })
    res.json({ user })

})
router.get('/bureaus/:bureau_id/users',checkauth.isAccessTokenValid, async (req, res)=>{
    const {bureau_id} = req.params
    try {
        const user = await User.findAll({ where: {bureau_id}})
        res.json({ user }) 
    } catch (error) {
        return res.status(400).json({
            error: "Don't bureaus associate",
         });
    }
})

router.post('/bureaus/:bureau_id/users', async(req, res)=>{
    const {bureau_id,user_full_name,user_phone,user_email,user_observation,rol_id,status_id,user_password} = req.body
    const exist = await User.findOne({where: { user_email }});
    if (exist){
        return res
        .status(409)
        .json({error: "alredy exist an accoun with the given email"});
    }else{
        try {
            const user = await User.create({bureau_id: bureau_id,user_full_name: user_full_name,user_phone: user_phone,
                user_email: user_email,user_observation: user_observation,rol_id: rol_id,status_id: status_id,user_password: user_password});
                user.user_password = "";
            res.json({
                user_id: user.user_id
            });
        } catch (error) {
            res.json({error})
        }
       
    }
});

router.put('/bureaus/:bureau_id/users',checkauth.isAccessTokenValid, async(req, res)=>{
    const {user_id,bureau_id,user_full_name,user_phone,user_email,user_observation,rol_id,status_id,user_password} = req.body
    try {
        const user = await User.update({
            bureau_id: bureau_id,
            user_full_name: user_full_name,
            user_phone: user_phone,
            user_email: user_email,
            user_observation: user_observation,
            rol_id: rol_id,
            status_id: status_id,
            user_password: user_password
        }, 
        {
            where: {
                user_id: user_id,
                bureau_id: bureau_id
            }
        });
        user.user_password = "";
            res.json({
            bureau_id: bureau_id,
            user_full_name: user_full_name,
            user_phone: user_phone,
            user_email: user_email,
            user_observation: user_observation,
            rol_id: rol_id,
            status_id: status_id,
            });     
    } catch (error) {
        res.json({error});
    }
   
});

router.post('/bureaus/:bureau_id/invitation',checkauth.isAccessTokenValid, async(req, res)=>{
    const {bureau_id} = req.params;
    const {user_id} = req.body;
    const user = await User.findOne({where: { user_id, bureau_id }});
    if(user){ var jwt = require('jsonwebtoken');
    var token = jwt.sign({sub: 'A3SATEL' ,user_id: user_id, bureau_id: bureau_id, rol_id: user.rol_id }, 'Cl4vePr1vada2022*',{expiresIn:'60000'});
    try {
        await Invitation.create({user_id: user_id, invitation_token: token })
        res.json({
            "bureau_id": bureau_id,
            "user_id": user_id,
            "invitation_token": token
        });
    } catch (error) {
        res.json({error});
    }
    
    }else{
        return res.status(400).json({
            error: "Don't exist",
         });
    }
   
});


router.get('/bureaus/:bureau_id/users/:user_id',checkauth.isAccessTokenValid, async (req, res)=>{
    const {bureau_id, user_id} = req.params
    try {
        const user = await User.findOne({ where: {bureau_id ,user_id}})
        res.json({ user }) 
    } catch (error) {
        return res.status(400).json({
            error: "Don't bureaus associate",
         });
    }
})

router.post("/register", async(req, res)=>{
    const {email, password} = req.body
    const exist = await User.findOne({where: { email }});
    if (exist){
        return res
        .status(409)
        .json({error: "alredy exist an accoun with the given email"});
    }
    try {
        const user = await User.create({email, password: hash(password) })
        res.json({
            user, attributes: {exclude:['password']}
        });
    } catch (error) {
        res.json({error});
    }
 
});
router.delete("/bureaus/:bureau_id/users",checkauth.isAccessTokenValid, async(req, res)=>{
    const {bureau_id} = req.params;
    const {user_id} = req.body;
   
        const user = await User.findOne({where: { user_id, bureau_id }});
        if (user){
            if(user.status_id === 1){  
                try {
                    await User.destroy({ where:{user_id, bureau_id }})
                    res.status(204).json({
                        msg: "user deleted"
                    });
                } catch (error) {
                    res.json({error});
                }
            }else{
                res.json({
                    msg: "status don't coincident"
                });
            }
           
        }else{
            res.json({
                msg: "user don't exist"
            });
        }
   
   
  
});


module.exports = router;
