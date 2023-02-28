const productSerVice = require("../services/productService");
/////////////////
const standardAPI = require("../standardAPI");

//////////////////////

const productController = {
  //GET /api/products/all
  getAll: async (req, res, next) => {
    const data = await productSerVice.getALl();
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
  }
  //
};

module.exports = productController;
