const router = require('express').Router(); 
const { 
    createConsultation, 
    updateConsultation, 
    toArchiveConsultation,
    getNonArchiveConsultation ,
    getOnlyArchiveConsultation
} = require('../controllers/consultation');
const { auth } = require('../middleware/auth');

router.post('/create', createConsultation);
router.patch('/update', auth, updateConsultation);
router.patch('/arc', auth, toArchiveConsultation); // "arc" - одинаковы, потому что запросы разные
router.get('/notarc', auth, getNonArchiveConsultation);
router.get('/arc', auth, getOnlyArchiveConsultation);

module.exports = router;