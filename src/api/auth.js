import axios from 'axios';
import {toast} from 'react-toastify';
import env from 'react-dotenv';
const Api=(token)=>axios.create({
    base_URL:" http://localhost:3000",
    headers:{Authorization:token},});
    let url= "http://localhost:8080"

    export const loginUser=async (body)=>{
try{
    return await axios.post(`${url}/api/login`,body);
}catch(error){
    console.log('error in login');}
    }

    export const registerUser=async(body)=>{ 
        // try{
             await axios.post(`${url}/api/register`,body)
             .then(res=>console.log(res));
              
        // }catch(error){
        //     console.log('error in register');}
    }
    export const validUser=async()=>{
        try{
            const token=localStorage.getItem('userToken');
            const {data}=await Api(token).get(`/api/valid`,{headers:{Authorization:token},})
            return data;
        }catch(error){
            console.log("valid user error");
        }
    }
    export const searchUsers = async (id) => {
      try {
        const token = localStorage.getItem('userToken');
    
        return await Api(token).get(`/api/user?search=${id}`);
      } catch (error) {
        console.log('error in search users api');
      }
    };

    export const updateUser=async (id,body)=>{
        try{
        const token = localStorage.getItem('userToken');
        
    const { data } = await Api(token).patch(`/api/update/${id}`, body);
    return data;
  } catch (error) {
    console.log('error in update user api');
    toast.error('Something Went Wrong.try Again!');
  }
    }

    export const checkValid = async () => {
        const data = await validUser();
        if (!data?.user) {
          window.location.href = '/login';
        } else {
          window.location.href = '/chats';
        }
      };