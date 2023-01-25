const Article = require('../models/articles');

const createArticle = (req, res, next) => {  //создаём материал
    const { title, text, image, subtitle } = req.body;
    if(!title || !text) {
        res.status(400).send("Невозможно создать материал")
    }
    Article.create({
        title,
        text,
        image,
        subtitle
    })
    .then((material) => {
        Article.findById(material._id)
            .then((data) => {
                res.send(data)
            })
    })
    .catch((error) => {
        res.status(500).send('Ошибка создания материала');
    })
}

const updateArticle = (req, res, next) => { //обновить материал
    const {id, title, text, image, subtitle } = req.body; 
    if(!id || !title || !text || !image || !subtitle) {
        res.status(400).send("Невозможно обновить материал")
    }
    Article.findByIdAndUpdate(id, {title, text, image, subtitle})
    .then((material) => {
        Article.findById(material._id)
            .then((data) => {
                res.send(data)
            })
    })
    .catch((error) => {
        res.status(500).send('Ошибка обновления материала');
    })
}

const deleteArticle = (req, res, next) => { //удалить мтериал
    const { id } =req.body;
    if(!id){
        res.status(400).send("Невозможно удалить материал")
    }
    Article.findByIdAndDelete(id)
        .then((material) => {
            res.send(material)
        })
        .catch((error) => {
            res.status(500).send('Ошибка удаления материала');
        })
}

const getAllArticles = (req, res, next) => { //получить все материалы
    Article.find({})
        .then((data) => {
            res.send(data)
        })
        .catch((error) => {
            res.status(500).send('Ошибка получения материалов');
        })
}
module.exports = {
    createArticle,
    updateArticle,
    deleteArticle,
    getAllArticles
}