const { default: checkauth } = require("./middelware/checkauth");
const Postalcodes = require("./models/postalcodes");
const State = require("./models/state");
const Countries = require("./models/countries");
const router = require("express").Router();

//obtener postalcode
router.get('/:postalcode_code',checkauth.isAccessTokenValid, async (req, res)=>{
    const {postalcode_code} = req.params;

    try {
        const postalcodes = await Postalcodes.findOne({where: {postalcode_code:postalcode_code} });
        const state_id = postalcodes.state_id;
        const state = await State.findOne({where: {state_id} });
        res.json({
            state_name: state.state_name,
            postalcode_name: postalcodes.postalcode_name,
            state_id: state_id
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
                error
            })
    }
})
//obtener postalcode_code
router.get('/:postalcode_id/code',checkauth.isAccessTokenValid, async (req, res)=>{
    const {postalcode_id} = req.params;
    
    try {
        const postalcodes = await Postalcodes.findOne({where: {postalcode_id:postalcode_id} });
        const state_id = postalcodes.state_id;
        const state = await State.findOne({where: {state_id} });
        res.json({
            state_name: state.state_name,
            postalcode_name: postalcodes.postalcode_name,
            state_id: state_id,
            postalcode_code: postalcodes.postalcode_code
        })
    } catch (error) {
        console.log("pos",postalcode_id)
        console.log(error)
        res.status(400).json({
                error
            })
    }
})

module.exports = router;
