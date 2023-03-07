var bill = require('../../utils/models/bill')

const billService = {
    getCart: async function(customer) {
        try {
            const instance = await bill.find({customer, status: 18})
            return require('../standardAPI').jsonSuccessCallApi(instance);
        }catch(err) {
            return require('../standardAPI').jsonFailureCallApi(err)
        }
    }
}




module.exports = genreService