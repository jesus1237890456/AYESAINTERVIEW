const nodemailer = require("nodemailer");
const { default: checkauth } = require("./middelware/checkauth");
const router = require("express").Router();
const User = require("./models/users");
const Invitation = require("./models/invitations")

//enviar confirmacion de usuario(formulario password)
router.post('/activation',checkauth.isAccessTokenValid, async (req, res)=>{
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
    const {user_full_name } = req.body;
    const URL = "http:////localhost:4200";
    try {
        const user = await User.findOne({ where: {user_email: correousuario}});
        await User.update({
            status_id: 2,
            user_password: password
        }, 
        {
            where: {
                user_id: user.user_id,
            }
        });
    } catch (error) {
        res.status(400).json({error})
    }
    try {
        const user = await User.findOne({ where: {user_email: correousuario}});
        var user_id = user.user_id;
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
        const alta = await transporter.sendMail({
            from: '"A3Satel" <j.cueto@a3satel.com>',
            to: correousuario,
            subject: "Formulario de registro",
            text: "el cuerpo de la prueba",
            html:"<h4>Gracias "+user_full_name+" por activar tu cuenta.</h4><p>Ya puedes acceder a Afilia3 con la contraseña que hayas informado en el formulario de registro y con tu email:.</p> <p>"+correousuario+"<p>Atentamente,</p><p>A3Satel</p><p><button><a href="+URL+">Afilia3</a></button></p>"
            ,
            headers: {'x-myheader': 'test header'}
        }); 
    } catch (error) {
        res.status(400).json({error})
    }
    try {
        await Invitation.destroy({ where:{user_id }})
    } catch (error) {
        
    }
})


module.exports = router;