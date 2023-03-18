var userModel = require("../../utils/models/user");
var voucherModel = require("../../utils/models/voucher");
const jsonFailureCallApi = require("../standardAPI").jsonFailureCallApi;
const { ObjectId } = require('mongodb')
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
  getVoucherById: async function (_id) {
    try {
      const instance = await voucherModel.findOne({_id});
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return jsonFailureCallApi(err);
    }
  },
  addVoucher: async function (idVoucher, quantity, _id) {
    try {
      const instanceVoucher = await voucherModel.findOne({_id : idVoucher});
      if (!instanceVoucher) {
        instanceVoucher = {
          status: 'success',
          data: {
            message: 'Voucher is not exist !!'
          }
        }
        return require("../standardAPI").jsonSuccessCallApi(data);
      }
      //add voucher 
      const checkExist = await userModel.updateOne(
        { _id: ObjectId(_id) },
        { $inc: { "vouchers.$[vouchers].quantity": quantity } },
        {
          arrayFilters: [
            {
              "vouchers.idVoucher": ObjectId(idVoucher),
            },
          ],
        }
      );
      //add 1 object to voucher.
      if (!checkExist.modifiedCount) {
        const addVoucher = await userModel.updateOne(
          { _id: ObjectId(_id) },
          {
            $push: {
              vouchers: {
                date: new Date(),
                idVoucher: ObjectId(idVoucher),
                quantity
              },
            },
          }
        );
      }
      return require("../standardAPI").jsonSuccessCallApi({message: "Adding voucher successfully !!"});
    } catch (err) {
      return jsonFailureCallApi(err.toString());
    }
  },
  deleteVoucher: async function (idVoucher, _id) {
    try {
      const instanceVoucher = await voucherModel.findOne({_id : idVoucher});
      if (!instanceVoucher) {
        instanceVoucher = {
          status: 'success',
          data: {
            message: 'Voucher is not exist !!'
          }
        }
        return require("../standardAPI").jsonSuccessCallApi(data);
      }
      //add voucher 
      const checkExist = await userModel.updateOne(
        { _id: ObjectId(_id) },
        { $inc: { "vouchers.$[vouchers].quantity": -1 } },
        {
          arrayFilters: [
            {
              "vouchers.idVoucher": ObjectId(idVoucher),
            },
          ],
        }
      );


      const deleteQuantity0 = await userModel.updateOne(
        { _id: ObjectId(_id) },
        { $pull: { vouchers: { quantity: 0 } } },
        {
          arrayFilters: [
            {
              "vouchers.idVoucher": ObjectId(idVoucher),
            },
          ],
        }
      );
      return require("../standardAPI").jsonSuccessCallApi({message: "Delete voucher successfully !!"});
    } catch (err) {
      return jsonFailureCallApi(err.toString());
    }
  },
  getAllVoucher: async function (userName) {
    try {
      const instance = await voucherModel.find()
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return jsonFailureCallApi(err);
    }
  },
};

module.exports = loginService;
