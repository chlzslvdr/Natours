const express = require('express');
const userControllers = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  deleteMe,
  updateMe,
} = userControllers;

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

router.patch('/updateMe', authController.protect, updateMe);
router.delete('/deleteMe', authController.protect, deleteMe);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
