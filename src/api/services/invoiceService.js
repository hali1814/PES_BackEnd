var invoiceModel = require("../../utils/models/invoice");
const { ObjectId } = require("mongodb");

const invoiceService = {
  getInvoiceByStatus: async function (status, customer) {
    try {
      const instance = await invoiceModel.aggregate([
        { $match: { customer: ObjectId(customer), status} },
        { $lookup: {
            from: 'products',
            localField: 'idProduct',
            foreignField: '_id',
            as: 'listProduct'
        }}
      ]);
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  addInvoice: async function (data) {
    try {
      const instance = await invoiceModel.insertMany(data)
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  }
};

module.exports = invoiceService;
