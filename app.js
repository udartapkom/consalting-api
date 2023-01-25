const express = require('express');
const mongoose = require('mongoose');
const routers = require('./routers/index');
const cors = require('cors');
const CFG = require('./utils/config'); //конфиг
const { PORT = CFG.PORT, MONGO_URL = CFG.MONGO_URL } = process.env; //получаем константы для подключения mongoDB

const allowedCors = [
      '*', //пока нет домена - будем пропускать всё
  ];
  const app = express();
mongoose.set('strictQuery', true); //требование из консоли. Нужно-бы погуглить...
mongoose.connect(MONGO_URL,  //коннектимся к БД
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  
  mongoose.connection.on('open', () => console.log('connected to mongoDB')); //выводим в консоль сообщение, если коннект успешен 

  app.use((req, res, next) => {
    const { origin } = req.headers;
    if (allowedCors.includes(origin)) {
      res.header('Access-Control-Allow-Origin', '*');
    }
    next();
  });
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use('/', routers);
    app.listen(PORT, () => {
        console.log(`Application is running on port ${PORT}`) //светим в консоль, на каком порте работает приложение
    })