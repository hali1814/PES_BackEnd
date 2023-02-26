const jwt = require("jsonwebtoken");
const api_response = {
  status: "failure",
  responseTime: new Date(),
  statusCode: 403,
  message: "You do not have permission to access our data !!",
  title: "Invalid Token",
};

const authorizeToken = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) res.status(403).json(api_response)

  const token = authorization.split(" ")[1];
  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_API)
    res.locals.haohoa = data;

    next()
  }catch(err) {
    res.status(403).json(api_response)
  }



};

module.exports = authorizeToken;
