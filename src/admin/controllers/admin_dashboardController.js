const dashboardService = require("../service/admin_dashboardService");
const userService = require("../service/admin_loginService");
/////////////////

//////////////////////

const admin_dashboardController = {
  //GET /api/cart
  pageDashBoard: async function (req, res, next) {
    const { user } = req.session;
    const profile = await userService.getProfile(user._id);
    //moth
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const monthlyRevenue = await dashboardService.getsEarningFollowingMonth(
      currentMonth,
      currentYear
    );
    console.log(monthlyRevenue)
    //day
    const currentDay = new Date().getDate();
    const todaysRevenue = await dashboardService.getTodaysRevenue(
      currentDay,
      currentMonth,
      currentYear
    );
    //count invoice status 0

    const pendingInvoice = await dashboardService.countBillsStatus0();
    //get 12 months
    const arrMonths = [];
    for (let i = 1; i <= 12; i++) {
      // arrMonths.push(
      const tmp = await dashboardService.getsEarningFollowingMonth(
        i,
        currentYear
      );
      if (tmp[0])
        arrMonths[i - 1] = require("../../validations/formatPrice")(
          tmp[0].totalRevenue
        );
      else arrMonths.push(0);
    }
    const billToday = await dashboardService.countBillToday();

    res.render("dashboard", {
      nickName: profile.nickName,
      avatar: profile.avatar,
      userName: profile.userName,
      monthlyRevenue: require("../../validations/formatPrice")(
        monthlyRevenue[0]?.totalRevenue || 0
      ),
      todaysRevenue: require("../../validations/formatPrice")(
        todaysRevenue[0]?.totalRevenue || 0
      ),
      pendingInvoice,
      countBillToday: billToday,
      arrMonths
    });
  },
};

module.exports = admin_dashboardController;
