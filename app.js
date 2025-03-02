const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes");
const db = require("./models");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.use(errorHandler);

db.sequelize
  .authenticate()
  .then(async (result) => {
    app.listen(process.env.PORT, () => {
      console.log(`Server listening at PORT ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.toString());
  });
