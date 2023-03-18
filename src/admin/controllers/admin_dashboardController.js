const e = require("express");

/////////////////

//////////////////////

const admin_dashboardController = {
  //GET /api/cart
  pageDashBoard: function (req, res, next) {
    res.render("dashboard", { title: "Express" });
  },
};

module.exports = admin_dashboardController;
