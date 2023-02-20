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
router.get('/bureaus/:bureau_id/companies/:company_id',checkauth.isAccessTokenValid, async (req, res)=>{
    const {company_id} = req.params
    try{
        const agreements = await CompaniesAgreements.findAll({where: { company_id:company_id }})
        try{
            var contributionaccount = await ContributionAccountCodes.findAll({where: { company_id:company_id }})
            }
            catch (error) {
                return res.status(500).json({
                    error
                });
            }   
        res.json({agreements, contributionaccount})
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
            company_phone,company_contact,company_email,company_status_id,ccc, convenios} = req.body
  

            try{
                console.log("1")
                for (var i = 0; i < ccc.length; i++) {
                 await ContributionAccountCodes.destroy({where: { company_id,contributionaccountcode_id: ccc[i].contributionaccountcode_id }})
                 //res.json({ companies })
                }
                 console.log("2")
             }catch (error) {
                console.log("3")
                return res.status(500).json({
                    error,
                });
           }
           try{
            for (var i = 0; i < convenios.length; i++) {
                const companiesagreements = await CompaniesAgreements.destroy({where: { company_id,agreement_id: convenios[i].agreement_id }})
                //res.json({ companies })
                console.log("5")
                }
            }catch (error) {
                console.log("6")
                return res.status(500).json({
                    error,
                });
            }
        
            try {
                console.log("5");
                console.log(convenios)
                for (var i = 0; i < convenios.length; i++) {
                    console.log("5.5");
                    console.log(convenios)
                await CompaniesAgreements.create({company_id: company_id, agreement_id: convenios[i].agreement_id })
                }
            }catch (error) {
                    console.log("4.5");
                    return res.status(400).json({
                      error
                   });
                }
                try {
                    console.log("5.5");
                    console.log(ccc.length);
                    for (var i = 0; i < ccc.length; i++) {
                        console.log("5.6")
                        var ccC = await ContributionAccountCodes.create({company_id: company_id, contributionaccountcode_code: ccc[i].contributionaccountcode_code })
                      }
                 
                 } catch (error) {
                     console.log("4.5");
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
            res.json({ msg:"Compañia actualizada: ", company_name:company_name })
        }
        catch (error) {
        return res.status(500).json({
            error
         });
        }
})

//Añadir
router.post('/bureaus/:bureau_id/companies',checkauth.isAccessTokenValid, async (req, res)=>{

        const {bureau_id}= req.params;
        const {company_certificate,company_fiscal_id,company_name,ssscheme_id,company_address,postalcode_id,company_city,state_id,
            company_phone,company_contact,company_email,company_status_id, ccc,convenios} = req.body
        console.log(ccc);
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
            console.log(convenios)
            for (var i = 0; i < convenios.length; i++) {
                console.log("5.5");
                console.log(convenios)
            await CompaniesAgreements.create({company_id: companies.company_id, agreement_id: convenios[i].agreement_id })
            }
            try {
                console.log("5.5");
                console.log(ccc.length);
                for (var i = 0; i < ccc.length; i++) {
                    console.log("5.6")
                    var ccC = await ContributionAccountCodes.create({company_id: companies.company_id, contributionaccountcode_code: ccc[i].contributionaccountcode_code })
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
        return res.json({ msg: "Compañia creada: ", companies:companies, ccc:ccC })
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
    const {ccc, convenios} = req.body
    try{
        console.log("1")
        for (var i = 0; i < ccc.length; i++) {
        const contributionaccount = await ContributionAccountCodes.destroy({where: { company_id }})
         //res.json({ companies })
        }
         console.log("2")
     }catch (error) {
        console.log("3")
        return res.status(500).json({
            error,
        });
   }
     try{
        console.log("4")
        for (var i = 0; i < convenios.length; i++) {
        const companiesagreements = await CompaniesAgreements.destroy({where: { company_id }})
         //res.json({ companies })
         console.log("5")
        }
     }catch (error) {
        console.log("6")
        return res.status(500).json({
            error,
        });
   }
    try{
        console.log("7")
       const companies = await Companies.destroy({where: { company_id, bureau_id }})
        //res.json({ companies })
        
     
     
    
     
    res.json({ msg: "Compañia eliminada " , company_id})
    console.log("8")
}
    catch (error) {
        console.log("9")
        return res.status(500).json({
            error,
        });
}
})

module.exports = router;
