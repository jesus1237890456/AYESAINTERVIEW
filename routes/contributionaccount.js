const { default: checkauth } = require("./middelware/checkauth");
const ContributionAccountCodes = require("./models/contributionaccountcodes");
const router = require("express").Router();

router.get('/bureaus/:bureau_id/companies/:company_id/contributionaccount',checkauth.isAccessTokenValid, async (req, res)=>{
   const company_id = req.params;
   const contributionaccount = await ContributionAccountCodes.findOne({where: {company_id}})
res.json({ contributionaccount })

})

router.post('/bureaus/:bureau_id/companies/:company_id/contributionaccount',checkauth.isAccessTokenValid, async (req, res)=>{
   const company_id = req.params;
   const {contributionaccountcode_id, contributionaccountcode_code} = req.body;
   await Invitation.create({company_id: company_id, contributionaccountcode_id: contributionaccountcode_id, contributionaccountcode_code: contributionaccountcode_code })
res.json({ msg:"ccc relacionado" })

})

module.exports = router;
