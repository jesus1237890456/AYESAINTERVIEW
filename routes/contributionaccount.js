const { default: checkauth } = require("./middelware/checkauth");
const ContributionAccountCodes = require("./models/contributionaccountcodes");
const router = require("express").Router();

//obtener el ccc de una compañia
router.get('/bureaus/:bureau_id/companies/:company_id/contributionaccount',checkauth.isAccessTokenValid, async (req, res)=>{
   const {company_id} = req.params;
   try {
      const contributionaccount = await ContributionAccountCodes.findOne({where: {company_id}})
      res.json({ contributionaccount })
   } catch (error) {
      res.status(400).json({error})  
   }
})
//crear ccc
router.post('/bureaus/:bureau_id/companies/:company_id/contributionaccount',checkauth.isAccessTokenValid, async (req, res)=>{
   const company_id = req.params.company_id;
   const {contributionaccountcode_id, contributionaccountcode_code} = req.body;
   try {
      const ccc = await ContributionAccountCodes.create({company_id: company_id, contributionaccountcode_id: contributionaccountcode_id, contributionaccountcode_code: contributionaccountcode_code })
      res.json({ msg: "Compañia creada: ", ccc })
   } catch (error) {
      return res.status(400).json({
            error
            });
   }
})

module.exports = router;
