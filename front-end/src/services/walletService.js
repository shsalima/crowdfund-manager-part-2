import axios from "axios";

const API_URL = "http://localhost:3001/api/balance/createBalance";

export const deposit = async (amount) => {
  const token = localStorage.getItem("token");
  try {
    console.log("walletService: sending deposit", Number(amount));
    const res = await axios.post(
      API_URL,
      { amount: Number(amount) },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log("walletService: response", res.data);
    return res.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || err.message || "Deposit failed";
    console.error("walletService deposit error:", errorMessage);
    throw new Error(errorMessage);
  }
};
