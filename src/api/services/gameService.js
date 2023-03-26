var characterModel = require("../../utils/models/character");
const { ObjectId } = require("mongodb");

///////////
const gameService = {
  login: async function (user) {
    try {
      const instance = await characterModel.find({ user });
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  register: async function (_id, name) {
    try {
      const checkName = await characterModel.findOne({ name });
      if (checkName)
        return require("../standardAPI").jsonSuccessCallApi({
          message: "Name is exist",
          code: 1805,
        });

      const checkExistUser = await characterModel.findOne({
        user: ObjectId(_id),
      });
      if (checkExistUser)
        return require("../standardAPI").jsonSuccessCallApi({
          message: "Account have been character",
          code: 1411,
        });

      const createCharacter = await characterModel.insertMany({
        user: ObjectId(_id),
        name,
        stamina: 100,
        gold: 0,
        lastPosition: [0, 0, 0],
      });

      return require("../standardAPI").jsonSuccessCallApi(require("../standardAPI").jsonSuccessCallApi({
        message: "Account have been character",
        code: 1509,
      }));
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  updateGold: async function (_id, data) {
    console.log(typeof data)
    try {
      const updateGold = await characterModel.updateOne(
        { user: ObjectId(_id) },
        {
          $inc: { ...data },
        }
      );
      return require("../standardAPI").jsonSuccessCallApi(updateGold);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  getAsset: async function (_id, data) {
    console.log(typeof data)
    try {
      const updateGold = await characterModel.findOne(
        { user: ObjectId(_id) },
      ).select('gold stamina name');
      return require("../standardAPI").jsonSuccessCallApi(updateGold);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
};

module.exports = gameService;
