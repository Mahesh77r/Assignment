const router = require('express').Router();
const {loginUser, resetPassword, generateToken} = require('../controller/AUTH')
const {createUser,deleteUser,getUser,updateUser} = require('../controller/CRUD')
const auth = require("../middelwares/Auth");

// Auth
router.post('/login',loginUser);
router.post('/generatetoken/:id',auth,generateToken);
router.post('/resetpassword/:token',resetPassword);

// CRUD
router.post('/user',createUser);
router.get('/user/:id',auth,getUser);
router.patch('/user/:id',auth,updateUser);
router.delete('/user/:id',auth,deleteUser);

module.exports = router