const bcrypt = require('bcryptjs');
const Admin = require('../models/admins');
const { ERR_MSG } = require('../utils/constants');
const { ConflictErr, BadRequestErr } = require('../errors/index');
const BadRequestError = require('../errors/bad-request-err');

const createAdmin = (req, res, next) => { // создаём админа
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestErr(ERR_MSG.BAD_REQUEST);
    }
    bcrypt.hash(password, 10)
        .then((hash) => {
            Admin.create({
                name,
                email,
                password: hash
            })
            .then((admin) => {
                console.log(admin)
                Admin.findById(admin._id)
                    .then((data) => {
                        res.send(data)
                    })
            })
            .catch((err) => {
                if (err.name === 'MongoError' && err.code === 11000) {
                    throw new ConflictErr(ERR_MSG.CONFLICT);
                } else if (err.name === 'ValidationError') {
                    throw new BadRequestError(ERR_MSG.BAD_REQUEST);
                } else {
                    throw new Error(ERR_MSG.SERVER_ERROR);
                }
            })
        })
        .catch(next);
}
const getCurrentUser = (req, res, next) => { // получить корректного пользователя
    const userId = req.user._id;
    Admin.findById(userId)
        .then((data) => {
            if (!data) {
                throw new NotFoundErr(ERR_MSG.NOT_FOUND);
            }
            res.send(data);
        })
        .catch((err) => {
            if (err.kind === 'ObjectId' || err.kind === 'CastError') {
                throw new BadRequestErr(ERR_MSG.BAD_REQUEST);
            } else if (err.statusCode === 404) {
                next(err);
            } else {
                throw new Error(ERR_MSG.SERVER_ERROR);
            }
        })
        .catch(next);
}
const loginAdmin = (req, res, next) => { // логинимся
    const {email, password} = req.body;
    return Admin.findUserByCredentials(email, password)
    .then ((admin) => {
        const adminToken = jwt.sign(
            { _id: admin._id},
            NODE_ENV === 'production' ? JWT_SECRET : 'very-secret',
            {expiresIn: '12h'},
        );
        res.send( {adminToken} );
   })
   .catch((err) => {
    next(err)
   })
}
module.exports = {
    createAdmin,
    getCurrentUser,
    loginAdmin  
};