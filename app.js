let accounts = require("./accounts");
const express = require("express");
const connectDb = require("./database");
const dotEnv = require("dotenv");
dotEnv.config();
const app = express();
connectDb();
const accountsRoutes = require("./api/accounts/accounts.routes");
const { connect } = require("mongoose");

app.use(express.json());
app.use("/accounts", accountsRoutes);

app.listen(process.env.PORT, () => {
  console.log("The application is running on localhost:8000");
});

//hSIrClXSCco5cziz
