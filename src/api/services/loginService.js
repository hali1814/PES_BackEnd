var userModel = require("../../utils/models/user");
const jsonFailureCallApi = require("../standardAPI").jsonFailureCallApi;

const loginService = {
  loginService: async function (userName) {
    try {
      const instance = await userModel.findOne({ userName, role: "customer" });
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return jsonFailureCallApi(err);
    }
  },
  changePassWord: async (password, newPassword, userName) => {
    try {
      const instance = await userModel.findOneAndUpdate(
        { userName, role: "customer", password },
        {
          $set: { password: newPassword },
        },
        { returnDocument: "after" }
      );
      return require('../standardAPI').jsonSuccessCallApi(instance);
    } catch (err) {
      return jsonFailureCallApi(err);
    }
  },
};

module.exports = loginService;
