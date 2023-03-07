var userModel = require("../../utils/models/user");
const jsonFailureCallApi = require("../standardAPI").jsonFailureCallApi;

const loginService = {
  loginService: async function (userName) {
    try {
      const instance = await userModel.findOne({ userName, role: "customer" });
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return jsonFailureCallApi(err);
    }
  },
  changePassWord: async (password, newPassword, userName) => {
    try {
      const instance = await userModel.findOneAndUpdate(
        { userName, role: "customer", password },
        {
          $set: { password: newPassword },
        },
        { returnDocument: "after" }
      );
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return jsonFailureCallApi(err);
    }
  },
  updateProfile: async (userName, data) => {
    try {
      const instance = await userModel.findOneAndUpdate(
        { userName, role: "customer" },
        {
          $set: {
            avatar: data.avatar,
            date: new Date(data.date),
            address: data.address,
            nickName: data.nickName,
            email: data.email,
          },
        }
      );
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return jsonFailureCallApi(err);
    }
  },
  registerAccount: async (data) => {
    try {
      const tmp = await loginService.loginService(data.userName);
      if (tmp.data)
        return require("../standardAPI").jsonFailure({
          message: "Account already exists !!!",
        });

      const instance = await userModel.insertMany({
        userName: data.userName,
        password: data.password,
        avatar:
          "https://image.cnbcfm.com/api/v1/image/106686172-1598966433320-gettyimages-1152439648-istockalypse-home-office-00062.jpeg?v=1599013160",
        date: data.date,
        email: data.email,
        role: "customer",
        address: data.address,
        status: "2",
        voucher: [],
      });
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return jsonFailureCallApi(err);
    }
  },
  getVouchers: async function (userName) {
    try {
      const instance = await userModel.aggregate([
        { $match: { userName } },
        {
          $unwind: "$vouchers",
        },
        {
          $lookup: {
            from: "vouchers",
            localField: "vouchers.idVoucher",
            foreignField: "_id",
            as: "resVouchers",
          },
        },
        {
          $unwind: "$resVouchers"
        },
        {
          $project: {
            _id: 0,
            voucherId: "$resVouchers._id",
            min: "$resVouchers.min",
            sale: "$resVouchers.sale",
            type: "$resVouchers.type",
            value: "$resVouchers.value",
            description: "$resVouchers.description",
            images: "$resVouchers.images",
            quantity: "$vouchers.quantity"
          }
        }
      ]);

      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return jsonFailureCallApi(err);
    }
  },
};

module.exports = loginService;
