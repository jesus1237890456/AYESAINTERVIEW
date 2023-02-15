const nodemailer = require("nodemailer");
const { default: checkauth } = require("./middelware/checkauth");
const router = require("express").Router();
const User = require("./models/users");
const Invitation = require("./models/invitations")


router.post('/', async (req, res)=>{
    const transporter = nodemailer.createTransport({
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
    const correousuario = req.body.email;
    const password = req.body.password;
  
        try {
            const user = await User.findOne({ where: {user_email: correousuario}});
        console.log(user)
         const invitation = await Invitation.findOne({where:{user_id: user.user_id}});
         console.log(invitation.invitation_token);
         const URL = "http//localhost:4200/activate/"+correousuario+"/"+user.user_full_name+"/"+invitation.invitation_token+"";
         console.log(URL);
            const alta = await transporter.sendMail({
                from: '"A3Satel" <j.cueto@a3satel.com>',
                to: correousuario,
                subject: "Formulario de registro",
                text: "el cuerpo de la prueba",
                html:"<h4>Bienvenido a Grupo A3Satel.</h4><p>Acabas de registrar una cuenta en nuestro producto Afilia3 como "+correousuario+".</p> <p>Para activar la cuenta por favor, pulsa el siguiente botón:</p><p><button><a href="+URL+">Formulario</a></button></p><p>Si no puede hacer clic en el botón, por favor, copie y pegue la siguiente dirección en la barra de su navegador web de preferencia:</p><p>"+URL+"</p><p>Atentamente,</p><p>A3Satel</p>"
                ,
                headers: {'x-myheader': 'test header'}
            });
            return res.json(); 
        } catch (error) {
            res.status(400).json({error})
        }
        
       
   })
   router.post('/activation',checkauth.isAccessTokenValid, async (req, res)=>{
    console.log("1");
    const transporter = nodemailer.createTransport({
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
    console.log("2");
    const correousuario = req.body.email;
    const password = req.body.password;
    const {user_full_name } = req.body;
    const URL = "http//localhost:4200";
        try {
            const user = await User.findOne({ where: {user_email: correousuario}});
            console.log("3");
            await User.update({
                status_id: 2,
                user_password: password
            }, 
            {
                where: {
                    user_id: user.user_id,
                }});
        } catch (error) {
            res.status(400).json({error})
        }
       try {
        console.log("4");
        const user = await User.findOne({ where: {user_email: correousuario}});
           const user_id = user.user_id;
        await Invitation.update({
            invitation_code: "",
        }, 
        {
            where: {
                user_id: user_id
            }
        });
       } catch (error) {
        res.status(400).json({error});
       }
       try{
        console.log("5");
        const alta = await transporter.sendMail({
            from: '"A3Satel" <j.cueto@a3satel.com>',
            to: correousuario,
            subject: "Formulario de registro",
            text: "el cuerpo de la prueba",
            html:"<h4>Gracias "+user_full_name+" por activar tu cuenta.</h4><p>Ya puedes acceder a Afilia3 con la contraseña que hayas informado en el formulario de registro y con tu email:.</p> <p>"+correousuario+"<p>Atentamente,</p><p>A3Satel</p><p><button><a href="+URL+">Afilia3</a></button></p>"
            ,
            headers: {'x-myheader': 'test header'}
        });
        console.log("6");
        return res.json(); 
    } catch (error) {
        res.status(400).json({error})
    }
    
   
})


module.exports = router;