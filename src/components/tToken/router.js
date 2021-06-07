const express = require("express");
const router = express.Router();
const knex = require("../database/config");
const verifyToken = require('../../services/verify_token');
const { request, gql } = require('graphql-request');
const signature = require('../../services/getSignature');

const query = gql`
  query GetToken(
    $code: String!,
    $client_id: String!,
    $timestamp: Int!,
    $signature: String!
  ) 
  {
    get_auth_access_token(input: {
      code: $code, client_id: $client_id, timestamp: $timestamp, signature: $signature
    }) {
      access_token   
      refresh_token    
      expires_in    
      scopes 
    }
  }
`

router.post("/t_token", async (req, res) => {
  try {
    const authCode = req.body.auth_code;
    if (!authCode) {
      res.send({error: "Please provide authcode"}).status(404);
      return;
    }
    // const timestamp = parseInt(new Date('07/06/2021').getTime());
    const timestamp = 1620470539433;
    const variables = {
      code: authCode,
      client_id: process.env.CLIENT_ID,
      timestamp,
      signature: signature(authCode, timestamp)
    }
    const endpoint = process.env.OPEN_API;
    const data = await request(endpoint, query, variables);
    res.send({data: JSON.stringify(data)})
  }
  catch (err) {
    res.send({error: JSON.stringify(err)})
  }
});

module.exports = router;