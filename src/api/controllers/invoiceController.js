const invoiceService = require("../services/invoiceService");
const cartService = require("../services/billService");
const loginService = require("../services/loginService");
const { ObjectId } = require("mongodb");
const billService = require("../services/billService");
const productService = require("../services/productService");
/////////////////
//////////////////////

const invoiceController = {
  //GET /api/bills/:status
  getBillsByStatus: async (req, res, next) => {
    const { _id } = res.locals.haohoa;
    const { status } = req.params;
    const data = await invoiceService.getInvoiceByStatus(Number(status), _id);
    data.data.forEach((element) => {
      element.productDetails[0].stock = element.productDetails[0].stock.filter(
        (stock) => stock.size == element.size && stock.color == element.color
      );
      element.productDetails = element.productDetails[0];
    });
    require("../injectMethod")(data, res.statusCode, res);
  },
  //POST /api/bill/calculator
  calculatorBill: async (req, res, next) => {
    let amountBill = 0;
    let shipping_price = 30000;
    let payment_method = "COD";
    let discount_shipping = 0;
    let discount = 0;
    let listProduct = [];
    let total_shipping_price = 0;
    let total_discount_shipping = 0;

    const dataToken = res.locals.haohoa;
    let { voucher_shipping, voucher_pes } = req.body;

    //get product from cart
    const dataCart = await cartService.getCart(dataToken._id);
    dataCart.data.forEach((element) => {
      element.stock = element.stock.filter(
        (stock) => stock.size == element.size && stock.color == element.color
      );
      element.stock = element.stock[0];
      amountBill +=
        element.stock.price * (1 - element.sale / 100) * element.quantity;
      total_shipping_price += shipping_price;
    });
    listProduct = dataCart.data;

    //calculator for voucher shipping
    if (voucher_shipping) {
      voucher_shipping = (await loginService.getVoucherById(voucher_shipping))
        .data;
      if (shipping_price >= voucher_shipping.min) {
        discount_shipping = shipping_price / 2;

        if (discount_shipping > voucher_shipping.value)
          discount_shipping = voucher_shipping.value;
      }
    }
    //calculator for voucher pes
    if (voucher_pes) {
      voucher_pes = (await loginService.getVoucherById(voucher_pes)).data;
      if (amountBill >= voucher_pes.min) {
        discount = voucher_pes.value;
      }
    }
    let sliptDiscount = discount / listProduct.length;

    //setup bill for product
    listProduct.forEach((element) => {
      total_discount_shipping += discount_shipping;
      element.billProduct = {
        original_price:
          element.stock.price * (1 - element.sale / 100) * element.quantity,
        shipping_price,
        discount_shipping,
        sliptDiscount,
        total:
          element.stock.price * (1 - element.sale / 100) * element.quantity -
          sliptDiscount +
          (shipping_price - discount_shipping),
      };
      element.vouchers = [voucher_shipping._id, voucher_pes._id];
    });
    const totalBill = {
      status: "success",
      data: {
        listBills: listProduct,
        totalBill: {
          origin_total: amountBill,
          total_discount_price: discount,
          total_shipping_price,
          total_discount_shipping,
          totalBill:
            amountBill -
            discount +
            (total_shipping_price - total_discount_shipping),
          payment_method,
        },
      },
    };

    res.send(totalBill);
  },
  addBillFromCart: async (req, res, next) => {
    let amountBill = 0;
    let shipping_price = 30000;
    let payment_method = "COD";
    let discount_shipping = 0;
    let discount = 0;
    let listProduct = [];
    const dataToken = res.locals.haohoa;
    let { voucher_shipping, voucher_pes } = req.body;
    //get product from cart
    const dataCart = await cartService.getCart(dataToken._id);
    dataCart.data.forEach((element) => {
      element.stock = element.stock.filter(
        (stock) => stock.size == element.size && stock.color == element.color
      );
      element.stock = element.stock[0];
      amountBill +=
        element.stock.price * (1 - element.sale / 100) * element.quantity;
    });
    listProduct = dataCart.data;
    //calculator for voucher shipping
    if (voucher_shipping) {
      voucher_shipping = (await loginService.getVoucherById(voucher_shipping))
        .data;
      await loginService.deleteVoucher(voucher_shipping._id, dataToken._id);
      if (shipping_price >= voucher_shipping.min) {
        discount_shipping = shipping_price / 2;

        if (discount_shipping > voucher_shipping.value)
          discount_shipping = voucher_shipping.value;
      }
    }
    //calculator for voucher pes
    if (voucher_pes) {
      voucher_pes = (await loginService.getVoucherById(voucher_pes)).data;
      await loginService.deleteVoucher(voucher_pes._id, dataToken._id);
      if (amountBill >= voucher_pes.min) {
        discount = voucher_pes.value;
      }
    }
    let sliptDiscount = discount / listProduct.length;
    //setup bill for product
    listProduct.forEach((element) => {
      element.billProduct = {
        original_price:
          element.stock.price * (1 - element.sale / 100) * element.quantity,
        shipping_price,
        discount_shipping,
        sliptDiscount,
        total:
          element.stock.price * (1 - element.sale / 100) * element.quantity -
          sliptDiscount +
          (shipping_price - discount_shipping),
      };
      element.vouchers = [voucher_shipping?._id, voucher_pes?._id];
    });
    //
    let listBills = new Array();
    for (let i = 0; i < listProduct.length; i++) {
      //delete product
      await productService.increaseSold(listProduct[i].idProduct, listProduct[i].quantity)
      listBills.push({
        idProduct: ObjectId(listProduct[i].idProduct),
        customer: ObjectId(dataToken._id),
        date: new Date(),
        amount: listProduct[i].billProduct.total,
        quantity: listProduct[i].quantity,
        status: 0,
        message: "",
        information: [
          {
            date: new Date(),
            title: "Đơn đã đặt",
            msg: "Đơn hàng đã được đặt",
          },
        ],
        color: listProduct[i].stock.color,
        size: listProduct[i].stock.size,
        vouchers: [voucher_shipping._id || "", voucher_pes._id || ""],
        shipping_price,
        discount_shipping,
        payment_method,
        discount: sliptDiscount,
      });
    }
    if (listBills.length) {
      //add bill to db
      const resFromDB = await invoiceService.addInvoice(listBills);
      if (resFromDB.status == "success") {
        const content = {
          message: "Your order has been placed successfully.",
        };
        
        await billService.delete(dataToken._id);
        res.json(
          require("../standardAPI").jsonSuccess(content, res.statusCode)
        );
      } else res.json(data);
    } else {
      res.json(
        require("../standardAPI").jsonFailure(
          { message: "your cart is empty ??" },
          res.statusCode
        )
      );
    }
  },
  getBillDetails: async (req, res, next) => {
    const { id } = req.params;
    const data = await invoiceService.getBillDetails(id);
    data.data.forEach((element) => {
      element.productDetails[0].stock = element.productDetails[0].stock.filter(
        (stock) => stock.size == element.size && stock.color == element.color
      );
      element.productDetails = element.productDetails[0];
    });
    data.data = data.data[0];
    require("../injectMethod")(data, res.statusCode, res);
  },
  cancelStatusBill: async (req, res, next) => {
    const dataToken = res.locals.haohoa;
    const { idBill, reason } = req.body;
    if (!idBill) {
      res.send("idBill empty !!");
      return;
    }
    const data = await invoiceService.updateStatusInvoice(idBill, 4, dataToken._id, reason);
    if(!data.data) {
        console.log(invoiceController.toString(), data)
        res.send("idBill empty or bill have been status 4 !!");
        return;
    }
    require("../injectMethod")(data, res.statusCode, res);
  },
  topPayToShip: async (req, res, next) => {
    const dataToken = res.locals.haohoa;
    
    const { idBill, idCustomer } = req.body;
    const customer = await loginService.getCustomer(idCustomer)
    const tokenDevice = customer.data.tokenDevice
    if (!idBill) {
      res.send("idBill empty !!");
      return;
    }
    const data = await invoiceService.topPayToShip(idBill, idCustomer, tokenDevice);
    if(!data.data) {
        console.log(invoiceController.toString(), data)
        res.send("idBill empty or bill have been status 1 !!");
        return;
    }
    require("../injectMethod")(data, res.statusCode, res);
  },
  toShipToReceive: async (req, res, next) => {
    const dataToken = res.locals.haohoa;
    const { idBill, idCustomer } = req.body;
    const customer = await loginService.getCustomer(idCustomer)
    const tokenDevice = customer.data.tokenDevice
    if (!idBill) {
      res.send("idBill empty !!");
      return;
    }
    const data = await invoiceService.toShipToReceive(idBill, idCustomer, tokenDevice);
    if(!data.data) {
        console.log(invoiceController.toString(), data)
        res.send("idBill empty or bill have been status 2 !!");
        return;
    }
    require("../injectMethod")(data, res.statusCode, res);
  },
  toReceiveToCompleted: async (req, res, next) => {
    const dataToken = res.locals.haohoa;
    
    const { idBill, idCustomer } = req.body;
    const customer = await loginService.getCustomer(idCustomer)
    const tokenDevice = customer.data.tokenDevice
    if (!idBill) {
      res.send("idBill empty !!");
      return;
    }
    const data = await invoiceService.toReceiveToCompleted(idBill, idCustomer, tokenDevice);
    if(!data.data) {
        console.log(invoiceController.toString(), data)
        res.send("idBill empty or bill have been status 1 !!");
        return;
    }
    require("../injectMethod")(data, res.statusCode, res);
  },
  cancelStatusBillByStore: async (req, res, next) => {
    const { idBill, idCustomer, reason } = req.body;
    if (!idBill) {
      res.send("idBill empty !!");
      return;
    }
    const data = await invoiceService.updateStatusInvoice(idBill, 4, idCustomer, reason);
    if(!data.data) {
        console.log(invoiceController.toString(), data)
        res.send("idBill empty or bill have been status 4 !!");
        return;
    }
    require("../injectMethod")(data, res.statusCode, res);
  },
  getBillsOfStoreByStatus: async (req, res, next) => {
    const { _id, owner } = res.locals.haohoa;
    const { status } = req.params;
    const data = await invoiceService.getInvoiceOfStoreByStatus(owner, Number(status));
    // res.json(data)
   
    data.data.forEach((element) => {
      element.productDetails.stock = element.productDetails.stock.filter(
        (stock) => stock.size == element.size && stock.color == element.color
      );
      element.productDetails = element.productDetails;
    });
    require("../injectMethod")(data, res.statusCode, res);
  },
  
};

module.exports = invoiceController;
