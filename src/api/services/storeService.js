var storeModel = require("../../utils/models/store");
const { ObjectId } = require("mongodb");

const storeService = {
  getStore: async function (owner) {
    try {
      const instance = await storeModel.findOne(
        { owner },
        "nameShop avatar _id address email owner"
      );
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  getStoreAndProducts: async function (_id) {
    try {
      const instance = await storeModel.aggregate([
        { $match: { _id: ObjectId(_id) } },
        {
          $lookup: {
            from: "products",
            localField: "owner",
            foreignField: "owner",
            as: "products",
          },
        },
        {
          $unwind: "$products",
        },
        {
          $lookup: {
            from: "categories",
            localField: "products.type",
            foreignField: "_id",
            as: "categories",
          },
        },
        {
          $project: {
            password: 0,
            status: 0,
          },
        },
      ]);

      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  getProductsByIdGenre: async (idStore, idGenre) => {
    try {
      const instance = await storeModel.aggregate([
        { $match: { _id: ObjectId(idStore) } },
        { $lookup: {
          from: 'products',
          localField: 'owner',
          foreignField: 'owner',
          as: 'listProduct'
        }},
        {
          $unwind: '$listProduct'
        },
        {
          $match: { 'listProduct.type' : ObjectId(idGenre)}
        },
        {
          $project: {
            _id: 0,
            listProduct: '$listProduct'
          }
        }
      ]);
      
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
};

module.exports = storeService;
