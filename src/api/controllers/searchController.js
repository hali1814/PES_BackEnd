const productService = require("../services/productService");
/////////////////


//////////////////////
//0: unRate
//1: rated
const searchController = {
  //GET /api/genre/all
  suggest: async (req, res, next) => {
    const {searchData} = req.body
    const data = await productService.suggestSearch(searchData)
    if(data.status == 'success') {
        data.data = data.data.map((e)=>e.name)
    }
    require('../injectMethod')(data, res.statusCode, res)
  },
  search: async (req, res, next) => {
    const {searchResult} = req.body
    const data = await productService.resultSearch(searchResult)
    require('../injectMethod')(data, res.statusCode, res)
  },
  //
};

module.exports = searchController;
