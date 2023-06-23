const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const crypto = require('crypto');
// const ALLROLES = require('../lib/static/roles');



const serviceSchema = new mongoose.Schema({
  serviceId: String,
  title: {
    type: String,
    required: [true, 'Required field!']
  },
  description: {
    type: String,
    required: [true, 'Required field!'],
  },
  subService:[Service],

  active: {
    type: Boolean,
    default: true,
    select: false
  }
}, {
  timestamps: true
});





const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;


/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
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
 *           description: The auto-generated id of the service
 *         email:
 *           type: string
 *           description: email of a service
 *         contactNo:
 *           type: string
 *           description: email of a service
 *         name:
 *           type: string
 *           description: name of a service
 *         password:
 *           type: string
 *           description: password of a service
 *         passwordConfirm:
 *           type: string
 *           description: password of a service
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
