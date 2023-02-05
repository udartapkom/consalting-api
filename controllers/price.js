const Price = require('../models/price');
const { ConflictErr, BadRequestErr } = require('../errors/index');

function createPrice(req, res, next) { //создать запись
    const { title, titleShow,  subtitle, service } = req.body
    if (!title || !subtitle) {
        res.status(400).send("Невозможно создать прайс")
        throw new BadRequestErr(ERR_MSG.BAD_REQUEST);
    }
    Price.create({
        title,
	titleShow,
        subtitle,
        service
    })
        .then((price) => {
            Price.findById(price._id)
                .then((data) => {
                    res.send(data)
                })
        })
        .catch((error) => {
            res.status(500).send('Ошибка создания прайса');
        })
}

function deletePrice(req, res, next) { //удалить запись прайса
    const { id } = req.body
    if (!id) {
        res.status(400).send("Невозможно удалить!")
        throw new BadRequestErr(ERR_MSG.BAD_REQUEST);
    }
    Price.findByIdAndDelete(id)
        .then((price) => {
            res.send(price)
        })
        .catch((error) => {
            res.status(500).send('Ошибка удаления прайса');
        })
}

const updatePrice = (req, res, next) => { //обновить прайс
    const {id, title, subtitle } = req.body; 
    if(!id || !title || !subtitle) {
        res.status(400).send("Невозможно обновить прайс")
    }
    Price.findByIdAndUpdate(id, {title, subtitle})
    .then((price) => {
        Price.findById(price._id)
            .then((data) => {
                res.send(data)
            })
    })
    .catch((error) => {
        res.status(500).send('Ошибка обновления прайса');
    })
}

const getAllPrices = (req, res, next) => { //получить весь прайс
    Price.find({}).sort({title: -1, titleShow: -1, "subtitle.text": -1, "subtitle.textShow": -1})
        .then((data) => {
            res.send(data)
        })
        .catch((error) => {
            res.status(500).send('Ошибка получения прайса');
        })
}
module.exports = {
    createPrice,
    deletePrice,
    updatePrice,
    getAllPrices
}