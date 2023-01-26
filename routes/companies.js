const router = require("express").Router();
const { verify } = require("crypto");
const { hash } = require("./helpers/hash");
const { default: checkauth } = require("./middelware/checkauth");
const Companies = require("./models/companies ");

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
        error: "Error Server",
     });
}
})

//Actualizar 
router.put('/bureaus/:bureau_id/companies/:company_id',checkauth.isAccessTokenValid, async (req, res)=>{
    try{
        const {company_id}= req.params;
        const {company_certificate,company_fiscal_id,company_name,ssscheme_id,company_address,company_postal_code,company_city,state_id,
            country_code,company_phone,company_contact,company_email,company_status_id} = req.body

        const companies= await Companies.update({
        
        company_fiscal_id:company_fiscal_id,
        company_name: company_name,
        ssscheme_id:ssscheme_id,
        company_address:company_address,
        company_postal_code:company_postal_code,
        company_city:company_city,
        state_id:state_id,
        country_code:country_code,
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

        res.json({ "Compañia actualiza: ": companies })

        }
        catch (error) {
        return res.status(500).json({
            error: "Error Server",
         });
        }
})

//Añadir
router.post('/bureaus/:bureau_id/companies',checkauth.isAccessTokenValid, async (req, res)=>{
    try{
        const {bureau_id}= req.params;
        const {company_certificate,company_fiscal_id,company_name,ssscheme_id,company_address,company_postal_code,company_city,state_id,
            country_code,company_phone,company_contact,company_email,company_status_id} = req.body

        const companies= await Companies.create({
        bureau_id: bureau_id,
        company_fiscal_id:company_fiscal_id,
        company_name: company_name,
        ssscheme_id:ssscheme_id,
        company_address:company_address,
        company_postal_code:company_postal_code,
        company_city:company_city,
        state_id:state_id,
        country_code:country_code,
        company_phone:company_phone,
        company_contact:company_contact,
        company_email:company_email,
        company_status_id:company_status_id,
        company_certificate: company_certificate    
        }        
        )

        res.json({ "Compañia creada: ": companies })

        }
        catch (error) {
        return res.status(500).json({
            error: "Error Server",
         });
        }
})
//Eliminar
router.delete('/', async (req, res)=>{try{
    const {company_id} = req.params
    await Companies.destroy({where: { company_id }})
    //res.json({ companies })
    res.json({"Compañia eliminada": company_id})
    }
    catch (error) {
    return res.status(500).json({
        error: "Error Server",
     });
}
})

module.exports = router;
