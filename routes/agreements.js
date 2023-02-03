const { default: checkauth } = require("./middelware/checkauth");
const Companies = require("./models/companies");
const CompaniesAgreements = require("./models/companiesagreement");


const router = require("express").Router();

router.get('/',checkauth.isAccessTokenValid, async (req, res)=>{
    const agreements = await Agreements.findAll({
    })
    res.json({ agreements })

})
router.get('/bureaus/:bureau_id/companies/:company_id/agreements',checkauth.isAccessTokenValid, async (req, res)=>{
    const company_id = req.params;
    try {
        const companies_agreements = await CompaniesAgreements.findOne({where: {company_id} })
        const agreement_id = companies_agreements.agreement_id;
        const agreements = await Agreements.findOne({where: { agreement_id} })
        res.json({agreements});
    } catch (error) {
        res.json({error});
    }
  

})
router.post('/bureaus/:bureau_id/companies/:company_id/agreements',checkauth.isAccessTokenValid, async (req, res)=>{
    const company_id = req.params;
    const agreement_id = req.body;
    try {
        await CompaniesAgreements.create({company_id: company_id, agreement_id: agreement_id })
        res.json({msg: "convenio relacionado"});
    } catch (error) {
        res.json({error});
    }
  

})



module.exports = router;
