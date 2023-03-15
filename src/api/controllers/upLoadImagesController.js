const { v4 } = require("uuid");
//////////////////////
const sharp = require("sharp");
const path = require("path");

const upLoadController = {
  //GET /api/upLoadOne
  upLoadOne: async (req, res, next) => {
    if (req.file == null) {
      res.json({
        err: "Server has not received images yet",
      });
      return;
    }
    toFile(req.file.buffer).then((data) => {
      require("../injectMethod")(
        {
          status: "success",
          data: {
            link: `http://pes.store/images/${data}`,
          },
        },
        res.statusCode,
        res
      );
    });
  },
  upLoadMany: async (req, res, next) => {
    const arrLink = [];
    let linkImage = "";
    console.log(req.files);
    if (req.files.length == 0) {
      res.json({
        err: "Server has not received images yet",
      });
      return;
    }
    // req.files.forEach(async (element) => {
    //   const data = await toFile(element.buffer);
    //   linkImage = `http://pes.store/images/${data}`;
    //   arrLink.push(linkImage);
    //   console.log('b')
    // });
    // console.log('c')

    // for(let i = 0; i < this.length; i++) {
    //   anonymous()///
    // }


    await Promise.all(req.files.map(async (element) => {
      const data = await toFile(element.buffer);
      linkImage = `http://pes.store/images/${data}`;
      arrLink.push(linkImage);
    }));
    require("../injectMethod")(
      {
        status: "success",
        data: arrLink,
      },
      res.statusCode,
      res
    );

  },
};

const toFile = async (buffer) => {
  const fileName = `${v4()}.png`;
  const imagePath = path.join(__dirname, "..", "..", "..", "public", "images");
  const filePath = path.resolve(`${imagePath}/${fileName}`);
  await sharp(buffer).toFile(filePath);
  console.log(fileName);
  return fileName;
};

module.exports = upLoadController;
