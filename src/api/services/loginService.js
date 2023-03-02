var userModel = require('../../utils/models/user')
const jsonFailureCallApi = require('../standardAPI').jsonFailureCallApi

const loginService = {
    loginService: async function(userName) {
        try {
            const instance = await userModel.findOne({ userName, role: 'customer'});
            return require('../standardAPI').jsonSuccessCallApi(instance);
        }catch(err) {
            return jsonFailureCallApi(err)
        }
    },
}


module.exports = loginService