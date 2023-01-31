const router = require('express').Router();
const { auth } = require('../middleware/auth');
const adminRoute = require('./admins');
const consultationRoute = require('./consultations');
const telegram = require('./telegram');
const article = require('./articles');
const feedback = require('./feedback');
const price = require('./price');

router.use('/', adminRoute);
router.use('/consult', consultationRoute);
router.use('/telegram', telegram);
router.use('/article', article); 
router.use('/feedback', feedback); // можно защитить 'auth' прямо здесь
router.use('/price', price);

module.exports = router;