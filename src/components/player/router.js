const express = require("express");
const router = express.Router();
const knex = require("../database/config");
const verifyToken = require('../../services/verify_token');

router.get("/players/:id", async (req, res) => {
  const token = req.headers['accesstoken'];
  if (token) {
    if (verifyToken.isTokenValid(token, 'ACCESS_TOKEN')) {
      const playerId = req.params.id;
      const player = await knex.first("fullname", "mail", "id", "signInWith").from('Player').where('id', playerId);
      res.send({player}).status(200);
    }
    else res.status(404)
  }
  else res.status(404);
});

router.get("/players", async (req, res) => {
  const result = await knex('Player');
  // const headers = {
  //   'Access-Control-Expose-Headers': 'Content-Range',
  //   'Content-Range': 'users 0-24/319'
  // }
  // res.writeHead(200, headers);
  // res.end(JSON.stringify(result));
  res.json(result);
})

router.put("/players", async (req, res) => {
  await knex('users').insert(newPlayer)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.sendStatus(500).send({error: err})
    })
})

router.delete("/users", async (req, res) => {
  const userId = req.userId;
  await knex('users').delete(userId);
  res.sendStatus(201);
})

module.exports = router;