let accounts = require("../../accounts");
const Account = require("../../db/model/Account");

exports.accountCreate = async (req, res) => {
  try {
    const newAccount = await Account.create(req.body);
    return res.status(201).json(newAccount);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      details: error.message,
      error: error,
    });
  }

  // const id = accounts[accounts.length - 1].id + 1;
  // const newAccount = { ...req.body, funds: 0, id };
  // accounts.push(newAccount);
  // res.status(201).json(newAccount);
};

exports.accountDelete = async (req, res) => {
  try {
    const accountId = req.params;
    const foundAccount = await Account.findById(accountId);

    if (foundAccount) {
      Account.findOneAndDelete({ _id: accountId });
      return res.status(204).end();
    } else {
      return res.status(404).json({ message: "This account doesn't exist" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }

  // const { accountId } = req.params;
  // const foundAccount = accounts.find((account) => account.id === +accountId);
  // if (foundAccount) {
  //   accounts = accounts.filter((account) => account.id !== +accountId);
  //   res.status(204).end();
  // } else {
  //   res.status(404).json({ message: "Account not found" });
  // }
};

exports.accountUpdate = async (req, res) => {
  try {
    const { accountId } = req.params;
    const foundAccount = await Account.findById(accountId);
    if (foundAccount) {
      Account.findByIdAndUpdate(accountId, req.body, {
        new: true,
        runValidators: true,
      });
      return res.status(204).json(foundAccount);
    } else {
      return res.status(404).json({ msg: "not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: message });
  }

  // try {
  //   const { accountId } = req.params;
  //   const foundAccount = await Account.findById(accountId);
  //   if (foundAccount) Account.findByIdAndUpdate
  //   return res.status(404).json({ msg: "not found" });
  //   return res.status(200).json(foundAccount);
  // } catch (error) {
  //   return res.status(500).json({ message: "somthing wrong", error: message });
  // }

  // const { accountId } = req.params;
  // const foundAccount = accounts.find((account) => account.id === +accountId);
  // if (foundAccount) {
  //   foundAccount.funds = req.body.funds;
  //   res.status(204).end();
  // } else {
  //   res.status(404).json({ message: "Account not found" });
  // }
};

exports.accountsGet = (req, res) => {
  res.json(accounts);
};

exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
  if (req.query.currency === "usd") {
    const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
    res.status(201).json(accountInUsd);
  }
  res.status(201).json(foundAccount);
};
