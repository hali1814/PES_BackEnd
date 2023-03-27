const invoiceService = require('../../api/services/invoiceService')
const userService = require('../../api/services/loginService')
const storeService = require('../../api/services/storeService');


/////////////////

//////////////////////

const admin_billController = {

  getAllBills: async function (req, res, next) {
    const data = await invoiceService.getALLInvoice();
    data.data.forEach((element) => {
      element.productDetails[0].stock = element.productDetails[0].stock.filter(
        (stock) => stock.size == element.size && stock.color == element.color
      );
      element.productDetails = element.productDetails[0]
      element.date = require('../../validations/formatDate')(element.date)
    });
    res.render("bills",  {listBills : data.data});
  },

  getVouchers: async function (req, res, next) {
    const vouchers = await userService.getAllVoucher()
    console.log(vouchers.data)
    res.render("vouchers", {vouchers: vouchers.data});
  },
  pageBillDetails: async function (req, res, next) {
    const invoice = await invoiceService.getBillDetails(req.params.id)
    invoice.data[0].date = require('../../validations/formatDate')(invoice.data[0].date)
    invoice.data[0].productDetails = invoice.data[0].productDetails[0]
    invoice.data[0].productDetails.stock = invoice.data[0].productDetails.stock[0]

    const store = await storeService.getStore(invoice.data[0].productDetails.owner)
    const customer = await userService.getCustomer(invoice.data[0].customer)

    res.render("billDetails", {invoice: invoice.data[0], store: store.data, customer: customer.data});
  },
  pageUpdateBill: async function (req, res, next) {
    const bill = await invoiceService.updateStatusInvoice(req.params.idBill, Number(req.params.status))
    let checkStatus = true;
    if(!bill) checkStatus = false
    if (bill.status == Number(req.params.status)) checkStatus = false
    res.render("checkUpdateBill", {bill: bill.data, checkStatus});
  },
};

module.exports = admin_billController;
