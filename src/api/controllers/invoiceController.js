const invoiceService = require("../services/invoiceService");
/////////////////
//////////////////////

const invoiceController = {
  //GET /api/bills/:status
  getBillsByStatus: async (req, res, next) => {
    const { _id } = res.locals.haohoa;
    const { status } = req.params;
    const data = await invoiceService.getInvoiceByStatus(Number(status), _id);
    data.data.forEach((element) => {
      element.listProduct[0].stock = element.listProduct[0].stock.filter(
        (stock) => stock.size == element.size && stock.color == element.color
      );
    });
    require("../injectMethod")(data, res.statusCode, res);
  },
  //POST /api/bill/calculator
  calculatorBill: async (req, res, next) => {
    
    res.send('haohoa')
  },
};

module.exports = invoiceController;
