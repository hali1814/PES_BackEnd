const productService = require('../../api/services/productService')
const storeService = require('../../api/services/storeService');
const store = require('../../utils/models/store');

/////////////////

//////////////////////

const admin_productController = {

  getAllProducts: async function (req, res, next) {
    const data = await productService.getALl(0)
    res.render("products", {products: data.data});
  },
  getAllPendingProducts: async function (req, res, next) {
    const data = await productService.getALl(1)
    data.data.forEach(e => {
      e.date = require('../../validations/formatDate')(e.date)
    })
    res.render("confirmProducts", {products: data.data});
  },
  pageProductDetail: async function (req, res, next) {
    const data = await productService.getProductById(req.params.id)
    const product = data.data
    product.stock = product.stock.sort((a, b) => a.price - b.price)
    product.stock.forEach(element => {
      element.sale = product.sale
    });
    let getStore = await storeService.getStoreAndProducts(product.shop.idShop)
    getStore = getStore.data
    // store.data[0].products.filter(e => e._id === product_id)
    const dataStore = {
      ...getStore[0],
    };
    dataStore.products = getStore.map((element) => element.products);
    const checkQuantityProduct = dataStore.products.length >= 4 ? 4 : dataStore.products.length
    const tmp = []
    for (let i = 0; i < checkQuantityProduct; i++) 
      tmp.push(dataStore.products[i])
    
      dataStore.products = tmp


    res.render("productDetail", {product, store: dataStore});
  },
};

module.exports = admin_productController;
