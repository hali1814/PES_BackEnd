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
          if (data.data.status == "3") {
            res.json(
              standardJson.jsonBaned(
                { message: "Your account has been banned !!" },
                res.statusCode
              )
            );
            return;
          }

          //success
          if (data.data.status == "2") {
            res.json(
              standardJson.jsonInactive(
                { message: "Your account is inactive !!" },
                res.statusCode
              )
            );
            return;
          }

          const { nickName, userName, _id } = data.data;
          const token = jwt.sign(
            { nickName, userName, _id },
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
  //GET api/profile
  getProfiles: async (req, res, next) => {
    const dataToken = res.locals.haohoa;
    const data = await loginService.loginService(dataToken.userName);
    data.data.password = undefined;
    data.data.vouchers = undefined;
    require("../injectMethod")(data, res.statusCode, res);
  },
  //GET api/vouchers
  getVouchers: async (req, res, next) => {
    const dataToken = res.locals.haohoa;
    const data = await loginService.getVouchers(dataToken.userName);
    require("../injectMethod")(data, res.statusCode, res);
  },
  //GET api/logout
  logout: async (req, res, next) => {
    res.json(standardJson.jsonSuccess({ message: "OK" }, res.statusCode));
  },
  //GET api//change_password
  changePassword: async (req, res, next) => {
    const { password, newPassword } = req.body;
    const username = res.locals.haohoa.userName;
    const data = await loginService.changePassWord(
      password,
      newPassword,
      username
    );
    if (data.data)
      res.json(
        standardJson.jsonSuccess(
          { message: "Change password successfully !!" },
          res.statusCode
        )
      );
    else
      res.json(
        standardJson.jsonFailure(
          { message: "wrong password !!!", title: "wrong password" },
          res.statusCode
        )
      );
  },
  //POST api/update/profiles
  updateProfile: async (req, res, next) => {
    const username = res.locals.haohoa.userName;
    const data = await loginService.updateProfile(username, req.body);
    if (data.data)
      res.json(
        standardJson.jsonSuccess(
          { message: "Change profiles successfully !!" },
          res.statusCode
        )
      );
    else
      res.json(
        standardJson.jsonFailure(
          { message: data.err.toString() },
          res.statusCode
        )
      );
  },
  register: async (req, res, next) => {
    const data = await loginService.registerAccount(req.body);
    if (data.status == "success")
      res.json(
        standardJson.jsonSuccess(
          {
            message: "Register account successfully !!",
            account: data.data.userName,
          },
          res.statusCode
        )
      );
    else res.json(data);
  },
  addVoucher: async (req, res, next) => {
    const tokenData = res.locals.haohoa;
    const { idVoucher, quantity } = req.body;
    const data = await loginService.addVoucher(
      idVoucher,
      quantity,
      tokenData._id
    );
    require('../injectMethod')(data, res.statusCode, res)
  },
};

module.exports = loginController;
