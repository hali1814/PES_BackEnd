const notificationService = require("../services/notificationService");
/////////////////
const standardAPI = require("../standardAPI");

//////////////////////

const productController = {
  pushNotification: async (req, res, next) => {

    await notificationService.pushNotification('fdaskjhfkja')
    res.send('hkakakakak')
  },
  getAllNotification: async (req, res, next) => {
    const dataToken = res.locals.haohoa;
    const data = await notificationService.all(dataToken._id)
    require('../injectMethod')(data, res.statusCode, res)
  },
  //
  countNotification: async (req, res, next) => {
    const dataToken = res.locals.haohoa;
    const data = await notificationService.countNotification(dataToken._id)
    require('../injectMethod')(data, res.statusCode, res)
  }, sawNotification: async (req, res, next) => {
    const { idNotification } = req.body
    const data = await notificationService.sawNotification(idNotification)
    require('../injectMethod')(data, res.statusCode, res)
  },
};

module.exports = productController;
