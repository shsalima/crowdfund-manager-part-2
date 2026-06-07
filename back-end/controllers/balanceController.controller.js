// import Balance from "../models/balance.js";

// export const createBalance = async (req, res) => {
//   try {
//     const { amount } = req.body;

//     if (amount == null || amount < 0) {
//       return res
//         .status(400)
//         .json({ message: "amount import et supérieur à 0" });
//     }

//     // kaycheck wach déjà kayn :chi balance 3and had investor
//     const existBalance = await Balance.findOne({
//       user: req.user.user._id,
//     });

//     if (existBalance) {
//       return res.status(400).json({ message: "balance déjà trouvé" });
//     }
//     const balance = await Balance.create({
//       user: req.user.user._id,
//       amount: amount,
//     });
//     res.status(201).json(balance);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const getBalance = async (req, res) => {
//   try {
//     const balance = await Balance.findOne({
//       user: req.user.user._id,
//     });
//     if (!balance) {
//       return res.status(404).json({ message: "balance non trouvé" });
//     }
//     res.status(200).json(balance);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
import Balance from "../models/balance.js";

export const createBalance = async (req, res) => {
  try {
    const { amount } = req.body;
    console.log(
      "createBalance called with amount:",
      amount,
      "user:",
      req.user?.user?._id || req.user?.userId,
    );

    if (amount == null || amount <= 0) {
      return res.status(400).json({
        message: "amount important et supérieur à 0",
      });
    }

    let balance = await Balance.findOne({
      user: req.user.user._id,
    });

    // First deposit
    if (!balance) {
      balance = await Balance.create({
        user: req.user.user._id,
        amount,
      });
    } else {
      // Additional deposits
      balance.amount += amount;
      console.log(
        "Adding amount to balance:",
        amount,
        "=> new amount will be:",
        balance.amount,
      );
      await balance.save();
    }

    console.log("Returning balance:", balance);
    res.status(200).json(balance);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getBalance = async (req, res) => {
  try {
    const balance = await Balance.findOne({
      user: req.user.user._id,
    });

    if (!balance) {
      return res.status(404).json({
        message: "balance non trouvé",
      });
    }

    res.status(200).json(balance);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
