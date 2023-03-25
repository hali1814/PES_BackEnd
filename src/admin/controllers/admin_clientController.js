
const amin_userService = require('../service/admin_loginService')
const userService = require('../../api/services/loginService')
const invoice = require('../../api/services/invoiceService');
const invoiceService = require('../../api/services/invoiceService');

/////////////////

//////////////////////

const admin_clientController = {

    getAllClients: async function (req, res, next) {
      const data = await amin_userService.getUsers()
      data.forEach(e => {
        e.nickName = e.nickName || "null"
        e.createDate = require('../../validations/formatDate')(e.createdAt)
        e.haohoa = Number(e.status)
        
      })
      console.log(data)
      res.render("users", {users: data});
    },
    pageDetails: async function (req, res, next) {
      const data = await amin_userService.getProfile(req.params.id)
      data.yob = require('../../validations/formatDate')(data.date || null)
      const vouchers = await userService.getVouchers(data.userName)
      for (let i = 0; i < data.vouchers.length; i++) {
        vouchers.data[i].date = require('../../validations/formatDate')(data.vouchers[i].date) || 'null'
      }
      const bills = await invoiceService.getInvoicesOfCustomer(data._id)
      bills.data.forEach((element) => {
        element.date = require('../../validations/formatDate')(element.date)
      });

      res.render("clientDetails", {user: data, vouchers: vouchers.data, bills: bills.data});
    },
  };

  module.exports = admin_clientController;
  