var bill = require("../../utils/models/bill");
const { ObjectId } = require("mongodb");
const { updateOne } = require("../../utils/models/bill");

const billService = {
  getCart: async function (customer) {
    try {
      const instance = await bill.aggregate([
        { $match: { customer: ObjectId(customer) } },
        {
          $unwind: "$listCart",
        },
        {
          $lookup: {
            from: "products",
            localField: "listCart.idProduct",
            foreignField: "_id",
            as: "listProduct",
          },
        },
        {
          $unwind: "$listProduct",
        },
        {
          $project: {
            _id: 0,
            idProduct: "$listCart.idProduct",
            size: "$listCart.size",
            color: "$listCart.color",
            quantity: "$listCart.quantity",
            name: "$listProduct.name",
            images: "$listProduct.images",
            sale: "$listProduct.sale",
            sold: "$listProduct.sold",
            description: "$listProduct.description",
            stock: "$listProduct.stock",
          },
        },
      ]);
      return require("../standardAPI").jsonSuccessCallApi(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  addCart: async function (customer, json) {
    try {
      const instance = await bill.findOne({ customer });
      //check to create cart
      if (instance == null) {
        const createCard = await billService.createCart(customer);
      }
      console.log(json);
      //checking product has already exists. increasing 1 if it is exists
      const checkExist = await bill.updateOne(
        { customer: ObjectId(customer) },
        { $inc: { "listCart.$[listCart].quantity": 1 } },
        {
          arrayFilters: [
            {
              "listCart.idProduct": ObjectId(json.idProduct),
              "listCart.size": json.size,
              "listCart.color": json.color,
            },
          ],
        }
      );
      //add 1 object to cart.
      if (!checkExist.modifiedCount) {
        json.idProduct = ObjectId(json.idProduct);
        const addCart = await bill.updateOne(
          { customer: ObjectId(customer) },
          {
            $push: {
              listCart: {
                ...json,
              },
            },
          }
        );
      }
      return require("../standardAPI").jsonSuccessCallApi({message: "Adding product to cart successfully !!"});

    } catch (err) {
      console.log(err);
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
  createCart: async function (customer) {
    try {
      const instance = await bill.insertMany({
        customer: ObjectId(customer),
        date: new Date(),
        status: 0,
        listCart: [],
      });
      console.log(instance);
    } catch (err) {
      return require("../standardAPI").jsonFailureCallApi(err);
    }
  },
};

module.exports = billService;
