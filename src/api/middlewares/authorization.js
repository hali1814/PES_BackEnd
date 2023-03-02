const jwt = require("jsonwebtoken");
const standardJson = require("../standardAPI");
const api_response = {
  status: "failure",
  responseTime: new Date(),
  statusCode: 403,
  message: "You do not have permission to access our data !!",
  title: "Invalid Token",
};

const checkLogin = async (userName, res) => {
  const user = await require("../services/loginService").loginService(userName);
  return user.data.status;
};

const authorizeToken = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization){
    res.status(403).json(api_response);
    return
  } 

  const token = authorization.split(" ")[1];
  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_API);
    if (data.userName) {
      const status = await checkLogin(data.userName, res);
      if (status == "2") {
        res.json(
          standardJson.jsonInactive(
            { message: "Your account has been disabled !!" },
            res.statusCode
          )
        );
        return;
      } else if (status == "3") {
        res.json(
          standardJson.jsonBaned(
            { message: "Your account has been banned !!" },
            res.statusCode
          )
        );
        return;
      }
    }

    res.locals.haohoa = data;
    next();
  } catch (err) {
    console.log(err, "----------------------------");
    res.status(403).json(api_response);
  }
};

module.exports = authorizeToken;
