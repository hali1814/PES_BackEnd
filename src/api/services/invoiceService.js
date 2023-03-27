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
            as: 'productDetails'
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
  },
  getALLInvoice: async function () {
    try {
      const instance = await invoiceModel.aggregate([
        { $lookup: {
            from: 'products',
            localField: 'idProduct',
            foreignField: '_id',
            as: 'productDetails'
        }}
      ]);
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  getBillDetails: async function (id) {
    try {
      const instance = await invoiceModel.aggregate([
        { $match: { _id: ObjectId(id)} },
        { $lookup: {
            from: 'products',
            localField: 'idProduct',
            foreignField: '_id',
            as: 'productDetails'
        }}
      ]);
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err.toString());
    }
  },
  getInvoicesOfCustomer: async function (customer) {
    try {
      const instance = await invoiceModel.aggregate([
        { $match: { customer: ObjectId(customer)} },
        { $lookup: {
            from: 'products',
            localField: 'idProduct',
            foreignField: '_id',
            as: 'productDetails'
        }}
      ]);
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  updateStatusInvoice: async (_id, status) => {
    try {
      const instance = await invoiceModel.findOneAndUpdate(
        { _id },
        {
          $set: {
            status
          },
        },
        {
          returnOriginal: false
        }
      );
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return jsonFailureCallApi(err);
    }
  },
};

module.exports = invoiceService;
