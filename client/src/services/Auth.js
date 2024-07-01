import axios from "axios";

// const URL = 'https://assignment-ed6x.onrender.com';
const LOCALURL = "http://localhost:9000";
const token = localStorage.getItem("jwtToken");

export const login = async (data) => {
  try {
    return await axios.post(`${LOCALURL}/login`, data);
  } catch (err) {
    console.log("Error occurs while running login User function", err);
  }
};

export const generateToken = async (id) => {
  try {
    console.log(token);
    return await axios.post(
      `${LOCALURL}/generatetoken/${id}`, 
      {}, 
      {
        headers: {
          Authorization: `${token}`,
        }
      }
    );
  } catch (err) {
    console.log("Error occurs while running generating Token function", err);
  }
};


export const resetPassword = async (token,data) => {
  try {
    return await axios.post(`${LOCALURL}/resetpassword/${token}`, data);
  } catch (err) {
    console.log("Error occurs while running reset Password function", err);
  }
};
