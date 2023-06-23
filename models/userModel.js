const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const crypto = require('crypto');
// const ALLROLES = require('../lib/static/roles');




const userSchema = new mongoose.Schema({
  userId: String,
  name: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  userType: {
    type: String,
    required: [true, 'Please enter user type!'],
    enum: ['admin', 'employee'],
    default: 'employee'
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  contactNo: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: [true, 'Provided contactNo is already registered']
  },
  photo: String,
  role: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  designation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Designation'
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    valdidate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not matching'
    }
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  permissions: [String],
  active: {
    type: Boolean,
    default: true,
    select: false
  }

}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;





/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - name
 *         - password
 *         - passwordConfirm
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: email of a user
 *         contactNo:
 *           type: string
 *           description: email of a user
 *         name:
 *           type: string
 *           description: name of a user
 *         password:
 *           type: string
 *           description: password of a user
 *         passwordConfirm:
 *           type: string
 *           description: password of a user
 *       example:
 *         email: shefas@gmail.com
 *         contactNo: "9980701002"
 *         name: shefas
 *         password: shefas@123
 *         passwordConfirm: shefas@123
 *         role: ["63f5aadd7c0bafabb3558506"]
 *         designation: 63f6009dc9a95c8b03a5bfd3
 *         permissions: ["vendor.add", "vendor.edit", "vendor.list"]
 *         
 * 
 */
