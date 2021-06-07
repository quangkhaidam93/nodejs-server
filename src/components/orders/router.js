const express = require("express");
const router = express.Router();
const orderController = require('./controller');

// router.get('/orders', (req, res, next) => {
//   console.log('khai get orders');
//   if (true) {
//     console.log('khai true')
//     next('route');
//   }
//   res.send({message: 'get orders successfully'}).status(200);
// })

router.get('/orders', orderController.getAllOrders);
router.post('/orders', orderController.createNewOrder);

module.exports = router;