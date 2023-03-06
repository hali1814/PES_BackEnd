var storeModel = require('../../utils/models/store')

const storeService = {
    getStore: async function(owner) {
        try {
            const instance = await storeModel.findOne({ owner }, 'nameShop avatar _id')
            return require('../standardAPI').jsonSuccessCallApi(instance)
        }catch(err) {
            return require('../standardAPI').jsonFailureCallApi(err)
        }
    },
    
}

module.exports = storeService