const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
const errorHandler = require("./middleware/errorHandler");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const { isAuth } = require("./middleware/authHandler");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users",isAuth, userRouter);
app.use("/api/v1/product", isAuth, productRouter);

app.use(errorHandler);

db.sequelize
  .authenticate()
  .then(async (result) => {
    app.listen(process.env.PORT, () => {
      console.log(`Server listening at PORT ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.toString());
  });
