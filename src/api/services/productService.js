var productModel = require('../../utils/models/product')

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