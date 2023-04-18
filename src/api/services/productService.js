var productModel = require("../../utils/models/product");
/////////////////
const storeService = require("../services/storeService");
const genreModel = require("../../utils/models/genre");
const cartModel = require("../../utils/models/bill");

const { ObjectId } = require("mongodb");
const rate = require("../../utils/models/rate");

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
      const instanceRate = await rate.aggregate([
        { $match: { idProduct: ObjectId(idProduct), status: 1 } },
        {
          $lookup: {
            from: "users",
            localField: "customer",
            foreignField: "_id",
            as: "owner",
          },
        },
        {
          $project: {
            _id: 1,
            customer: 1,
            idBill: 1,
            idProduct: 1,
            start: 1,
            msg: 1,
            status: 1,
            createdAt: 1,
            updatedAt: 1,
            owner: {
              _id: 1,
              userName: 1,
              avatar: 1,
            },
          },
        },
      ]);

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
        rates: instanceRate,
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
          returnOriginal: false,
        }
      );
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  addProduct: async function (data) {
    try {
      const instance = await productModel.insertMany({
        ...data,
      });
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  increaseSold: async function (idProduct, quantity) {
    try {
      const instance = await productModel.findByIdAndUpdate(
        { _id: idProduct },
        { $inc: { sold: quantity } },
        { returnOriginal: false }
      );
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  addStock: async function (owner, data) {
    try {
      let instance = await productModel.findOne({
        owner,
        _id: ObjectId(data.idProduct),
      });
      if (!instance) {
        instance = {
          msg: "Sản phẩm không tồn tại",
        };
        return require("../standardAPI").jsonSuccessCallApi(instance);
      }

      instance = await productModel.find({
        stock: { $elemMatch: { color: data.color, size: data.size } },
      });
      if (instance.length > 0) {
        instance = {
          msg: "Stock này đã tồn tại",
        };
        return require("../standardAPI").jsonSuccessCallApi(instance);
      }

      instance = await productModel.updateOne(
        {
          owner,
          _id: ObjectId(data.idProduct),
        },
        {
          $push: {
            stock: {
              color: data.color,
              size: data.size,
              stock: data.stock,
              price: data.price,
              status: 0,
            },
          },
        }
      );

      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err.toString());
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
