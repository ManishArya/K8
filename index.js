const express = require("express");
const { connect } = require("mongoose");
const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const model = mongoose.model("city", citySchema);

const app = express();
app.set('view engine', 'ejs')

const connectionString = process.env.connectionString;

connect(connectionString, {
  dbName: process.env.dbName,
  user: process.env.user,
  pass: process.env.pass,
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() => console.info("connected to db"));

app.get("/api", async (req, res) => {
 const cities = await model.find({}, { _id: 0 });
 res.render('index',{ cities})
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));
