const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.route('/getusers').get(UserController.getUsers)

router.route('/getuser/:id').get(UserController.getUser)

router.route('/adduser').post(UserController.addUser)

router.route('/deleteuser/:id').delete(UserController.deleteUser)

router.route('/updateuser/:id').put(UserController.updateUser)

module.exports = router;