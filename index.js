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
const connectionString = "mongodb://localhost:27017";

connect(connectionString, {
  dbName: process.env.dbName || "Sample",
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() => console.info("connected to db"));

app.get("/api", async (req, res) => {
  const cities = await model.find({}, { _id: 0 });
  res.send(cities);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on port ${port}!`));
