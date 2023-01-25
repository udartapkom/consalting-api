const router = require('express').Router(); 
const { telegramBot } = require('../controllers/telegram')

router.post('/', telegramBot); // На данный момент отправляем только уведомления

module.exports = router;