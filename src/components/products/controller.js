const statusCode = require('../../constants/statusCode');
const productService = require('./service');

const responseText = {
  QUERY_SUCCESS: 'Truy vấn sản phẩm thành công',
  CREATE_SUCCESS: 'Tạo sản phẩm thành công',
  DELETE_SUCCESS: 'Xoá sản phẩm thành công',
  UPDATE_SUCCESS: 'Cập nhật sản phẩm thành công',
  MISSING_VARIABLES: 'Thiếu thông tin để tạo sản phẩm mới',
  NOT_FOUND_PRODUCT: 'Không tìm thấy sản phẩm này'
}

const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  res.send({
    dataArray: products, 
    responseCode: statusCode.QUERY_SUCCESS, 
    responseText: responseText.QUERY_SUCCESS
  });
}

const getProductDetail = async (req, res) => {
  const id = req.params.id;
  if (!!!id) {
    res.send({
      responseCode: statusCode.BAD_REQUEST,
      responseText: responseText.MISSING_VARIABLES
    });
    return;
  }
  const product = await productService.getProduct(id);
  res.send({
    data: product,
    responseCode: statusCode.QUERY_SUCCESS,
    responseText: responseText.QUERY_SUCCESS
  });
}

const createNewProduct = async (req, res) => {
  const body = req.body;
  if (!!!body.sku || !!!body.name || !!!body.sellingPrice || !!!body.price) {
    res.send({
      responseCode: statusCode.BAD_REQUEST,
      responseText: responseText.MISSING_VARIABLES
    });
    return;
  }
  const newProduct = {
    sku: body.sku,
    price: body.price,
    image_url: body.image_url,
    name: body.name,
    short_desc: body.shortDesc,
    selling_price: body.sellingPrice,
    quantity: body.quantity || 1,
    detail_desc: body.detailDesc
  };
  await productService.createProduct(newProduct);
  res.send({
    data: newProduct,
    responseCode: statusCode.CREATE_SUCCESS,
    responseText: responseText.CREATE_SUCCESS
  })
}

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  if (!!!id) {
    res.send({
      responseCode: statusCode.BAD_REQUEST,
      responseText: responseText.MISSING_VARIABLES
    });
    return;
  }
  const foundProduct = await productService.getProduct(id);
  if (!!!foundProduct) {
    res.send({
      responseCode: statusCode.NOT_FOUND,
      responseText: responseText.NOT_FOUND_PRODUCT
    }).status(404);
    return;
  }
  await productService.deleteProduct(id);
  res.send({
    responseCode: statusCode.DELETE_SUCCESS,
    responseText: responseText.DELETE_SUCCESS
  })
}

const updateProduct = async (req, res) => {
  const body = req.body;
  const id = req.params.id;
  if (!!!body.sku || !!!body.name || !!!body.sellingPrice || !!!body.price || !!!id) { 
    res.send({
      responseCode: statusCode.BAD_REQUEST,
      responseText: responseText.MISSING_VARIABLES
    }).status(400);
    return;
  }
  const foundProduct = await productService.getProduct(id);
  if (!!!foundProduct) {
    res.send({
      responseCode: statusCode.NOT_FOUND,
      responseText: responseText.NOT_FOUND_PRODUCT
    }).status(404);
    return;
  }
  const updatedProduct = {
    sku: body.sku,
    price: body.price,
    image_url: body.image_url,
    name: body.name,
    short_desc: body.shortDesc,
    selling_price: body.sellingPrice,
    quantity: body.quantity || 1,
    detail_desc: body.detailDesc
  };
  await productService.updateProduct(updatedProduct, id);
  res.send({
    data: updatedProduct,
    responseCode: statusCode.EDIT_SUCCESS,
    responseText: responseText.UPDATE_SUCCESS
  })
}

module.exports = {
  getAllProducts,
  getProductDetail,
  createNewProduct,
  updateProduct,
  deleteProduct
}