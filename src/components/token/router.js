const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../../helpers/verify_token');
require('dotenv').config()

router.post("/renew-token", async (req, res) => {
  const refreshToken = req.headers['refreshtoken'];
  if (verifyToken.isTokenValid(refreshToken, 'REFRESH_TOKEN')) {
    const jwtDecoded = jwt.decode(refreshToken);
    const payload = {
      fullName: jwtDecoded.fullName,
      mail: jwtDecoded.mail,
      signInWith: jwtDecoded.signInWith
    }
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_LIFE
    });
    res.send({token}).status(200);
  }
  else res.status(404);
});

module.exports = router;