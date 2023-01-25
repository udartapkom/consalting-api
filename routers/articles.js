const router = require('express').Router(); 
const { 
    createArticle,
    updateArticle,
    deleteArticle,
    getAllArticles
} = require('../controllers/articles');
const { auth } = require('../middleware/auth');

router.post('/', auth, createArticle); // все роуты нужно защитить "auth", кроме получения всех материалов
router.patch('/update', auth, updateArticle);
router.delete('/delete', auth, deleteArticle);
router.get('/', getAllArticles);

module.exports = router;