var express = require("express");
var router = express.Router();
///////////////////////Controller
let gameController = require("../controllers/gameController");

//GET /api/game/login
router.post("/game/login", gameController.loginGame);

//GET /api/game/login
router.get(
  "/game/asset",
  require("../middlewares/authorization"),
  gameController.getAsset
);

//GET /api/game/register
router.post(
  "/game/register",
  require("../middlewares/authorization"),
  gameController.registerCharacter
);

router.post(
  "/game/gold/stamina/update",
  require("../middlewares/authorization"),
  gameController.updateGold
);

module.exports = router;
