const { default: checkauth } = require("./middelware/checkauth");
const Companies = require("./models/companies");
const CompaniesAgreements = require("./models/companiesagreement");
const Agreements = require("./models/agreements");
const router = require("express").Router();

//mostrar todos los convenio
router.get('/', async (req, res)=>{
    const agreements = await Agreements.findAll({
    })
    res.json({ agreements })

})
//mostrar todos los convenio de una compania
router.get('/bureaus/:bureau_id/companies/:company_id/agreements',checkauth.isAccessTokenValid, async (req, res)=>{
    const company_id = req.params.company_id;
    var agreements = []
    try {
        const companies_agreements = await CompaniesAgreements.findAll({where: {company_id} })
        for (var i = 0; i < companies_agreements.length; i++) {
            const _agreements = await Agreements.findOne({where: { agreement_id:companies_agreements[i].agreement_id} })
            agreements = agreements.concat(_agreements);
        }
      
        agreements = agreements?.filter(Boolean)
        res.json({agreements});
    } catch (error) {
        console.log(error);
        res.json({error});
    }
  

})
router.post('/bureaus/:bureau_id/companies/:company_id/agreements',checkauth.isAccessTokenValid, async (req, res)=>{
    const company_id = req.params.company_id;
    const {agreement_id} = req.body;
    try {
        await CompaniesAgreements.create({company_id: company_id, agreement_id: agreement_id })
        res.json({msg: "convenio relacionado"});
    } catch (error) {
        res.json({error});
    }
  

})



module.exports = router;
