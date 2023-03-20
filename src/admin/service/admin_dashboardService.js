const invoiceModel = require("../../utils/models/invoice");

const admin_dashboardService = {
  getsEarningFollowingMonth: async function (currentMonth, currentYear) {
    try {
      const instance = await invoiceModel.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                { $eq: [{ $year: "$createdAt" }, currentYear] },
                { $eq: [{ $month: "$createdAt" }, currentMonth] },
              ],
            },
            status: 3,
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$amount" },
          },
        },
      ]);
      return instance;
    } catch (err) {
      console.log(
        "admin_dashboardService.getsEarningFollowingMonth",
        err.toString()
      );
      return "error";
    }
  },
  getTodaysRevenue: async function (currentDay, currentMonth, currentYear) {
    try {
      const instance = await invoiceModel.aggregate([
        {
          $match: {
            $expr: {
              $and: [
                { $eq: [{ $year: "$createdAt" }, currentYear] },
                { $eq: [{ $month: "$createdAt" }, currentMonth] },
                { $eq: [{ $dayOfMonth: "$createdAt" }, currentDay] },
              ],
            },
            status: 3,
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$amount" },
          },
        },
      ]);
      ///
      return instance;
    } catch (err) {
      console.log(
        "admin_dashboardService.getsEarningFollowingMonth",
        err.toString()
      );
      return "error";
    }
  },
  countBillsStatus0: async function () {
    try {
      const instance = await invoiceModel.countDocuments({ status: 0 });
      return instance;
    } catch (err) {
      console.log(
        "admin_dashboardService.getsEarningFollowingMonth",
        err.toString()
      );
      return "error";
    }
  },
  countBillToday: async function () {
    try {
      const instance = await invoiceModel.find({
        createdAt: {
          $gte: new Date(new Date().setHours(00, 00, 00)),
          $lte: new Date(new Date().setHours(23, 59, 59)),
        },
      });
      return instance.length;
    } catch (err) {
      console.log(
        "admin_dashboardService.getsEarningFollowingMonth",
        err.toString()
      );
      return "error";
    }
  },
  
};

module.exports = admin_dashboardService;
