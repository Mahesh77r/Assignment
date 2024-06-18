import axios from 'axios';

// const URL = 'https://assignment-ed6x.onrender.com';
const LOCALURL = 'http://localhost:8080';

export const login = async(data) => {
    try{
       return await axios.post(`${LOCALURL}/login`,data);
    }
    catch(err){
        console.log("Error occurs while running login User function",err);
    }
};
