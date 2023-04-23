var invoiceModel = require("../../utils/models/invoice");
const { ObjectId } = require("mongodb");
const productService = require('./productService');
const notificationService = require("./notificationService");
const rateService = require("./rateService");
const invoice = require("../../utils/models/invoice");

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
  updateStatusInvoice: async (_id, status, idUser, reason) => {
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
              msg: "Đơn hàng đã bị hủy",
              reason
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
  topPayToShip: async (_id, idUser, tokenDevice) => {
    try { 
      const instance = await invoiceModel.findOneAndUpdate(
        { _id },
        {
          $set: {
            status: 1,
          },
          $push: {
            information: {
              date: new Date(),
              title: "Kiểm duyệt",
              msg: "Đơn hàng đang được chuẩn bị",
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
          title: `Kiểm duyệt`,
          message: `Đơn hàng đã được chấp nhận bởi shop`,
          Date : new Date(),
          status: 0
        }
        await notificationService.addNotification(dataNotification)
        await notificationService.pushNotification({
          title: `PES`,
          body: `Đơn hàng của bạn đã được chấp nhận bởi shop`,
          idBill: _id
        }, tokenDevice)
      }
      


      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err.toString());
    }
  },
  toShipToReceive: async (_id, idUser, tokenDevice) => {
    try { 
      const instance = await invoiceModel.findOneAndUpdate(
        { _id },
        {
          $set: {
            status: 2,
          },
          $push: {
            information: {
              date: new Date(),
              title: "Chuyển giao",
              msg: "Đơn hàng đang trên đường đến chổ bạn",
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
          title: `Chuyển giao`,
          message: `Đơn hàng đang trên đường đến chổ bạn`,
          Date : new Date(),
          status: 0
        }
        await notificationService.addNotification(dataNotification)
        await notificationService.pushNotification({
          title: `PES`,
          body: `Đơn hàng đang trên đường đến chổ bạn`,
          idBill: _id
          
        }, tokenDevice)
      }
      


      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err.toString());
    }
  },
  toReceiveToCompleted: async (_id, idUser, tokenDevice) => {
    try { 
      const instance = await invoiceModel.findOneAndUpdate(
        { _id },
        {
          $set: {
            status: 3,
          },
          $push: {
            information: {
              date: new Date(),
              title: "Hoàn thành",
              msg: "Đơn hàng đã được giao đến bạn",
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
          title: `Hoàn thành`,
          message: `Đơn hàng đã được giao đến bạn`,
          Date : new Date(),
          status: 0
        }
        //adding to list notification 
        await notificationService.addNotification(dataNotification)
        //push notification fcm
        await notificationService.pushNotification({
          title: `PES`,
          body: `Đơn hàng đã được giao đến bạn`,
          idBill: _id
        }, tokenDevice)
        
        console.log(instance)
        //creating document rate.
        const schemaRate = {
          customer: ObjectId(idUser),
          idBill: ObjectId(_id),
          idProduct: ObjectId(instance.idProduct),
          start: 0,
          msg: '',
          status: 0
        }
        await rateService.insert(schemaRate)
      }
      


      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err.toString());
    }
  },
  getInvoiceOfStoreByStatus: async function (owner, status) {
    try {
      const instance = await invoiceModel.aggregate([
        {$match: {status: status}},
        {$lookup : {
          from: 'products',
          localField: 'idProduct',
          foreignField: '_id',
          as: 'productDetails'
        }},
        {$unwind: '$productDetails'},
        {$match: {'productDetails.owner': owner}}
      ]);
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
};

module.exports = invoiceService;
