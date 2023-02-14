const nodemailer = require("nodemailer");
const { default: checkauth } = require("./middelware/checkauth");
const router = require("express").Router();
const User = require("./models/users");
const Invitation = require("./models/invitations")

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
router.get('/', async (req, res)=>{
       
        const correousuario = req.body.mail;
        const password = req.body.password;
        console.log(correousuario);
        console.log(password);
        try {
           const user = await User.findOne({ where: {user_email: correousuario}});
           const user_id = user.user_id;
            const invitation = await Invitation.findOne({where:{user_id}});
            const URL = "http//localhost:4200/activate/"+correousuario+"/"+user.user_full_name+"/"+invitation.invitation_code+"";
            const alta = await transporter.sendMail({
                from: '"A3Satel" <j.cueto@a3satel.com>',
                to: correousuario,
                subject: "Formulario de registro",
                text: "el cuerpo de la prueba",
                html:"<h4>Bienvenido"+user.user_full_name+" a Grupo A3Satel.</h4><p>Acabas de registrar una cuenta en nuestro producto Afilia3 como "+correousuario+".</p> <p>Para activar la cuenta por favor, pulsa el siguiente botón:</p><p><button><a href="+URL+"></a></button></p><p>Si no puede hacer clic en el botón, por favor, copie y pegue la siguiente dirección en la barra de su navegador web de preferencia:</p><p>"+URL+"</p><p>Atentamente,</p><p>A3Satel</p>"
                ,
                headers: {'x-myheader': 'test header'}
            });
            return res.json(alta.response); 
        } catch (error) {
            res.json({error})
        }
        
       
   })
   router.get('/password', async (req, res)=>{
       
    const {correousuario,password,user_full_name } = req.body;
    try {
        try {
            await User.update({
                status_id: 2,
                user_password: password
            })
        } catch (error) {
            res.json({error})
        }
       try {
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
        res.json({error});
       }
        const URL = "http//localhost:4200";
        const alta = await transporter.sendMail({
            from: '"A3Satel" <j.cueto@a3satel.com>',
            to: correousuario,
            subject: "Formulario de registro",
            text: "el cuerpo de la prueba",
            html:"<h4>Gracias"+user_full_name+" por activar tu cuenta.</h4><p>Ya puedes acceder a Afilia3 con la contraseña que hayas informado en el formulario de registro y con tu email:.</p> <p>"+correousuario+"<p>Atentamente,</p><p>A3Satel</p><p><button><a href="+URL+"></a></button></p>"
            ,
            headers: {'x-myheader': 'test header'}
        });
        return res.json(alta.response); 
    } catch (error) {
        res.json({error})
    }
    
   
})


module.exports = router;