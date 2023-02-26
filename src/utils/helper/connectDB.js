const mongoose = require("mongoose");
require("dotenv").config();

// main().catch(err => console.log(err));s
const adminPassword = encodeURIComponent(process.env.PASS_DATABASE);
mongoose.set("strictQuery", false);
async function main() {
  try {
    const data = await mongoose.connect(
      `mongodb+srv://tanhao1852k:${adminPassword}@pes.mdvakj5.mongodb.net/SHOPES?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    if (data) console.log("connect successfully !!!!!");
  } catch (err) {
    console.log("connect unsuccessfully !!!!", err);
  }
}

module.exports = main;
