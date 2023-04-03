var invoiceModel = require("../../utils/models/invoice");
const { ObjectId } = require("mongodb");
const productService = require('./productService');
const notificationService = require("./notificationService");

const invoiceService = {
  getInvoiceByStatus: async function (status, customer) {
    try {
      const instance = await invoiceModel.aggregate([
        { $match: { customer: ObjectId(customer), status } },
        {
          $lookup: {
            from: "products",
            localField: "idProduct",
            foreignField: "_id",
            as: "productDetails",
          },
        },
      ]);
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  addInvoice: async function (data) {
    try {
      const instance = await invoiceModel.insertMany(data);
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  getALLInvoice: async function () {
    try {
      const instance = await invoiceModel.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "idProduct",
            foreignField: "_id",
            as: "productDetails",
          },
        },
      ]);
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  getBillDetails: async function (id) {
    try {
      const instance = await invoiceModel.aggregate([
        { $match: { _id: ObjectId(id) } },
        {
          $lookup: {
            from: "products",
            localField: "idProduct",
            foreignField: "_id",
            as: "productDetails",
          },
        },
      ]);
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err.toString());
    }
  },
  getInvoicesOfCustomer: async function (customer) {
    try {
      const instance = await invoiceModel.aggregate([
        { $match: { customer: ObjectId(customer) } },
        {
          $lookup: {
            from: "products",
            localField: "idProduct",
            foreignField: "_id",
            as: "productDetails",
          },
        },
      ]);
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  updateStatusInvoice: async (_id, status, idUser) => {
    try {

      const cancelSold = await invoiceModel.findOne(
        {_id},
      );
      await productService.increaseSold(cancelSold.idProduct, -cancelSold.quantity)
      
      const instance = await invoiceModel.findOneAndUpdate(
        { _id, status: { $ne: 4 } },
        {
          $set: {
            status,
          },
          $push: {
            information: {
              date: new Date(),
              title: "Hủy đơn hàng",
              msg: "Đơn hàng đã bị hủy bởi bạn",
            },
          },
        },
        {
          returnOriginal: false,
        }
      );
      if (instance) {
        const dataNotification = {
          owner: ObjectId(idUser),
          idBill: ObjectId(_id),
          title: `Hủy đơn`,
          message: `Bạn đã hủy bỏ đơn hàng ${_id}`,
          Data : new Date(),
          status: 0
        }
        await notificationService.addNotification(dataNotification)
      }
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err.toString());
    }
  },
};

module.exports = invoiceService;
