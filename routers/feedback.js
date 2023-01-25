const router = require('express').Router(); 
const { 
    createFeedback,
    updateFeedback,
    deleteFeedback,
    getAllFeedback
} = require('../controllers/feedback');
const { auth } = require('../middleware/auth');

router.post('/', auth, createFeedback); // все роуты нужно защитить "auth" кроме получения всех отзывов
router.patch('/update', auth, updateFeedback);
router.delete('/delete', auth, deleteFeedback);
router.get('/', getAllFeedback);

module.exports = router;