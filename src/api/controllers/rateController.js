const rateService = require("../services/rateService");
/////////////////


//////////////////////
//0: unRate
//1: rated
const rateController = {
  //GET /api/genre/all
  getRate0: async (req, res, next) => {
    const dataFromToken = res.locals.haohoa
    
    const data = await rateService.getRateByUser(dataFromToken._id)
    require('../injectMethod')(data, res.statusCode, res)
  },
  updateRate: async (req, res, next) => {
    
    const dataFromToken = res.locals.haohoa
    const {msg, idRate, start} = req.body
    const data = await rateService.rated(msg, idRate, start, dataFromToken._id)
    require('../injectMethod')(data, res.statusCode, res)
  },
  //
};

module.exports = rateController;
