const productSerVice = require("../services/productService");
/////////////////
const standardAPI = require("../standardAPI");

//////////////////////

const productController = {
  //GET /api/products/all
  getAll: async (req, res, next) => {

    const data = await productSerVice.getALl(0);

    require('../injectMethod')(data, res.statusCode, res)
  },
  //GET /api/products/flash_sale
  getFlashSale: async (req, res, next) => {
    const data = await productSerVice.getFlashSale();

    require('../injectMethod')(data, res.statusCode, res)
  },
  getProductsByGenre: async (req, res, next) => {
    const idGenre = req.params.idGenre
    const data = await productSerVice.getProductsByGenre(idGenre);
    require('../injectMethod')(data, res.statusCode, res)
  },
  getProductById : async (req, res, next) => {
    const dataToken = res.locals.haohoa;
    const idProduct = req.params.idProduct
    const data = await productSerVice.getProductById(idProduct, dataToken._id);
    require('../injectMethod')(data, res.statusCode, res)
  },
  addProduct : async (req, res, next) => {
    const dataToken = res.locals.haohoa;
    const schemaProduct = {
      type: 1,
      name: 1,
      images: 1,
      stock: 1,
      sale: 1,
      description: 1,
    }
    const dataProduct = req.body
    for(key in dataProduct) {
      if (!schemaProduct[key]) {
        res.json(require('../standardAPI').jsonFailure({message: `${key} là cái qq gì k lấy !!`}, res.statusCode))
        return
      }
    }
    for(key in schemaProduct) {
      if (!dataProduct[key]) {
        res.json(require('../standardAPI').jsonFailure({message: `${key} bị thiếu, điền vô thêm body đi !!`}, res.statusCode))
        return
      }
    }
    dataProduct.owner = dataToken.owner
    dataProduct.status = 1
    dataProduct.date = new Date(),
    dataProduct.sold = 0

    const addProduct = await productSerVice.addProduct(dataProduct)
  
    require('../injectMethod')(addProduct, res.statusCode, res)
  }
  //
};

module.exports = productController;
