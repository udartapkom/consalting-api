const mongoose = require('mongoose');
const Consultations = require('../models/consultation');
const { ERR_MSG } = require('../utils/constants');
const { NotFoundErr, BadRequestErr } = require('../errors/index');

const createConsultation = (req, res, next) => { // создать консультацию
    const { name, telephone, theme } = req.body;
    if (!name || !telephone || !theme) {
        throw new BadRequestErr(ERR_MSG.BAD_REQUEST);
    }
    Consultations.create({
            name,
            telephone,
            theme
        })
    .then((cons) => {
        Consultations.findById(cons._id)
        .then((data) => {
            res.send(data)
        })
    })
    .catch((err) => {
        res.send(err) //нужно отправить статус
    })
}

const updateConsultation = (req, res, next) => { // обновить консультацию
    const { id, answer } = req.body;
    if (!answer || !id) {
        throw new BadRequestErr(ERR_MSG.BAD_REQUEST);
    }
    Consultations.findOneAndUpdate(id, { answer, isread: true })
    .then((cons) => {
        Consultations.findById(cons._id)
        .then((data) => {
            res.send(data)
        })
    })
    .catch((err) => {
        res.status(500).send(err)
    })
}

const toArchiveConsultation = (req, res, next) => { // отправить консультацию в архив
    const { id } = req.body;
    if (!id) {
        throw new BadRequestErr(ERR_MSG.BAD_REQUEST);
    }
    Consultations.findOneAndUpdate(id, {isarchive: true })
    .then((cons) => {
        Consultations.findById(cons._id)
        .then((data) => {
            res.send(data)
        })
    })
    .catch((err) => {
        res.status(500).send(err)
    })
}

const getNonArchiveConsultation = (req, res, next) => { //получить все неархивные консультации
    Consultations.find({isarchive: false})
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        res.status(404).send(err)
    })
}

const getOnlyArchiveConsultation = (req, res, next) => { // получить все АРХИВНЫЕ консультации
    Consultations.find({isarchive: true})
    .then((data) => {
        res.send(data)
    })
    .catch((err) => {
        res.status(404).send(err)
    })
}
module.exports = { 
    createConsultation,
    updateConsultation,
    toArchiveConsultation,
    getNonArchiveConsultation,
    getOnlyArchiveConsultation
}