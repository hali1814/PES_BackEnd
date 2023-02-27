const loginService = require("../services/loginService");
const jwt = require("jsonwebtoken");
/////////////////
const standardJson = require("../standardAPI");

//////
const loginController = {
  //POST api/login
  login: async (req, res, next) => {
    const { userName, password } = req.body;

    const data = await loginService.loginService(userName);
    if (data.status == "success") {
      if (!data.data) {
        const content = {
          message: `You have entered an invalid username or password.`,
          title: "Invalid username",
        };
        res.json(standardJson.jsonFailure(content, res.statusCode));
      } else {
        if (data.data.password == password) {
          //success
          if (data.data.status != "0") {
            res.json(
              standardJson.jsonFailure(
                { message: "Your account has been banned !!" },
                res.statusCode
              )
            );
            return;
          }

          const { nickName, userName } = data.data;
          const token = jwt.sign(
            { nickName, userName },
            process.env.ACCESS_TOKEN_API
          );
          const content = {
            token: token,
            title: "login successfully !!",
            nickName: data.data.nickName,
          };
          res.json(standardJson.jsonSuccess(content, res.statusCode));
        } else {
          const content = {
            message: `You have entered an invalid username or password.`,
            title: "Invalid username",
          };
          res.json(standardJson.jsonFailure(content, res.statusCode));
        }
      }
    } else {
      res.json(data);
    }
  },
  //
};

module.exports = loginController;
