const { Telegraf } = require('telegraf')
const bot = new Telegraf('5591563056:AAG4LB0zMEWVFtoIv3u0pAO5zKc0gGl_8Fs') //ХАРДКОД!!! Нужно как-то это исправить 

const telegramBot = (req, res, next) => {
    const { name, telephone, message } = req.body; //Ниже тоже ХАРДКОД - ID ЧАТА - нужно как-то исправить
            bot.telegram.sendMessage(225999785, `У вас новая консультация! \n Имя:  ${name}  \n Телефон:  ${telephone} \n Тема:  ${message} `)
       .then((data) => {
        res.status(200).send('Сообщение успешно доставлено. Ожидайте ответа.')
       })
        .catch((err) => {
            res.send('Что-то пошло не так! Попробуйте ещё раз, но немного позже.')
        })
    process.once('SIGINT', () => bot.stop('SIGINT'))
    process.once('SIGTERM', () => bot.stop('SIGTERM'))
}
module.exports = { telegramBot }