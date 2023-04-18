var rateModel = require("../../utils/models/rate");
const jsonFailureCallApi = require("../standardAPI").jsonFailureCallApi;
const { ObjectId } = require("mongodb");

const rateService = {
  insert: async function (data) {
    try {
      const instance = await rateModel.insertMany(data);
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return jsonFailureCallApi(err);
    }
  },
  getRateByUser: async function (_id) {
    try {
      const instance = await rateModel.aggregate([
        { $match: { customer: ObjectId(_id), status: 0 } },
        {
          $lookup: {
            from: "products",
            localField: "idProduct",
            foreignField: "_id",
            as: "product",
          },
        },
      ]);
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return jsonFailureCallApi(err.toString());
    }
  },
  rated: async function (msg, idRate, start, idUser) {
    try {
      const instance = await rateModel.findOneAndUpdate(
        { _id: idRate, customer: idUser },
        { $set: { start: start, msg: msg, status: 1 } }
      ); // merge thêm với product để lấy hình
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return jsonFailureCallApi(err);
    }
  },
  // getRateOfProduct: async function (idProduct) {
  //   try {
  //     const instance = await rateModel.aggregate([
  //       { $match: { idProduct: ObjectId(idProduct), status: 1 } },
  //       {
  //         $lookup: {
  //           from: "products",
  //           localField: "idProduct",
  //           foreignField: "_id",
  //           as: "product",
  //         },
  //       },
  //     ]);
  //     return require("../standardAPI").jsonSuccessCallApi(instance);
  //   } catch (err) {
  //     return jsonFailureCallApi(err.toString());
  //   }
  // },
};

module.exports = rateService;
