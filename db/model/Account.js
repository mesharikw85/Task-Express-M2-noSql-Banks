const { model, Schema } = require("mongoose");

const AccountSchema = new Schema(
  {
    username: { type: String, require: true },
    funds: { type: Number, default: 0 },
  },
  { timestamps: true }
);
module.exports = model("Account", AccountSchema);
