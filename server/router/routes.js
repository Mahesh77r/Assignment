const router = require('express').Router();
const {loginUser, resetPassword, generateToken} = require('../controller/AUTH')
const {createUser,deleteUser,getUser,updateUser} = require('../controller/CRUD')
const {addCases, getCases} = require('../controller/Cases')
const auth = require("../middlewares/Auth");

// Auth
router.post('/login',loginUser);
router.post('/generatetoken/:id',auth,generateToken);
router.post('/resetpassword/:token',resetPassword);

// CRUD
router.post('/user',createUser);
router.get('/user/:id',auth,getUser);
router.patch('/user/:id',auth,updateUser);
router.delete('/user/:id',auth,deleteUser);


router.post('/cases',addCases);
router.get('/cases/',getCases);
router.get('/cases/:id',getCases);

module.exports = router