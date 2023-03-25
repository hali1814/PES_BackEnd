const admin_storeService = require("../service/admin_storeService");
const storeService = require("../../api/services/storeService");

/////////////////

//////////////////////

const admin_storeController = {
  getAllStores: async function (req, res, next) {
    const stores = await admin_storeService.getAll();
    stores.forEach(
      (e) => (e.date = require("../../validations/formatDate")(e.createdAt))
    );
    res.render("shops", { stores });
  },
  pageStoreDetail: async function (req, res, next) {
    let store = await storeService.getStoreAndProducts(req.params.id);
    if (store.status == "success") {
      store = store.data;
      const data = {
        ...store[0],
      };
      data.products = store.map((element) => element.products);
      data.categories = store.map((element) => element.categories[0]);

      data.categories = Object.values(
        data.categories.reduce((acc, obj) => {
          let key = obj._id;
          let merged = Object.assign(acc[key] || {}, obj);
          let ok = Object.assign(acc, { [key]: merged });
          return ok;
        }, {})
      );


      //bills of shop 
      let bills = await storeService.getBills(data._id);
      bills = bills.data.reduce((previousValue, currentValue) => {
        previousValue.push(...currentValue.listBills)
        return previousValue
      }, [])
      bills.forEach(e => e.date = require('../../validations/formatDate')(e.date))
      console.log(bills)
      data.products.sort((a, b) => Number(b.sold) - Number(a.sold))
      res.render("shopDetails", {store: data, bills});
    }
  },
};

module.exports = admin_storeController;
