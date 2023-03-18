const e = require("express");
const loginService = require('../service/admin_loginService')
/////////////////

//////////////////////

const admin_loginController = {
  //GET /api/cart
  pageLogin: async function (req, res, next) {
    res.render("login", { layout: false });
  },
  checkLogin: async function (req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) {
        console.log(username, password)
      res.render("login", { layout: false, error: "Bạn chưa nhập gì cả" });
      return;
    }
    const data = await loginService.checkUser(username, password)
    if(data) {
        res.redirect(`/dashboard?_id=${data._id}`)
    }else {
        res.render("login", { layout: false, error: "Sai mật khẩu hoặc tài khoản" });
    }
  },
};

module.exports = admin_loginController;
