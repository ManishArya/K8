const express = require("express");
const { connect } = require("mongoose");
const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const model = mongoose.model("city", citySchema);

async function connectToDB() {
  try {
    const connectionString = process.env.connectionString;
    await connect(connectionString, {
      dbName: process.env.dbName,
      user: process.env.user,
      pass: process.env.pass,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.info("connect to db");
  } catch (error) {
    console.error(error);
  }
}

async function startApp() {
  await connectToDB();

  const app = express();
  app.use(express.json());
  app.set("view engine", "ejs");

  app.get("/", async (req, res) => {
    const cities = await model.find({}, { _id: 0 });
    res.render("index", { cities });
  });

  app.post("/", async (req, res) => {
    const cities = req.body.cities;
    await model.insertMany(cities);
    res.send();
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.info(`App listening on port ${port}!`));
}

startApp();
