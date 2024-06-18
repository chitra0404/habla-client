import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { loginUser } from '../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import { BsEmojiLaughing, BsEmojiExpressionless } from 'react-icons/bs';
import { toast } from 'react-toastify';

const defaultData = {
  email: '',
  password: ''
};

function Login() {
  const [formData, setFormData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const pageRoute = useNavigate();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.includes('@') && formData.password.length > 6) {
      setIsLoading(true);
      const { data } = await loginUser(formData);
      if (data?.token) {
        localStorage.setItem('userToken', data.token);
        toast.success('Successfully Login!');
        setIsLoading(false);
        pageRoute('/chats');
      } else {
        setIsLoading(false);
        toast.error('Invalid Credentials!');
        setFormData({ ...formData, password: '' });
      }
    } else {
      setIsLoading(false);
      toast.warning('Provide valid Credentials!');
      setFormData(defaultData);
    }
  };

  return (
    <>
      <div className='bg-black w-screen h-screen flex'>
        <div className='w-1/2 h-full'>
         
        <img
  src="https://play-lh.googleusercontent.com/nHN4poXcIWaJiocdnPlDckTGcRYsn-d6RNoYtsmbf1ddMw6n4W6wn7JBBVbjy3tMMQ"
  alt="Login Image"
  className="object-cover w-[50%] h-[75%] mt-10 ml-40 z-1"
/>
        </div>
        <div className='w-1/2 flex flex-col justify-center items-center p-8 mr-50'>
          {/* <div className='absolute -top-3 left-0 right-0 flex justify-center items-center'>
            <h3 className='text-[25px] font-bold tracking-wider text-[#fff]'>Login</h3>
          </div> */}
          <p className='text-[#fff] text-[12px] tracking-wider font-medium'>
            No Account? <Link className='text-[rgba(0,195,154,1)] underline' to='/register'>Sign up</Link>
          </p>
          <form className='flex flex-col gap-y-3 mt-12' onSubmit={formSubmit}>
            <div>
              <input
                className='w-full bg-[#222222] h-[70px] pl-3 text-[#ffff]'
                onChange={handleOnChange}
                name='email'
                type='text'
                placeholder='Email'
                value={formData.email}
                required
              />
            </div>
            <div className='relative'>
              <input
                className='w-full bg-[#222222] h-[60px] pl-3 text-[#ffff]'
                onChange={handleOnChange}
                type={showPass ? 'text' : 'password'}
                name='password'
                placeholder='Password'
                value={formData.password}
                required
              />
              {!showPass ? (
                <button type='button'>
                  <BsEmojiLaughing onClick={() => setShowPass(!showPass)} className='text-[#fff] absolute top-3 right-5 sm:right-24 w-[30px] h-[25px]' />
                </button>
              ) : (
                <button type='button'>
                  <BsEmojiExpressionless onClick={() => setShowPass(!showPass)} className='text-[#fff] absolute top-3 right-5 sm:right-24 w-[30px] h-[25px]' />
                </button>
              )}
            </div>
            <button style={{ background: 'linear-gradient(90deg, rgba(0,78,154,1) 0%, rgba(0,99,78,1) 100%)' }} className='w-full h-[50px] font-bold text-[#121418] tracking-wide text-[17px] relative' type='submit'>
              login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
