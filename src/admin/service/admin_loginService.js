var userModel = require("../../utils/models/user");

const admin_loginService = {
  checkUser: async function (username, password) {
    try {
      const instance = await userModel.findOne({
        userName: username,
        password: password,
        role: "admin",
      });
      if (instance) return instance
      else return false
    } catch (err) {
      console.log("admin_loginService.checkUser", err.toString());
      return 'error';
    }
  },
  getProfile: async function (_id) {
    try {
      const instance = await userModel.findOne({
        _id
      }).select('userName avatar nickName');
      if (instance) return instance
      else return false
    } catch (err) {
      console.log("admin_loginService.checkUser", err.toString());
      return 'error';
    }
  },
  
};

module.exports = admin_loginService;
