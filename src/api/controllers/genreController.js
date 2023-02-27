const genreService = require("../services/genreService");
/////////////////
const standardAPI = require("../standardAPI");

//////////////////////

const genreController = {
  //GET /api/genre/all
  getAll: async (req, res, next) => {
    const data = await genreService.getALl();
    require('../injectMethod')(data, res.statusCode, res)
  },
  //
};

module.exports = genreController;
