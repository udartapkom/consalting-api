const router = require('express').Router(); 
const { 
    createPrice,
    deletePrice,
    updatePrice,
    getPriceById,
    getAllPrices
} = require('../controllers/price');
const { auth } = require('../middleware/auth');

router.post('/', auth, createPrice); // все роуты нужно защитить "auth" кроме получения всего прайса
router.patch('/update', auth, updatePrice);
router.delete('/delete', auth, deletePrice);
router.get('/getone', auth, getPriceById);
router.get('/', getAllPrices);

module.exports = router;