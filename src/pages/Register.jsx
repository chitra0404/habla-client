import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { validUser } from "../api/auth";
import { toast } from "react-toastify";
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
    <div className="flex justify-center items-center h-screen bg-[#222222]">
      <VStack spacing={6} alignItems="flex-start">
        <FormControl id="name" isRequired>
        <p className='text-[#fff] text-[12px] tracking-wider font-medium'>Have Account ? <Link className='text-[rgba(0,195,154,1)] underline' to="/login">Sign in</Link></p>

          <FormLabel>Full Name</FormLabel>
          <Input
            name="name"
            onChange={handleOnChange}
            value={userData.name}
            placeholder="eg. Chitra Suresh"
            className="w-full px-3 py-2 rounded border focus:outline-none focus:border-indigo-500"
          />
        </FormControl>

        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            onChange={handleOnChange}
            value={userData.email}
            placeholder="eg. John.Doe@outlook.com"
            className="w-full px-3 py-2 rounded border focus:outline-none focus:border-indigo-500"
          />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={handleOnChange}
              name="password"
              value={userData.password}
              className="w-full px-3 py-2 rounded border focus:outline-none focus:border-indigo-500"
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
          bg="#1d1931"
          colorScheme="green"
          color="#fff"
          onClick={handleOnSubmit}
          isLoading={isLoading}
          className="px-4 py-2 rounded text-white hover:bg-green-600 focus:outline-none focus:bg-green-600"
        >
          Register
        </Button>
      </VStack>
    </div>
  );
}

export default Register;
