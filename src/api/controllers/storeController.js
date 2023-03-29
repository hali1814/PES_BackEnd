const e = require("express");
const storeService = require("../services/storeService");
const standardJson = require("../standardAPI");
const jwt = require("jsonwebtoken");
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
  
  //PES_STORE
  pes_getStoreAndItsProduct: async (req, res, next) => {
    const dataToken = res.locals.haohoa
    var getDB = await storeService.getStoreAndProducts(dataToken._id);
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
  loginStore: async (req, res, next) => {
    const { userName, password } = req.body;

    const data = await storeService.loginService(userName);
    if (data.status == "success") {
      if (!data.data) {
        const content = {
          message: `You have entered an invalid username or password.`,
          title: "Invalid username",
        };
        res.json(standardJson.jsonFailure(content, res.statusCode));
      } else {
        if (data.data.password == password) {
          //success
          if (data.data.status == "3") {
            res.json(
              standardJson.jsonBaned(
                { message: "Your account has been banned !!" },
                res.statusCode
              )
            );
            return;
          }

          //success
          if (data.data.status == "2") {
            res.json(
              standardJson.jsonInactive(
                { message: "Your account is inactive !!" },
                res.statusCode
              )
            );
            return;
          }

          const { nameShop, owner, _id } = data.data;
          const token = jwt.sign(
            { nameShop, owner, _id },
            process.env.ACCESS_TOKEN_API_SHOP
          );
          const content = {
            token: token,
            title: "login successfully !!",
            nickName: data.data.nickName,
          };
          res.json(standardJson.jsonSuccess(content, res.statusCode));
        } else {
          const content = {
            message: `You have entered an invalid username or password.`,
            title: "Invalid username",
          };
          res.json(standardJson.jsonFailure(content, res.statusCode));
        }
      }
    } else {
      res.json(data);
    }
  },
  registerStore: async (req, res, next) => {
    const data = await storeService.registerAccount(req.body);
    if (data.status == "success")
      res.json(
        standardJson.jsonSuccess(
          {
            message: "Register account successfully !!",
            account: data.data.userName,
          },
          res.statusCode
        )
      );
    else res.json(data);
  },
};

module.exports = storeController;
