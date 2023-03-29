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
  getBills: async (_id) => {
    try {
      const instance = await storeModel.aggregate([
        {$match: {_id: ObjectId(_id)}},
        {$lookup: {
          from: 'products',
          localField: 'owner',
          foreignField: 'owner',
          as: 'listProduct'
        }},
        {$unwind: '$listProduct'},
        {$lookup: {
          from: 'invoices',
          localField: 'listProduct._id',
          foreignField: 'idProduct',
          as: 'listBills'
        }},
        {$project: {
          _id: 0,
          listBills: '$listBills'
        }}
      ])
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  loginService: async function (userName) {
    try {
      const instance = await storeModel.findOne({owner: userName});
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return jsonFailureCallApi(err);
    }
  },
  registerAccount: async (data) => {
    try {
      const tmp = await storeService.loginService(data.userName);
      if (tmp.data)
        return require("../standardAPI").jsonFailure({
          message: "Account already exists !!!",
        });

      const instance = await storeModel.insertMany({
        owner: data.userName,
        password: data.password,
        avatar: data.avatar ||
          "https://image.cnbcfm.com/api/v1/image/106686172-1598966433320-gettyimages-1152439648-istockalypse-home-office-00062.jpeg?v=1599013160",
        email: data.email,
        nameShop: data.nameShop,
        address: data.address,
        status: "2",
        description: data.description,
      });
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return jsonFailureCallApi(err);
    }
  },
};

module.exports = storeService;
