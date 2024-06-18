import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { validUser } from "../api/auth";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import axios from "axios";

const defaultValues = {
  name: "",
  email: "",
  password: "",
};

function Register() {
  const [userData, setUserData] = useState(defaultValues);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleOnChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (userData.email.includes("@") && userData.password.length > 6) {
      try {
        const response = await axios.post(
          "https://habla-server.onrender.com/api/register",
          userData
        );
        if (response && response.data && response.data.token) {
          localStorage.setItem("userData", response.data.token);
          toast.success("Successfully registered");
          setIsLoading(false);
          setUserData(defaultValues);  // Clear input fields after successful registration
        } else {
          setIsLoading(false);
          toast.error("Invalid Credentials");
        }
      } catch (error) {
        console.error("Registration Error:", error);
        setIsLoading(false);
        toast.error("An error occurred during registration");
      }
    } else {
      setIsLoading(false);
      toast.warning("Provide valid credentials");
      setUserData({ ...userData, password: "" });
    }
  };

  useEffect(() => {
    const isValid = async () => {
      const data = await validUser();
      if (data?.user) {
        window.location.href = "/chats";
      }
    };
    isValid();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className='w-1/2 h-full'>
        <img
          src="https://play-lh.googleusercontent.com/nHN4poXcIWaJiocdnPlDckTGcRYsn-d6RNoYtsmbf1ddMw6n4W6wn7JBBVbjy3tMMQ"
          alt="Login Image"
          className="object-cover w-[50%] h-[75%] mt-10 ml-40 z-1"
        />
      </div>
      <Box className="w-full max-w-md p-6 rounded">
        <VStack spacing={6} alignItems="center" className="w-full">
          <FormControl id="name" isRequired>
            <p className='text-[#fff] text-[12px] tracking-wider font-medium mb-2 text-center'>
              Have Account? <Link className='text-[rgba(0,195,154,1)] underline' to="/login">Sign in</Link>
            </p>
            <Input
              name="name"
              onChange={handleOnChange}
              value={userData.name}
              placeholder="Full Name"
              className="w-full bg-[#222222] h-[70px] pl-3 text-[#ffff]"
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <Input
              name="email"
              onChange={handleOnChange}
              value={userData.email}
              placeholder="Email"
              className="w-full bg-[#222222] h-[70px] pl-3 text-[#ffff]"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                placeholder="Password"
                onChange={handleOnChange}
                name="password"
                value={userData.password}
                className="w-full bg-[#222222] h-[70px] pl-3 text-[#ffff]"
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShow(!show)}
                  className="rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-gray-400"
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            style={{ background: 'linear-gradient(90deg, rgba(0,78,154,1) 0%, rgba(0,99,78,1) 100%)' }}
            size="md"
            bg="blue.500"  // Set the button color to blue
            color="#000"
            onClick={handleOnSubmit}
            isLoading={isLoading}
            className="w-[75px] h-[50px]"  // Apply w-full to match the input width
          >
            Register
          </Button>
        </VStack>
      </Box>
      <ToastContainer />
    </div>
  );
}

export default Register;
