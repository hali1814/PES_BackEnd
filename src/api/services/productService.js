var productModel = require('../../utils/models/product')
/////////////////
const storeService = require('../services/storeService')




///////////
const productService = {
    getALl: async function() {
        try {
            const instance = await productModel.find({ status: '0' })
            return require('../standardAPI').jsonSuccessCallApi(instance)
        }catch(err) {
            return require('../standardAPI').jsonFailureCallApi(err)
        }
    },
    getFlashSale: async function() {
        try {
            const instance = await productModel.find({ sale: { $gte: 25} })
            return require('../standardAPI').jsonSuccessCallApi(instance);
        }catch(err) {
            return require('../standardAPI')
        }
    },
    getProductsByGenre: async function(idGenre) {
        try {
            const instance = await productModel.find({ type: idGenre})
            return require('../standardAPI').jsonSuccessCallApi(instance);
        }catch(err) {
            return require('../standardAPI').jsonFailureCallApi(err)
        }
    },
    getProductById: async function(idProduct) {
        try {
            const instanceProduct = await productModel.findOne({ _id: idProduct})
            const instanceStore = await storeService.getStore(instanceProduct.owner)
            instanceProduct.toObject()
            console.log(instanceStore)
            const shop = {nameShop: instanceStore.data.nameShop, avatar: instanceStore.data.avatar, idShop: instanceStore.data._id}
            const data = {...instanceProduct._doc, shop}
            return require('../standardAPI').jsonSuccessCallApi(data);
        }catch(err) {
            return require('../standardAPI').jsonFailureCallApi(err)
        }
    }
    
}

// const checkLogin = async (userName) => {
//     try {
//         const instance = await userModel.find({ userName });
//         return instance[0];
//     }catch(err) {
//         console('loginService 8: ERR: ', err)
//         return 0
//     }
    
// }



module.exports = productService