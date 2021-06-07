const statusCode = require('../../constants/statusCode');
const orderService = require('./service');

const responseText = {
  QUERY_SUCCESS: 'Truy vấn sản phẩm thành công',
  CREATE_SUCCESS: 'Tạo sản phẩm thành công',
  DELETE_SUCCESS: 'Xoá sản phẩm thành công',
  UPDATE_SUCCESS: 'Cập nhật sản phẩm thành công',
  MISSING_VARIABLES: 'Thiếu thông tin để tạo sản phẩm mới',
  NOT_FOUND_PRODUCT: 'Không tìm thấy sản phẩm này'
}

const getAllOrders = async (req, res) => {
  const orders = await orderService.getAllOrders();
  res.send({
    dataArray: orders, 
    responseCode: statusCode.QUERY_SUCCESS, 
    responseText: responseText.QUERY_SUCCESS
  });
}

const createNewOrder = async (req, res) => {
  const body = req.body;
  // if (!!!body.sku || !!!body.name || !!!body.sellingPrice || !!!body.price) {
  //   res.send({
  //     responseCode: statusCode.BAD_REQUEST,
  //     responseText: responseText.MISSING_VARIABLES
  //   });
  //   return;
  // }
  const newOrder = {
    product_id: body.productId,
    shipping_address_id: body.shippingAddressId,
    payment: body.payment,
    promotion: body.promotion,
    discount_type: body.discount_type,
    discount_number: body.discount_number,
    total: body.total,
    grand_total: body.grandTotal,
    shipping_fee: body.shippingFee
  };
  await orderService.createOrder(newOrder);
  res.send({
    data: newOrder,
    responseCode: statusCode.CREATE_SUCCESS,
    responseText: responseText.CREATE_SUCCESS
  })
}

module.exports = {
  getAllOrders,
  createNewOrder
}