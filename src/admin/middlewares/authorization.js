// const standardJson = require("../standardAPI");
// const api_response = {
//   status: "failure",
//   responseTime: new Date(),
//   statusCode: 403,
//   message: "You do not have permission to access our data !!",
//   title: "Invalid Token",
// };


const authorizeSession = async (req, res, next) => {
  try {
    const { user } = req.session
    if (!user) res.redirect('/')
    else {
        next();
    }
    
  } catch (err) {
    console.log(err, "----------------------------");
    res.status(403).json(api_response);
  }
};

module.exports = authorizeSession;
