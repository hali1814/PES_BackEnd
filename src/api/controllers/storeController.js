const e = require("express");
const storeService = require("../services/storeService");
/////////////////

//////////////////////

const storeController = {
  //GET /api/store/:_id
  getStoreAndItsProduct: async (req, res, next) => {
    const { _id } = req.params;
    var getDB = await storeService.getStoreAndProducts(_id);
    if (getDB.status == "success") {
      getDB = getDB.data;
      const data = {
        ...getDB[0],
      };
      data.products = getDB.map((element) => element.products);
      data.categories = getDB.map((element) => element.categories[0]);

      data.categories = Object.values(
        data.categories.reduce((acc, obj) => {
          let key = obj._id;
          let merged = Object.assign(acc[key] || {}, obj);
          let ok = Object.assign(acc, { [key]: merged });
          return ok;
        }, {})
      );
      res.json(require("../standardAPI").jsonSuccess(data, res.statusCode));
    } else res.json(getDB);
  },
  getProducts: async (req, res, next) => {
    const { idStore, idGenre } = req.params;
    const data = await storeService.getProductsByIdGenre(idStore, idGenre)
    data.data = data.data.map(e => {
      let tmp = e.listProduct
      console.log(tmp)
      return {...tmp}
    })
    console.log(data.data)
    require('../injectMethod')(data, res.statusCode, res)
  },
};

module.exports = storeController;
