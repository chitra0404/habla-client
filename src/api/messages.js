import axios from 'axios';

const baseURL="https://habla-server.onrender.com";
const API = (token) =>
  axios.create({
    baseURL,
    headers: { Authorization: token },
  });
export const sendMessage = async (body) => {
  try {
    const token = localStorage.getItem('userToken');
    const { data } = await API(token).post(`${baseURL}/api/msg/message`, body);
    return data;
  } catch (error) {
    console.log('error in sendmessage api' + error);
  }
};
export const fetchMessages = async (id) => {
  try {
    const token = localStorage.getItem('userToken');

    const { data } = await API(token).get(`${baseURL}/api/msg/${id}`);
    return data;
  } catch (error) {
    console.log('error in fetch Message API ' + error);
  }
};