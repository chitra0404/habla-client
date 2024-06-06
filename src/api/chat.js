import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = "https://habla-server.onrender.com";

const API = (token) => axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${token}` },  // Ensure the token is formatted correctly
});

export const acessCreate = async (body) => {
  try {
    const token = localStorage.getItem('userToken');
    const { data } = await API(token).post(`${baseURL}/api/chat/access`, body);
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error in access create API:', error);
    toast.error('Failed to create access. Please try again.');
    throw error;
  }
};

export const fetchAllChats = async () => {
  try {
    const token = localStorage.getItem('userToken');
    const { data } = await API(token).get(`${baseURL}/api/chat/`);
    return data;
  } catch (error) {
    console.error('Error in fetch all chats API:', error);
    toast.error('Failed to fetch chats. Please try again.');
    throw error;
  }
};

export const createGroup = async (body) => {
  try {
    const token = localStorage.getItem('userToken');
    const { data } = await API(token).post(`${baseURL}/api/chat/group`, body);
    console.log("data", data);
    toast.success(`${data.chatName} Group Created`);
    return data;
  } catch (error) {
    console.error('Error in create group API:', error);
    toast.error('Failed to create group. Please try again.');
    throw error;
  }
};

export const addToGroup = async (body) => {
  try {
    const token = localStorage.getItem('userToken');
    const { data } = await API(token).patch(`${baseURL}/api/chat/groupAdd`, body);
    return data;
  } catch (error) {
    console.error('Error in add to group API:', error);
    toast.error('Failed to add to group. Please try again.');
    throw error;
  }
};

export const renameGroup = async (body) => {
  try {
    const token = localStorage.getItem('userToken');
    const { data } = await API(token).patch(`${baseURL}/api/chat/group/rename`, body);
    return data;
  } catch (error) {
    console.error('Error in rename group API:', error);
    toast.error('Failed to rename group. Please try again.');
    throw error;
  }
};

export const removeUser = async (body) => {
  try {
    const token = localStorage.getItem('userToken');
    const { data } = await API(token).patch(`${baseURL}/api/chat/groupRemove`, body);
    return data;
  } catch (error) {
    console.error('Error in remove user API:', error);
    toast.error('Failed to remove user. Please try again.');
    throw error;
  }
};
