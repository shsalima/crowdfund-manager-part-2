import axios from "axios";

const { VITE_API_URL } = import.meta.env;

export const authService = {
  login: async (credentials) => {
    const response = await axios.post(`${VITE_API_URL}/auth/login`,  credentials);
    return response.data; //// kirej3 { token, user }
  },

  register: async (userInfo) => {
    const response = await axios.post(`${VITE_API_URL}/auth/signUp`, userInfo);
    console.log(response);

    return response.data; // kirej3 { token, user }
  },
};
