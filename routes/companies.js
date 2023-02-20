const router = require("express").Router();
const { verify } = require("crypto");
const { hash } = require("./helpers/hash");
const { default: checkauth } = require("./middelware/checkauth");
const ContributionAccountCodes = require("./models/contributionaccountcodes");
const CompaniesAgreements = require("./models/companiesagreement");
const Agreements = require("./models/agreements");
const Companies = require("./models/companies");

//routes
//   /bureaus/{idBureau}/companies
router.get('/bureaus/:bureau_id/companies',checkauth.isAccessTokenValid, async (req, res)=>{
    const {bureau_id} = req.params
    try{
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
   
        const {company_id}= req.params.company_id;
        const {company_certificate,company_fiscal_id,company_name,ssscheme_id,company_address,postalcode_id,company_city,state_id,
            company_phone,company_contact,company_email,company_status_id,contributionaccountcode_id, contributionaccountcode_code,agreement_id} = req.body
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

       

        
        try{
            const contributionaccount= await ContributionAccountCodes.update({
            
                contributionaccountcode_code: contributionaccountcode_code
            },
            {
                where:{
                    company_id: company_id,
                    contributionaccountcode_id: contributionaccountcode_id, 
                }
            }
            )
    
    
            }
            catch (error) {
            return res.status(500).json({
                error
             });
             
            }
            try{
                const companiesagreement= await CompaniesAgreements.update({
                
                    agreement_id: agreement_id
                },
                {
                    where:{
                        company_id: company_id,
                        agreement_id: agreement_id
                    }
                }
                )
        
        
                }
                catch (error) {
                return res.status(500).json({
                    error
                 });
            }
            res.json({ msg:"Compañia actualizada: ", company_name:company_name, contributionaccountcode_id:contributionaccountcode_id })
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
            company_phone,company_contact,company_email,company_status_id, contributionaccountcode_code,agreement_id} = req.body
        
            try{
        console.log("1");
        const companies= await Companies.create({
        bureau_id: bureau_id,
        company_fiscal_id:company_fiscal_id,
        company_name: company_name,
        ssscheme_id:ssscheme_id,
        company_address:company_address,
        postalcode_id:postalcode_id,
        company_city:company_city,
        state_id:state_id,
        country_id:66,
        company_phone:company_phone,
        company_contact:company_contact,
        company_email:company_email,
        company_status_id:company_status_id,
        company_certificate: company_certificate    
        }        
        )
        console.log("2");
     
      
        try {
            console.log("5");
            await CompaniesAgreements.create({company_id: companies.company_id, agreement_id: agreement_id })
            try {
                for (var i = 0; i < contributionaccountcode_code.lenght; i++) {
                    var ccc = await ContributionAccountCodes.create({company_id: companies.company_id, contributionaccountcode_code: contributionaccountcode_code })
                  }
             
             } catch (error) {
                 console.log("4.5");
                 return res.status(400).json({
                   error
                });
             }
            console.log("6");
        } catch (error) {
            console.log("6.5");
            return res.status(400).json({error});
        }
        return res.json({ msg: "Compañia creada: ", companies:companies, ccc:ccc })
        }
        catch (error) {
        return res.status(400).json({
            error
         });
         
        }
       
})
//Eliminar
router.delete('/bureaus/:bureau_id/companies/:company_id',checkauth.isAccessTokenValid, async (req, res)=>{
   
    const {bureau_id,company_id} = req.params
    const {agreement_id,contributionaccountcode_id} = req.body
    try{
       const companies = await Companies.destroy({where: { company_id, bureau_id }})
        //res.json({ companies })
        
     try{
        const companiesagreements = await CompaniesAgreements.destroy({where: { company_id,agreement_id }})
         //res.json({ companies })
     }
     catch (error) {
         return res.status(500).json({
             error,
         });
    }
    try{
        const contributionaccount = await ContributionAccountCodes.destroy({where: { company_id,contributionaccountcode_id }})
         //res.json({ companies })
         
     }
     catch (error) {
         return res.status(500).json({
             error,
         });
    }
    res.json({ msg: "Compañia eliminada " , company_id})
}
    catch (error) {
        return res.status(500).json({
            error,
        });
}
})

module.exports = router;
