const mongoose = require('mongoose');
import bcrypt, { hash } from 'bcrypt'

export const ROLES = ['superadmin', 'user', 'admin', 'operator', 'monitor']
export const STATUS = ['disabled', 'enabled']
const options = { timestamps: true }

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    roles: {
      type: [mongoose.Schema.Types.String],
      enum: ROLES
    },
    token: {
      type: String,
      default: "",
      validate(value) {
        if (value == " ") throw new Error("A User must have a color");
      }
    },
    reset_password_token: {
      type: String,
      required: false
    },
    reset_password_expires: {
      type: Date,
      required: false
    },
    status: {
      type: String,
      enum: STATUS,
      default: 'enabled'
    }
  },
  options
);

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(this.password, salt))
    .then(hash => {
      this.password = hash
      next()
    })
    .catch(err => next(err))

})



module.exports = mongoose.model("User", userSchema);