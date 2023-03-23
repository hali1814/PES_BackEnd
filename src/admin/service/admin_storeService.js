const storeModel = require('../../utils/models/store')
const admin_storeService = {
    getAll: async function () {
      const data = await storeModel.find({status: 0})
      return data
    },
  };



  
  
  module.exports = admin_storeService;
  