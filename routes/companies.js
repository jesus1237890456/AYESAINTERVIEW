const router = require("express").Router();
const { verify } = require("crypto");
const { hash } = require("./helpers/hash");
const { default: checkauth } = require("./middelware/checkauth");
const Companies = require("./models/companies");

//routes
//   /bureaus/{idBureau}/companies
router.get('/bureaus/:bureau_id/companies',checkauth.isAccessTokenValid, async (req, res)=>{
    try{
    const {bureau_id} = req.params
    const companies = await Companies.findAll({where: { bureau_id }})
    res.json({ companies })
    }
    catch (error) {
    return res.status(500).json({
        error
     });
}
})

//Actualizar 
router.put('/bureaus/:bureau_id/companies/:company_id',checkauth.isAccessTokenValid, async (req, res)=>{
   
        const {company_id}= req.params;
        const {company_certificate,company_fiscal_id,company_name,ssscheme_id,company_address,postalcode_id,company_city,state_id,
            company_phone,company_contact,company_email,company_status_id} = req.body
    try{
        const companies= await Companies.update({
        
        company_fiscal_id:company_fiscal_id,
        company_name: company_name,
        ssscheme_id:ssscheme_id,
        company_address:company_address,
        postalcode_id:postalcode_id,
        company_city:company_city,
        state_id:state_id,
        country_id:1,
        company_phone:company_phone,
        company_contact:company_contact,
        company_email:company_email,
        company_status_id:company_status_id,
        company_certificate: company_certificate
        },
        {
            where:{
                company_id: company_id
            }
        }
        )

        res.json({ msg:"Compañia actualizada: "+ company_name })

        }
        catch (error) {
        return res.status(500).json({
            error
         });
        }
})

//Añadir
router.post('/bureaus/:bureau_id/companies', async (req, res)=>{

        const {bureau_id}= req.params;
        const {company_certificate,company_fiscal_id,company_name,ssscheme_id,company_address,postalcode_id,company_city,state_id,
            company_phone,company_contact,company_email,company_status_id} = req.body
     try{
        const companies= await Companies.create({
        bureau_id: bureau_id,
        company_fiscal_id:company_fiscal_id,
        company_name: company_name,
        ssscheme_id:ssscheme_id,
        company_address:company_address,
        postalcode_id:postalcode_id,
        company_city:company_city,
        state_id:state_id,
        country_id:1,
        company_phone:company_phone,
        company_contact:company_contact,
        company_email:company_email,
        company_status_id:company_status_id,
        company_certificate: company_certificate    
        }        
        )

        res.json({ msg: "Compañia creada: ", companies })

        }
        catch (error) {
        return res.json({
            error
         });
        }
})
//Eliminar
router.delete('/bureaus/:bureau_id/companies/:company_id/delete',checkauth.isAccessTokenValid, async (req, res)=>{
   
    const {bureau_id,company_id} = req.params
    try{
        await Companies.destroy({where: { company_id, bureau_id }})
        //res.json({ companies })
        res.json({ msg: "Compañia eliminada " , company_id})
    }
    catch (error) {
        return res.status(500).json({
            error,
        });
}
})

module.exports = router;
