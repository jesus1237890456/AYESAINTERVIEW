const router = require("express").Router();
const { verify } = require("crypto");
const { hash } = require("./helpers/hash");
const { default: checkauth } = require("./middelware/checkauth");
const User = require("./models/users");
const Invitation = require("./models/invitations");
const nodemailer = require("nodemailer");

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
    const {bureau_id,user_full_name,user_phone,user_email,user_observation,rol_id,status_id} = req.body
    const $URLAlternative = "http://localhost:4200/users/activate/"+user_email+"/"+user_full_name+"";
    const URLAlternative = $URLAlternative.replace(/\s+/g,'%20').trim();
    const user_password = "invitado"
    const exist = await User.findOne({where: { user_email }});
    if (exist){
        return res
        .status(409)
        .json({error: "alredy exist an accoun with the given email"});
    }else{
        try {
           
            const usercreate = await User.create({bureau_id: bureau_id,user_full_name: user_full_name,user_phone: user_phone,
                user_email: user_email,user_observation: user_observation,rol_id: rol_id,status_id: status_id,user_password: user_password});
            res.json({
                user_id: usercreate.user_id
            });
            var transporter = nodemailer.createTransport({
                host: "smtp.office365.com",
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                    user: "j.cueto@a3satel.com",
                    pass: "Pokemons12*"
                },
                logger: true
            });
                var jwt = require('jsonwebtoken');
                const token = jwt.sign({sub: 'A3SATEL' ,user_id: usercreate.user_id, bureau_id: bureau_id, rol_id: usercreate.rol_id }, 'Cl4vePr1vada2022*',{expiresIn:'60000'});
                console.log("1");                 
                        try { 
                            try {
                                await Invitation.create({user_id: usercreate.user_id, invitation_token: token }); 
                            } catch (error) {
                                res.status(400).json({error})
                            }
                                console.log("2.7");
                              
                             const invitation = await Invitation.findOne({where:{user_id: usercreate.user_id}});
                             console.log(invitation.invitation_token);
                            
                             const $URL = "http:////localhost:4200/users/activate/"+user_email+"/"+user_full_name+"";
                             const URL = $URL.replace(/\s+/g,'%20').trim();
                             console.log(URL);
                            
                             console.log("2.8");
                             const invitation_token = "/"+invitation.invitation_token+"";
                             
                             console.log("2.9");
                                const alta = await transporter.sendMail({
                                    from: '"A3Satel" <j.cueto@a3satel.com>',
                                    to: user_email,
                                    subject: "Formulario de registro",
                                    text: "el cuerpo de la prueba",
                                    html:"<h4>Bienvenido a Grupo A3Satel.</h4><p>Acabas de registrar una cuenta en nuestro producto Afilia3 como "+user_email+".</p> <p>Para activar la cuenta por favor, pulsa el siguiente botón:</p><p><button><a href="+URL+invitation_token+">Formulario de ingreso</a></button></p><p>Si no puede hacer clic en el botón, por favor, copie y pegue la siguiente dirección en la barra de su navegador web de preferencia:</p><p>"+URLAlternative+invitation_token+"</p><p>Atentamente,</p><p>A3Satel</p>"
                                    ,
                                    headers: {'x-myheader': 'test header'}
                                });
                            } catch (error) {
                                console.log("2.10");
                                res.status(400).json({error})
                            }
                            
        } catch (error) {
            res.status(400).json({error})
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
        res.status(400).json({error});
    }
   
});

