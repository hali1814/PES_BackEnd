const productService = require('../../api/services/productService')
const storeService = require('../../api/services/storeService')

/////////////////

//////////////////////

const admin_productController = {

  getAllProducts: async function (req, res, next) {
    const data = await productService.getALl()
    res.render("products", {products: data.data});
  },
  getAllPendingProducts: async function (req, res, next) {
    
    res.render("confirmProducts");
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
    dataStore.products = [dataStore.products[0], dataStore.products[1], dataStore.products[2], dataStore.products[3]]


    res.render("productDetail", {product, store: dataStore});
  },
};

module.exports = admin_productController;
