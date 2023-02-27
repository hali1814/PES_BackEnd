var userGenre = require('../../utils/models/genre')

const genreService = {
    getALl: async function() {
        try {
            const instance = await userGenre.find()
            return require('../standardAPI').jsonSuccessCallApi(instance);
        }catch(err) {
            return require('../standardAPI').jsonFailureCallApi(err)
        }
    }
}




module.exports = genreService