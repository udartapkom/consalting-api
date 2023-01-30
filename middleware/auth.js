const jwt = require('jsonwebtoken');
const { UnautorizedErr } = require('../errors/index');
const { ERR_MSG } = require('../utils/constants');
const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
    const { autorization } = req.headers;
    if (!autorization || !autorization.startsWith('Bearer ')) {
        throw new UnautorizedErr(ERR_MSG.UNAUTORIZED);
    }
    const token = autorization.replace('Bearer ', '');
    let payload;
    try {
        payload =jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'very-secret');
    }
    catch (err) {
        throw new UnautorizedErr(ERR_MSG.UNAUTORIZED);
    }
    req.user = payload;
    next();
    return true;
}
module.exports = { auth };