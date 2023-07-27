const users = require("./models/users");
const Token = require("./models/token");
const router = require("express").Router();


//Deslogarse borra el token
router.post('/logout', async (req, res)=>{
    const {id_usuario} = req.body;
    try {
        await Token.update({
            token: "",
        }, 
        {
            where: {
                id_usuario: id_usuario
            }
        });
    } catch (error) {
        return res.status(400).json({
                error
            });
    }    
       
})
//registrarse comprueba si existe el usuario, y si no es asi lo crea
router.post("/register", async(req, res)=>{
    const {mail, password, name, last_name, dni} = req.body
    const exist = await users.findOne({where: { mail }});
    if (exist){
        return res
        .status(409)
        .json({error: "alredy exist an accoun with the given email"});
    }
    try {
        const user = await users.create({ name: name,last_name:last_name, mail:mail, dni:dni, password: password });
        res.json({
            user, attributes: {exclude:['password']}
        });
    } catch (error) {
        res.status(400).json({error});
    }
 
});
//loguearse si exite el token lo actualiza y si no lo crea, a parte de comprobar si existe el usuario
router.post("/login", async(req, res)=>{
    var jwt = require('jsonwebtoken');
    const {user_email, user_password} = req.body;
            try {
                const user = await users.findOne({where: { name: user_email, password: user_password }});
                const user_id = user.id;
                const tokenn = await Token.findOne({where: { id_usuario: user_id }});
                if(tokenn){
                    var jwt = require('jsonwebtoken');
                    var tokens = jwt.sign({sub: 'Ayesa' ,id_usuario: user.id, jit: tokenn.id}, 'Cl4vePr1vada2022*',{expiresIn:'1d'});
                    try {
                        await Token.update({
                            token: tokens,
                        }, 
                        {
                            where: {
                            id_usuario: user.id
                            }
                        });
                        return res.json({
                            accessToken: tokens,
                            id: user.id,
                            name: user.name + user.last_name,
                            empresa: "Ayesa"
                    });
                    }catch (error) {

                        return res.status(400).json({
                                error
                                });
                    }
                }else{
                    var jwt = require('jsonwebtoken');
                    var tokens = jwt.sign({sub: 'Ayesa' ,id_usuario: user.id}, 'Cl4vePr1vada2022*',{expiresIn:'1d'});
                    try {    
                      
                        await Token.create({  id_usuario:user.id, token:tokens });
                        return res.json({
                            accessToken: tokens,
                            id: user.id,
                            name: user.name +" " + user.last_name,
                            empresa: "Ayesa"
                        });
                    }catch (error) {

                        return res.status(400).json({
                                error
                                });
                    }
                }
            } catch (error) {
                return res.status(400).json({error});
            }
});



module.exports = router;
