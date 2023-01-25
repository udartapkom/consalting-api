const router = require('express').Router(); 
const { createAdmin, loginAdmin, getCurrentUser } = require('../controllers/admins');
const { auth } = require('../middleware/auth');

router.post('/signup', auth, createAdmin) //только зарегистрированный админ может создать админа. т.е. нужно добавить middleware "auth"
router.post('/signin', loginAdmin);
router.get('/me', auth, getCurrentUser);

module.exports = router;