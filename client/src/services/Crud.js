import axios from 'axios';

const URL = 'https://assignment-ed6x.onrender.com';
// const LOCALURL = 'http://localhost:8080';


const token = localStorage.getItem('jwtToken');

export const fetchUser = async (id) => {
  id = id || '';
  try {
    return await axios.get(`${URL}/user/${id}`,{
      headers: {
          'Authorization': `${token}`
      }
  });
  }
  catch (err) {
    console.log("Error occurs while running fetching ", err);
  }
};

export const createUser = async (formdata) => {
  try {
    console.log(formdata)

    return await axios.post(`${URL}/user`, formdata,{
      headers: {
          'Authorization': `${token}`
      }
  })
  }
  catch (err) {
    console.log(formdata)
    console.log(`Error occur during adding  ${err}`)
  }
};

export const updateUser = async (id, formdata) => {
  id = id || '';

  try {
    return await axios.patch(`${URL}/user/${id}`, formdata,{
      headers: {
          'Authorization': `${token}`
      }
  })
  } catch (error) {
    console.log(`Error occur during updating  ${error}`)


  }
};

export const deleteUser = async (id) => {
  id = id || '';

  try {
    return await axios.delete(`${URL}/user/${id}`,{
      headers: {
          'Authorization': `${token}`
      }
  })
  } catch (error) {
    console.log(`Error occur during deleting  ${error}`)
  }
};