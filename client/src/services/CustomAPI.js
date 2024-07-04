// apiClient.js
import axios from 'axios';
const getHeader = () =>{
  const token = localStorage.getItem('jwtToken');
  return {
    Authorization: token
  };
}

// Create an Axios instance with default settings
const apiClient = axios.create({
  baseURL: 'http://localhost:9000', 
  // timeout: 5000, 
  headers: getHeader()
});

// Custom error handler
const handleError = (error) => {
    if (error.response) {
      console.error('Server responded with an error:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  };
  // POST request with custom headers
const createUserNew = async (data, headers = {} ) => {
    try {
      const endpoint = '/user'
      const response = await apiClient.post(endpoint, data, { headers });
      return response;
    } catch (error) {
      handleError(error);
    }
  };
  
// GET request with custom headers
const fetchUserData = async (headers = {} , params = {}) => {
    try {
      const endpoint = `/user/${params.id}`;
      const response = await apiClient.get(endpoint, { headers , params});
      return response;
    } catch (error) {
      handleError(error);
    }
  };
  
  // PATCH request with custom headers
const updateUserData = async (data, headers = {}, params ={}) => {
  try {
    const endpoint = `/user/${params.id}`
    const response = await apiClient.patch(endpoint, data, { headers });
    return response;
  } catch (error) {
    handleError(error);
  }
};

// DELETE request with custom headers
const deleteUser = async ( headers = {}, params={}) => {
  try {
    const endpoint = `user/${params.id}`
    const response = await apiClient.delete(endpoint, { headers});
    return response;
  } catch (error) {
    handleError(error);
  }
};

const loginUserNew = async (data, headers = {})=>{
    try {
        const endpoint = `/login`
        const response = await apiClient.post(endpoint, data, { headers});
        return response;
      } catch (error) {
        handleError(error);
      }
};

export { createUserNew, fetchUserData, updateUserData, deleteUser, loginUserNew};
