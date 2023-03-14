const e = require("express");
const billService = require("../services/billService");
/////////////////


//////////////////////

const billController = {
  //GET /api/cart
  getCart: async (req, res, next) => {
    const dataToken = res.locals.haohoa
    const data = await billService.getCart(dataToken._id);
    data.data.forEach(element => {
        element.stock = element.stock.filter(stock => stock.size == element.size && stock.color == element.color)
        element.stock = element.stock[0]
    });
    require('../injectMethod')(data, res.statusCode, res)
  },
  //POST /api/cart/add
  addCart: async (req, res, next) => {
    const dataToken = res.locals.haohoa
    const {size, quantity, idProduct, color} = req.body
    const data = await billService.addCart(dataToken._id, {size, quantity, idProduct, color});
    require('../injectMethod')(data, res.statusCode, res)
  },
  //POST /api/cart/delete/product
  deleteProduct: async (req, res, next) => {
    const dataToken = res.locals.haohoa
    const {idProduct , size, color} = req.body
    const data = await billService.deleteProduct(dataToken._id, idProduct, size, color)
    require('../injectMethod')(data, res.statusCode, res)
  },
  declineProduct: async (req, res, next) => {
    const dataToken = res.locals.haohoa
    const {idProduct , size, color} = req.body
    const data = await billService.declineProduct(dataToken._id, idProduct, size, color)
    require('../injectMethod')(data, res.statusCode, res)
  },
};

module.exports = billController;