router.post('/bureaus/:bureau_id/invitation',checkauth.isAccessTokenValid, async(req, res)=>{
    const {bureau_id} = req.params;
    const {user_id} = req.body;
    const correousuario = req.body.email;
        const user = await User.findOne({where: { user_id, bureau_id }});
        var transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: "j.cueto@a3satel.com",
                pass: "Pokemons12*"
            },
            logger: true
        });
        if(user){ 
            var jwt = require('jsonwebtoken');
            var token = jwt.sign({sub: 'A3SATEL' ,user_id: user_id, bureau_id: bureau_id, rol_id: user.rol_id }, 'Cl4vePr1vada2022*',{expiresIn:'60000'});
            console.log("1");
            try {
                const invitation = await Invitation.findOne({where: { user_id }});
                if(invitation){
                    try {
                        console.log("2");
                        await Invitation.update({
                            invitation_code: token,
                        }, 
                        {
                            where: {
                                user_id: user_id
                            }
                        });
                    } catch (error) {
                        console.log("2.5");
                        res.status(400).json({error});
                    }
                    console.log("2.6");
                 
                  
                        try { 
                            console.log("2.7");
                            const user = await User.findOne({ where: {user_email: correousuario}});
                        console.log(user)
                         const invitation = await Invitation.findOne({where:{user_id: user.user_id}});
                         console.log(invitation.invitation_token);
                         const $URL = "http:////localhost:4200/users/activate/"+correousuario+"/"+user.user_full_name+"";
                         const URL = $URL.replace(/\s+/g,'%20').trim();
                         const URLAlternative = "http:////localhost:4200/users/activate/"+correousuario+"/"+user.user_full_name+"";
                         const invitation_token = "/"+invitation.invitation_token+"";
                         console.log(URL);
                            const alta = await transporter.sendMail({
                                from: '"A3Satel" <j.cueto@a3satel.com>',
                                to: correousuario,
                                subject: "Formulario de registro",
                                text: "el cuerpo de la prueba",
                                html:"<h4>Bienvenido a Grupo A3Satel.</h4><p>Acabas de registrar una cuenta en nuestro producto Afilia3 como "+correousuario+".</p> <p>Para activar la cuenta por favor, pulsa el siguiente botón:</p><p><button><a href="+URL+invitation_token+">Formulario de ingreso</a></button></p><p>Si no puede hacer clic en el botón, por favor, copie y pegue la siguiente dirección en la barra de su navegador web de preferencia:</p><p>"+URLAlternative+invitation_token+"</p><p>Atentamente,</p><p>A3Satel</p>"
                                ,
                                headers: {'x-myheader': 'test header'}
                            });
                            return res.json(); 
                        } catch (error) {
                            console.log("2.8");
                            res.status(400).json({error})
                        }
                        
                    
                 }else{
                    try {
                        console.log("3");
                        await Invitation.create({user_id: user_id, invitation_token: token });
                    } catch (error) {
                        console.log("3.5");
                        res.status(400).json({error})
                    }
                 
                      
                      
                            try {
                                const user = await User.findOne({ where: {user_email: correousuario}});
                            console.log(user)
                             const invitation = await Invitation.findOne({where:{user_id: user.user_id}});
                             console.log(invitation.invitation_token);
                             const URL = "http//localhost:4200/activate/"+correousuario+"/"+user.user_full_name+"";
                             const invitation_token = "/"+invitation.invitation_token+"";
                             console.log(URL);
                                const alta = await transporter.sendMail({
                                    from: '"A3Satel" <j.cueto@a3satel.com>',
                                    to: correousuario,
                                    subject: "Formulario de registro",
                                    text: "el cuerpo de la prueba",
                                    html:"<h4>Bienvenido a Grupo A3Satel.</h4><p>Acabas de registrar una cuenta en nuestro producto Afilia3 como "+correousuario+".</p> <p>Para activar la cuenta por favor, pulsa el siguiente botón:</p><p><button><a href="+URL+invitation_token+">Formulario de ingreso</a></button></p><p>Si no puede hacer clic en el botón, por favor, copie y pegue la siguiente dirección en la barra de su navegador web de preferencia:</p><p>"+URL+invitation_token+"</p><p>Atentamente,</p><p>A3Satel</p>"
                                    ,
                                    headers: {'x-myheader': 'test header'}
                                });
                                return res.json(); 
                            } catch (error) {
                                res.status(400).json({error})
                            }
                 }
              
            } catch (error) {
                res.status(400).json({error});
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
        res.status(400).json({error});
    }
 
});
router.delete("/bureaus/:bureau_id/users",async(req, res)=>{
    const {bureau_id} = req.params;
    const {user_id} = req.body;
   
        const user = await User.findOne({where: { user_id, bureau_id }});
        if (user){
            if(user.rol_id === 1){  
                try {
                    await Invitation.destroy({ where:{user_id }})
                    await User.destroy({ where:{user_id, bureau_id }})
                    res.status(204).json({
                        msg: "user deleted"
                    });
                    
                } catch (error) {
                    res.status(400).json({error});
                }
            }else{
                const user = await User.update({
                    status_id: 3,
                }, 
                {
                    where: {
                        user_id: user_id,
                        bureau_id: bureau_id
                    }
                });
                res.json({
                    msg: "user inactived"
                });
            }
           
        }else{
            res.status(400).json({
                msg: "user don't exist"
            });
        }
   
   
  
});


module.exports = router;
