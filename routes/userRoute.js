const express = require('express');
const {
    loginController, 
    registerController, 
    authUserController
} = require('../controllers/userController');
const authentication = require('../middlewares/authentication');

const router = express.Router();

router.post('/login', loginController);
router.post('/register', registerController);

router.post('/getUser', authentication, authUserController);

module.exports = router;


