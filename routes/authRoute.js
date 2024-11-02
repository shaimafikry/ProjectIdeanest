const express = require('express');
const { signIn , signUp, refreshTokenRenew, signOut } = require('../controllers/authController');
const router = express.Router();



router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);

router.post('/refresh-token', refreshTokenRenew);

module.exports = router;
