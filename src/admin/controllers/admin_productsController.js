const userService = require('../service/admin_loginService')

/////////////////

//////////////////////

const admin_productController = {

  getAllProducts: async function (req, res, next) {
    
    res.render("products");
  },
  getAllPendingProducts: async function (req, res, next) {
    
    res.render("confirmProducts");
  },
  pageProductDetail: async function (req, res, next) {
    
    res.render("productDetail");
  },
};

module.exports = admin_productController;
