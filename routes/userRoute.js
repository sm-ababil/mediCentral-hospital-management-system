const express = require('express');
const {
    loginController, 
    registerController, 
    authUserController,
    uploadAvatarController
} = require('../controllers/userController');
const authentication = require('../middlewares/authentication');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '/uploads');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.post('/login', loginController);
router.post('/register', registerController);
router.post('/getUser', authentication, authUserController);
router.post('/uploadAvatar', upload.single('avatar'), uploadAvatarController);


module.exports = router;
