const router = require("express").Router();
const { default: checkauth } = require("./middelware/checkauth");
const User = require("./models/users");

//routes
// obtener todos los usuarios
router.get('/',checkauth.isAccessTokenValid, async (req, res)=>{
    try {
        const user = await User.findAll()
        res.json({ user }) 
    } catch (error) {
        return res.status(400).json({
                error: "Don't user associate",
            });
    }
})
// crear usuario, comprueba si existe y si no lo crea
router.post('/',checkauth.isAccessTokenValid, async(req, res)=>{
    const {dni,name,last_name,mail} = req.body
    const exist = await User.findOne({where: { mail:mail }});
    if (exist){
        return res
        .status(409)
        .json({error: "alredy exist an accoun with the given email"});
    }else{
        try {
            const usercreate = await User.create({ name: name,last_name:last_name, mail:mail, dni:dni});
            res.json({
                id: usercreate.id
            });    
        } catch (error) {
            res.status(400).json({error})
        }
    }
});

//actualizar usuario
router.put('/:userId',checkauth.isAccessTokenValid, async(req, res)=>{
    const{name,last_name,mail,dni} = req.body
    const {userId} = req.params
   
    try {
        const user = await User.update({
            name: name,
            last_name: last_name,
            mail: mail,
            dni: dni
        }, 
        {
            where: {
                id: userId,
            }
        });
            res.json({
                userFullName:name + last_name,
                email: mail,
            });     
    } catch (error) {
        res.status(400).json({error});
    }
});


//mostar un usuario por id
router.get('/:user_id',checkauth.isAccessTokenValid, async (req, res)=>{
    const {user_id} = req.params
    try {
        const user = await User.findOne({ where: {id: user_id}})
        res.json({ user }) 
    } catch (error) {
        return res.status(400).json({
                error: "Don't bureaus associate",
            });
    }
})



//borrar usuario, comprobando que exista
router.delete("/:userId",checkauth.isAccessTokenValid,async(req, res)=>{
    const {userId} = req.params;
    const user = await User.findOne({where: { id:userId }});
    if (user){
            try {
                await User.destroy({ where:{id: userId }})
                res.status(204).json({ msg: "user deleted"});   
            } catch (error) {
                res.status(400).json({error});
            }      
    }else{
        res.status(400).json("user don't exist");
    }   
});


module.exports = router;
