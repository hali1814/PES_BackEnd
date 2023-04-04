var notificationModel = require("../../utils/models/notification");
const admin = require("firebase-admin");
const { ObjectId } = require("mongodb");
const serviceAccount = require("../../../firebase/accountService/peshop-b50bf-firebase-adminsdk-7liyc-e4e8835cc9.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const notificationService = {
  addNotification: async function (data) {
    try {
      const instance = await notificationModel.insertMany({ ...data });
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  pushNotification: async function (data, tokenDevice) {
    try {
      // Thông tin cấu hình
      const payload = {
        notification: {
          title: data.title,
          body: data.body,
          icon: "http://pes.store/images/haohoa_logo.png",
        },
      };

      // Thông tin người nhận
      const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24,
      };

      // Gửi push notification
      admin
        .messaging()
        .sendToDevice(
          tokenDevice,
          payload,
          options
        )
        .then(function (response) {
          console.log("Push notification đã được gửi thành công:", response);
        })
        .catch(function (error) {
          console.log("Gửi push notification thất bại:", error);
        });
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  all: async function (owner) {
    try {
      const instance = await notificationModel.aggregate([
        { $match: { owner: ObjectId(owner) } },
        {
          $lookup: {
            from: "invoices",
            localField: "idBill",
            foreignField: "_id",
            as: "bill",
          },
        },
        { $unwind: "$bill" },
        {
          $lookup: {
            from: "products",
            localField: "bill.idProduct",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $project: {
            _id: 1,
            owner: 1,
            idBill: 1,
            title: 1,
            message: 1,
            message: 1,
            status: 1,
            createdAt: 1,
            imagesProduct: "$product.images",
          },
        },
        { $sort: { createdAt: -1 } },
      ]);

      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err.toString());
    }
  },
  countNotification: async function (owner) {
    try {
      const instance = await notificationModel.countDocuments({
        owner,
        status: 0,
      });
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err.toString());
    }
  },
  sawNotification: async function (idNotification) {
    try {
      const instance = await notificationModel.findOneAndUpdate(
        { _id: idNotification },
        { $set: { status: 1 } },
        { new: true }
      );
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err.toString());
    }
  },
};

module.exports = notificationService;
