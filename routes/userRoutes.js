const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const generatePassword = require('../config/generateRandomPassword');

const express = require('express');
const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const { userSchema } = require('../lib/validatorSchemas');


router.post('/login', celebrate({
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
}), authController.login);
router.post('/forgotPassword', celebrate({
  body: {
    email: Joi.string().email().required(),
  }
}), authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// router.use(authController.authenticate)

router
  .route('/')
  .get(authController.authenticate, authController.checkAccess('user.list'), userController.getAllUsers)
  .post(
    celebrate({
      body: userSchema
    }),
    authController.authenticate,
    authController.checkAccess('user.add'),
    generatePassword.generateRandomPassword,
    userController.createUser);

router.patch('/updateMyPassword', authController.authenticate,
  celebrate({
    body: {
      passwordCurrent: Joi.string().required(),
      passwordNew: Joi.string().required(),
      passwordNewConfirm: Joi.string().required()

    }
  }), authController.updatePassword);

router.get('/search', authController.authenticate, authController.checkAccess('user.search'), userController.searchUser)

router.get('/me', authController.authenticate, userController.getMe, userController.getUser);

router
  .route('/:id')
  .get(celebrate({
    params: {
      id: Joi.string().required(),
    }
  }), authController.authenticate, authController.checkAccess('user.view'), userController.getUser)

  .patch(celebrate({
    params: {
      id: Joi.string().required(),
    },
    body: {
      name: Joi.string().optional(),
      email: Joi.string().email().optional(),
      contactNo: Joi.string().optional(),
      role: Joi.array().items(Joi.string()).optional(),
      designation: Joi.string().optional(),
      permissions: Joi.array().items(Joi.string()).optional()

    }
  }), authController.authenticate, authController.checkAccess('user.edit'), userController.updateUser)

  .delete(celebrate({
    params: {
      id: Joi.string().required(),
    }
  }), authController.authenticate, authController.checkAccess('user.delete'), userController.deleteUser);


router.post('/signup', celebrate({
  body: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    passwordConfirm: Joi.string().required()

  }
}), authController.signup);



// Protect all routes after this middleware
// router.use(authController.authenticate);

// router.patch('/updateMyPassword', authController.updatePassword);

router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

module.exports = router;


/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all useres
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     
 *     responses:
 *       200:
 *         description: successfully get all users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     description: Retrieve a user's information by their ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found.
 */


/**
 * @swagger
 * /api/v1/users/{id}:
 *   patch:
 *     summary: Update a user by ID
 *     description: Update a user by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *         name: user
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */



/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user by their ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User successfully deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       description: User object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: admin@admin.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JSON web token to access protected routes
 *       401:
 *         description: Unauthorized access
 */