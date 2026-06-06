import axios from "axios";

const API_URL = "http://localhost:3001/api/balance/createBalance";

export const deposit = async (amount) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    API_URL,
    { amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};
