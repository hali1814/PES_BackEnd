

/////////////////

//////////////////////

const admin_billController = {

  getAllBills: async function (req, res, next) {
    
    res.render("bills");
  },
  getAllPendingBills: async function (req, res, next) {
    
    res.render("confirmBills");
  },
};

module.exports = admin_billController;
