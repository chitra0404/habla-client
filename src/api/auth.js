import axios from 'axios';
import { toast } from 'react-toastify';

const apiUrl = "https://habla-server.onrender.com";

const Api = (token) => axios.create({
    baseURL: apiUrl,
    headers: { Authorization: `Bearer ${token}` },
});

export const loginUser = async (body) => {
    try {
        return await axios.post(`${apiUrl}/api/login`, body);
    } catch (error) {
        console.error('Error in login:', error);
        throw error;
    }
};

export const registerUser = async (body) => {
    try {
        const response = await axios.post(`${apiUrl}/api/register`, body);
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error in register:', error);
        throw error;
    }
};

export const validUser = async () => {
    try {
        const token = localStorage.getItem('userToken');
        const { data } = await Api(token).get(`${apiUrl}/api/valid`);
        return data;
    } catch (error) {
        console.error('Valid user error:', error);
        throw error;
    }
};

export const searchUsers = async (query) => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await axios.get(`${apiUrl}/api/user`, {
        params: { search: query },
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('API Response:', response.data); // Log response data
      return response.data; // Return the actual data
    } catch (error) {
      console.error('Error in search users API:', error.response?.data || error.message);
      throw error;
    }
  };

export const updateUser = async (id, body) => {
    try {
        const token = localStorage.getItem('userToken');
        const { data } = await Api(token).patch(`${apiUrl}/api/update/${id}`, body);
        return data;
    } catch (error) {
        console.error('Error in update user API:', error);
        toast.error('Something went wrong. Try again!');
        throw error;
    }
};

export const checkValid = async () => {
    const data = await validUser();
    if (!data?.user) {
        window.location.href = '/login';
    } else {
        window.location.href = '/chats';
    }
};
export const uploadProfilePic = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset'); // if using a service like Cloudinary
  
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.secure_url; // Return the URL of the uploaded image
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      return null;
    }
  };