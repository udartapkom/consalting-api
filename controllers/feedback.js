const Feedback = require('../models/feedback');

const createFeedback = (req, res, next) => {
    const { title, text, image } = req.body;
    if(!title || !text || !image) {
        res.status(400).send("Невозможно создать материал")
    }
    Feedback.create({
        title,
        text,
        image
    })
    .then((material) => {
        Feedback.findById(material._id)
            .then((data) => {
                res.send(data)
            })
    })
    .catch((error) => {
        res.status(500).send('Ошибка создания материала');
    })
}

const updateFeedback = (req, res, next) => {
    const { id, title, text, image } = req.body;
    if(!id || !title || !text || !image) {
        res.status(400).send("Невозможно обновить материал")
    }
    Feedback.findByIdAndUpdate(id, {id, title, text, image})
    .then((material) => {
        Feedback.findById(material._id)
            .then((data) => {
                res.send(data)
            })
    })
    .catch((error) => {
        res.status(500).send('Ошибка обновления материала');
    })
}

const deleteFeedback = (req, res, next) => {
    const { id } = req.body;
    if(!id){
        res.status(400).send("Невозможно удалить материал")
    }
    Feedback.findByIdAndDelete(id)
        .then((material) => {
            res.send(material)
        })
        .catch((error) => {
            res.status(500).send('Ошибка удаления материала');
        })
}

const getAllFeedback = (req, res, next) => {
    Feedback.find({})
        .then((material) => {
            res.send(material)
        })
        .catch((error) => {
            res.status(500).send('Ошибка получения материалов');
        })
}
module.exports = {
    createFeedback,
    updateFeedback,
    deleteFeedback,
    getAllFeedback
}