const { default: checkauth } = require("./middelware/checkauth");
const Bureau = require("./models/bureau");
const BureauStatus = require("./models/bureau status");
const router = require("express").Router();

router.get('/:bureau_id', async (req, res)=>{
    const {bureau_id} = req.params
    try {
        const bureau = await Bureau.findOne({include:[BureauStatus], where: {bureau_id:bureau_id}})
        res.json({ bureau }) 
    } catch (error) {
        return res.status(400).json({
                error: error,
            });
    }

})
router.get('/', async (req, res)=>{
    const {bureau_id} = req.params
    try {
        const bureau = await Bureau.findAll()
        res.json({ bureau }) 
    } catch (error) {
        return res.status(400).json({
                error: error,
            });
    }

})



module.exports = router;
