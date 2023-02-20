const { default: checkauth } = require("./middelware/checkauth");
const Postalcodes = require("./models/postalcodes");
const State = require("./models/state");
const Countries = require("./models/countries");
const router = require("express").Router();


router.get('/:postalcode_code', async (req, res)=>{
    const {postalcode_code} = req.params;
   
    try {
        console.log(postalcode_code)
        const postalcodes = await Postalcodes.findOne({where: {postalcode_code:postalcode_code} });
        const state_id = postalcodes.state_id;
        const state = await State.findOne({where: {state_id} });
        // const country_id = state.country_id;
        // const countries = await Countries.findOne({where: {country_id} });
        res.json({
            state_name: state.state_name,
            postalcode_name: postalcodes.postalcode_name
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
  

})



module.exports = router;
