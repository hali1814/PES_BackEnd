var productModel = require("../../utils/models/product");
/////////////////
const storeService = require("../services/storeService");
const genreModel = require("../../utils/models/genre");
const cartModel = require("../../utils/models/bill");


const { ObjectId } = require("mongodb");

///////////
const productService = {
  getALl: async function (status) {
    try {
      const instance = await productModel.aggregate([
        { $match: { status: status } },
        {
          $lookup: {
            from: "categories",
            localField: "type",
            foreignField: "_id",
            as: "listGenre",
          },
        },
        { $unwind: "$listGenre" },
        {
          $project: {
            _id: 1,
            owner: "$owner",
            type: "$type",
            name: "$name",
            images: "$images",
            stock: "$stock",
            sale: "$sale",
            sold: "$sold",
            description: "$description",
            date: "$date",
            status: "$status",
            genre: "$listGenre.label",
          },
        },
      ]);
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  getFlashSale: async function () {
    try {
      const instance = await productModel.find({ sale: { $gte: 25 } });
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  getProductsByGenre: async function (idGenre) {
    try {
      const instance = await productModel.find({ type: idGenre });
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  getProductById: async function (idProduct, _id) {
    try {
      const instanceProduct = await productModel.findOne({ _id: idProduct });
      const instanceStore = await storeService.getStore(instanceProduct.owner);
      const instanceType = await genreModel.findOne({
        _id: instanceProduct.type,
      });
      const quantityCart = await cartModel.aggregate([
        { $match: { customer: ObjectId(_id) } },
        {
          $project: {
            arrayLength: { $size: "$listCart" },
          },
        },
      ]);
      instanceProduct.toObject();
      const shop = {
        nameShop: instanceStore.data.nameShop,
        avatar: instanceStore.data.avatar,
        idShop: instanceStore.data._id,
        email: instanceStore.data.email,
        address: instanceStore.data.address,
      };
      const data = {
        ...instanceProduct._doc,
        shop,
        genre: instanceType.label,
        quantityCart: quantityCart[0]?.arrayLength || 0,
      };
      return require("../standardAPI").jsonSuccessCallApi(data);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  changeStatus: async function (idProduct, status) {
    try {
      const instance = await productModel.findOneAndUpdate(
        { _id: idProduct },
        {
          $set: {
            status,
          },
        },
        {
            returnOriginal: false
          }
      );
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
};

// const checkLogin = async (userName) => {
//     try {
//         const instance = await userModel.find({ userName });
//         return instance[0];
//     }catch(err) {
//         console('loginService 8: ERR: ', err)
//         return 0
//     }

// }

module.exports = productService;
