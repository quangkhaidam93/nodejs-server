const express = require("express");
const router = express.Router();
const knex = require("../database/config");

router.get("/games", async (req, res) => {
  console.log('O day');
  const result = await knex('games');
  res.json({games: result})
});

module.exports = router;