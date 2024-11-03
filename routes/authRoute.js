const express = require('express');
const { signIn , signUp, refreshTokenRenew, signOut, revokeRefreshToken } = require('../controllers/authController');
const router = express.Router();
const authToken = require('../middlewares/authToken');



router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout',authToken, signOut);

router.post('/refresh-token', refreshTokenRenew);
router.post('/revoke-refresh-token',authToken, revokeRefreshToken);


module.exports = router;
