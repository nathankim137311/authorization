const router = require('express').Router();
const verify = require('../middleware/verify');

router.get('/dashboard', verify, (req, res) => {
    res.status(200).send({ message: 'this is the dashboard' });
}); 

module.exports = router;