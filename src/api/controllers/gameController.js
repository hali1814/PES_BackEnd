const gameService = require("../services/gameService");
const loginService = require("../services/loginService");
const jwt = require("jsonwebtoken");
const standardJson = require("../standardAPI");
/////////////////

//////////////////////

const gameController = {
  loginGame: async (req, res, next) => {
    const { userName, password } = req.body;

    const data = await loginService.loginService(userName);
    if (data.status == "success") {
      if (!data.data) {
        const content = {
          message: `You have entered an invalid username or password.`,
          title: "Invalid username",
        };
        res.json(standardJson.jsonFailure(content, res.statusCode));
        return;
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
          //success login
          const { nickName, userName, _id } = data.data;
          const token = jwt.sign(
            { nickName, userName, _id },
            process.env.ACCESS_TOKEN_API
          );

          const content = {
            character: false,
            token: token,
            title: "login successfully !!",
            informationCharacter: {}
          };

          const getCharacter = await gameService.login(_id);
          if (getCharacter.data.length) {
            content.character = true,
            content.informationCharacter = {
              name : getCharacter.data[0].name,
              stamina: getCharacter.data[0].stamina,
              gold: getCharacter.data[0].gold,
              lastPosition: getCharacter.data[0].lastPosition,
            }
          }


          res.json(standardJson.jsonSuccess(content, res.statusCode));
        } else {
          const content = {
            message: `You have entered an invalid username or password.`,
            title: "Invalid username",
          };
          res.json(standardJson.jsonFailure(content, res.statusCode));
          return;
        }
      }
    } else {
      res.json(data);
    }
  },
  registerCharacter: async (req, res, next) => {
    const { name } = req.body;
    const dataToken = res.locals.haohoa;
    const data = await gameService.register(dataToken._id, name)
    console.log(data.data)
    require('../injectMethod')(data, res.statusCode, res)
  },
  updateGold: async (req, res, next) => {
    const dataToken = res.locals.haohoa;
    const data = await gameService.updateGold(dataToken._id, req.body)
    require('../injectMethod')(data, res.statusCode, res)
  },
  getAsset: async (req, res, next) => {
    const dataToken = res.locals.haohoa;
    const data = await gameService.getAsset(dataToken._id)

    require('../injectMethod')(data, res.statusCode, res)
  }
};

module.exports = gameController;
