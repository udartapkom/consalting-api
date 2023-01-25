const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const AdminSchema = new mongoose.Schema({
    name: { 
        type: String,
        minlength: 2,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator(v) {
                return validator.isEmail(v);
            },
            message: "Некорректный E-mail"
        }
    },
    password: {
        type: String,
        required: true,
        select: false
    }
})
AdminSchema.statics.findUserByCredentials = function (email, password) {
    return this.findOne({ email }).select('+password')
      .then((admin) => {
        if (!admin) {
          return Promise.reject(new UnautorizedErr(ERR_MSG.UNAUTORIZED));
        }
        return bcrypt.compare(password, admin.password)
          .then((matched) => {
            if (!matched) {
              return Promise.reject(new UnautorizedErr(ERR_MSG.UNAUTORIZED));
            }
            return admin;
          });
      });
  };
module.exports = mongoose.model('admin', AdminSchema);