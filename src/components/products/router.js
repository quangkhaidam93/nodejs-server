const express = require("express");
const router = express.Router();
const productController = require('./controller');
const { GraphQLClient, gql } = require('graphql-request');

const query = gql`
  mutation ProductCreate(
    $app_identifier: String!,
    $name: String!,
    $sku: String!,
    $price: Int!,
    $image_url: String!
  ) 
  {
    product_create(
      app_identifier: $app_identifier,
      input: {
        name: $name, sku: $sku, price: $price, image_url: $image_url
      }
    ) {
      id,
      name,   
      image_url,
      sku,
      price,
      status,
      created_at,
      updated_at 
    }
  }
`

// const newGraphQLClient = (endpoint, token) => new GraphQLClient(
//   endpoint,
//   {
//     headers: {
//       "X-Tiki-Access-Token": token,
//       "Content-Type": "application/json"
//     }
//   }
// )

// router.post("/products", async (req, res) => {
//   try {
//     const body = req.body;
//     if (!body) {
//       res.send({error: "Please provide product"}).status(404);
//       return;
//     }
//     const variables = {
//       name: body.name,
//       sku: body.sku,
//       price: body.price,
//       image_url: body.image_url,
//       app_identifier: process.env.APP_ID
//     }
//     const endpoint = process.env.OPEN_API;
//     const graphQLClient = newGraphQLClient(endpoint, body.token);
//     const data = await graphQLClient.request(query, variables);
//     res.send({data: JSON.stringify(data)})
//   }
//   catch (err) {
//     res.send({error: JSON.stringify(err)})
//   }
// });

router.get('/products', productController.getAllProducts);
router.get('/products/:id', productController.getProductDetail);
router.post('/products', productController.createNewProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;