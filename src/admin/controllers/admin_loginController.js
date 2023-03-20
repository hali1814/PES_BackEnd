const e = require("express");
const loginService = require("../service/admin_loginService");
/////////////////

//////////////////////

const admin_loginController = {
  //GET /api/cart
  pageLogin: async function (req, res, next) {
    const { user } = req.session;
    console.log(user)
    if (!user) {
    res.render("login", { layout: false });
    }else {
      res.redirect('/dashboard')
    }
  },
  checkLogin: async function (req, res, next) {
      const { username, password } = req.body;
      if (!username || !password) {
        console.log(username, password);
        res.render("login", { layout: false, error: "Bạn chưa nhập gì cả" });
        return;
      }
      const data = await loginService.checkUser(username, password);
      if (data) {
        req.session.user = {
          _id: data._id,
        };
        res.redirect(`/dashboard`);
      } else {
        res.render("login", {
          layout: false,
          error: "Sai mật khẩu hoặc tài khoản",
        });
      }
    
  },
};

module.exports = admin_loginController;
