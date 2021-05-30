const express = require("express");
const router = express.Router();
const hashFunc = require("../../helpers/hash_pasword");
const knex = require("../database/config");
const jwt = require("jsonwebtoken");
require('dotenv').config()

router.post("/signin", async (req, res) => {
  if (req.body['email'] && req.body['password']) {
    const email = req.body['email'];
    const password = req.body['password'];
    try {
      const foundUser = await knex.first().from('Player').where('mail', email);
      if (foundUser) {
        const isEqual = await hashFunc.compareHashPassword(password, foundUser.password);
        if (isEqual) {
          const payload = {
            fullName: foundUser.fullName,
            mail: foundUser.mail,
            signInWith: foundUser.signInWith
          }
          const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_LIFE
          });
          console.log(process.env.REFRESH_TOKEN_LIFE)
          const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_LIFE
          })
          res.send({
            token: accessToken,
            refreshToken
          }).status(200);
        }
        res.status(404)
      }
      else res.status(404);
    }
    catch (err) {
      console.log(err);
      res.status(500);
    }
  }
  res.status(404);
});

router.post("/signup", async (req, res) => {
  const hashedPassword = await hashFunc.hashPassword(req.body['password']);
  console.log('o day', hashedPassword);
  const newPlayer = {
    fullName: req.body['fullName'],
    mail: req.body['mail'],
    password: hashedPassword,
    signInWith: req.body['signInWith'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
  await knex('Player').insert(newPlayer)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500)
    })
})

module.exports = router;