const router = require("express").Router();
const { verify } = require("crypto");
const { hash } = require("./helpers/hash");
const { default: checkauth } = require("./middelware/checkauth");
const ContributionAccountCodes = require("./models/contributionaccountcodes");
const CompaniesAgreements = require("./models/companiesagreement");
const Agreements = require("./models/agreements");
const Companies = require("./models/companies");
const Postalcodes = require("./models/postalcodes");
const State = require("./models/state");

//routes
// obtener todas las compañias
router.get('/bureaus/:bureau_id/companies',checkauth.isAccessTokenValid, async (req, res)=>{
    const {bureau_id} = req.params
    try{
        const companies = await Companies.findAll({include:[Postalcodes,State]},{where: { bureau_id:bureau_id }})
        res.json({ companies })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                    error
                    });}
})
//obtener CCC Y Convenios por id de compañia
router.get('/bureaus/:bureau_id/companies/:company_id',checkauth.isAccessTokenValid, async (req, res)=>{
    const {company_id} = req.params
    var agreements =[]
    try{
        
        try {
            var $agreements = await CompaniesAgreements.findAll({where: { company_id:company_id }})
        } catch (error) {
            console.log(error);
        }
        try {
         
            for (var i = 0; i < $agreements.length; i++) {
                const agreement_id = $agreements[i].agreement_id;
                const _agreement = await Agreements.findAll({where: { agreement_id }})
                 agreements = _agreement.concat(agreements);
            }
            
        } catch (error) {
            console.log(error);
        }
        try{
            var contributionaccount = await ContributionAccountCodes.findAll({where: { company_id:company_id }})
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                    error
                    });
        }   
        agreements = agreements.filter(Boolean)
        res.json({agreements, contributionaccount})
    }catch (error) {
        console.log(error);
        return res.status(500).json({
            error
            });
    }
    
})

//Actualizar compañia por id
router.put('/bureaus/:bureau_id/companies/:company_id',checkauth.isAccessTokenValid, async (req, res)=>{
   
    const {company_id}= req.params;
    const {company_certificate,company_fiscal_id,company_name,ssscheme_id,company_address,postalcode_id,company_city,state_id,
            company_phone,company_contact,company_email,company_status_id,contributionaccount, agreements} = req.body
    try {

        const postalcodes = await Postalcodes.findOne({where: {postalcode_code:postalcode_id} });
  
        try{          
            await ContributionAccountCodes.destroy({where: { company_id }})
        }catch (error) {     
            return res.status(500).json({
                    error,
                    });
        }
        try{          
                const companiesagreements = await CompaniesAgreements.destroy({where: { company_id}})
            }catch (error) {         
                    return res.status(500).json({
                            error,
                            });
            }
            
            try {
                for (var i = 0; i < agreements.length; i++) {
                await CompaniesAgreements.create({company_id: company_id, agreement_id: agreements[i].agreement_id })
                }
            }catch (error) {             
                    return res.status(400).json({
                        error
                        });
            }
            try {
                for (var i = 0; i < contributionaccount.length; i++) {
                    var ccC = await ContributionAccountCodes.create({company_id: company_id, contributionaccountcode_code: contributionaccount[i].contributionaccountcode_code })
                }
                    
            } catch (error) {   
                    return res.status(400).json({
                        error
                            });
            }
            try{
                const companies= await Companies.update({                
                    company_fiscal_id:company_fiscal_id,
                    company_name: company_name,
                    ssscheme_id:ssscheme_id,
                    company_address:company_address,
                    postalcode_id:postalcodes.postalcode_id,
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
            
            }catch (error) {
                return res.status(500).json({
                        error
                        });
            }
        res.json({ msg:"Compañia actualizada: ", company_name:company_name })
    } catch (error) {
                
    }
})

//Añadir compañia
router.post('/bureaus/:bureau_id/companies',checkauth.isAccessTokenValid, async (req, res)=>{

    const {bureau_id}= req.params;
    const {company_certificate,company_fiscal_id,company_name,ssscheme_id,company_address,postalcode_id,company_city,state_id,
            company_phone,company_contact,company_email,company_status_id, contributionaccount,agreements} = req.body
    try {
        
        var postalcodes = await Postalcodes.findOne({where: {postalcode_code:postalcode_id} });
  
      
        try{ 
            var companies= await Companies.create({
                bureau_id: bureau_id,
                company_fiscal_id:company_fiscal_id,
                company_name: company_name,
                ssscheme_id:ssscheme_id,
                company_address:company_address,
                postalcode_id:postalcodes.postalcode_id,
                company_city:company_city,
                state_id:state_id,
                country_id:66,
                company_phone:company_phone,
                company_contact:company_contact,
                company_email:company_email,
                company_status_id:company_status_id,
                company_certificate: company_certificate    
            })
        }catch (error) {
            return res.status(400).json({
                    error
                    });
            
        }
            try {
                for (var i = 0; i < agreements.length; i++) {            
                    await CompaniesAgreements.create({company_id: companies.company_id, agreement_id: agreements[i].agreement_id })
                }
            } catch (error) {       
                return res.status(400).json({error});
            }
                try {     
                    for (var i = 0; i < contributionaccount.length; i++) {         
                        var ccC = await ContributionAccountCodes.create({company_id: companies.company_id, contributionaccountcode_code: contributionaccount[i].contributionaccountcode_code })
                    }     
                } catch (error) {    
                        return res.status(400).json({
                            error
                                });
                }
       
        return res.json({ msg: "Compañia creada: ", companies:companies, ccc:ccC })
    } catch (error) {
            
    }
       
})
//Eliminar compañia por id
router.delete('/bureaus/:bureau_id/companies/:company_id',checkauth.isAccessTokenValid, async (req, res)=>{
   const {bureau_id,company_id} = req.params
    try{   
        const contributionaccount = await ContributionAccountCodes.destroy({where: { company_id }})
    }catch (error) { 
        return res.status(500).json({
               error,
                });
   }
    try{
        const companiesagreements = await CompaniesAgreements.destroy({where: { company_id }})      
    }catch (error) {
        return res.status(500).json({
                error,
                });
    }
    try{
       const companies = await Companies.destroy({where: { company_id, bureau_id }})
        res.json({ msg: "Compañia eliminada " , company_id})
    
    }catch (error) {
        return res.status(500).json({
                error,
                });
    }
})

module.exports = router;
