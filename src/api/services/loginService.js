var userModel = require('../../utils/models/user')

const loginService = {
    loginService: async function(userName) {
        try {
            const instance = await userModel.findOne({ userName, role: 'customer' });
            return {
                status: 'success',
                data: instance
            };
        }catch(err) {
            return {
                status: 'error',
                message: 'Unable to communicate with database',
                code: 'row 13 loginService.js'
            }
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



module.exports = loginService