const { v4 } = require("uuid");
//////////////////////
const sharp = require("sharp");
const path = require('path')

const upLoadController = {
  //GET /api/upLoadOne
  upLoadOne: async (req, res, next) => {
    if (req.file == null) {
      res.json({
        err: "loi gi roi do",
      });
      return;
    }
    toFile(req.file.buffer).then((data) => {
      require("../injectMethod")(
        {
          status: "success",
          data: {
            link: `http://pes.store/images/${data}`,
          }
        },
        res.statusCode,
        res
      );
    });
  },
};

const toFile = async (buffer) => {
  const fileName = `${v4()}.png`;
  const imagePath = path.join(__dirname, '..', '..', '..', 'public', 'images');
  const filePath = path.resolve(`${imagePath}/${fileName}`);
  await sharp(buffer).toFile(filePath);
  console.log(fileName);
  return fileName;
};

module.exports = upLoadController;
