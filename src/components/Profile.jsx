import React, { useState } from 'react'
import { IoArrowBack } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux'
import { setShowProfile } from '../redux/profileSlice'
import { IoMdLogOut } from "react-icons/io"
import InputEdit from './profile/InputEdit'
import { updateUser,uploadProfilePic } from '../api/auth'
import { toast } from 'react-toastify'
import { setUserNameAndBio } from '../redux/ActiveUserSlice'
import { TbEdit } from 'react-icons/tb'
function Profile(props) {
  const dispatch = useDispatch()
  const [profilePic, setProfilePic] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeVYSW_Oin9h4Jv-7UScrFRrgiok2KuV-0_g&s');

  const { showProfile } = useSelector((state) => state.profile)
  const activeUser = useSelector((state) => state.activeUser)
  const [formData, setFormData] = useState({
    name: activeUser.name,
    bio: activeUser.bio
  })
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Assuming you have a function to upload the file and get the URL
      const profilePicUrl = await uploadProfilePic(file);
      setProfilePic(profilePicUrl);
      // You may also want to update this in the state or database
    }
  };
  const logoutUser = () => {
    toast.success("Logout Successfull!")
    localStorage.removeItem("userToken")
    window.location.href = "/login"
  }
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const submit = async () => {

    dispatch(setUserNameAndBio(formData))
    toast.success("Updated!")
    await updateUser(activeUser.id, formData)

  }

  return (

    <div style={{ transition: showProfile ? "0.3s ease-in-out" : "" }} className={props.className}>
      <div className='absolute  w-[100%]'>
        <div className='bg-[#166e48] pt-12 pb-3'>
          <button onClick={() => dispatch(setShowProfile(false))} className='flex items-center'>
            <IoArrowBack style={{ color: "#fff", width: "30px", height: "20px" }} />
            <h6 className='text-[16px] text-[#fff] font-semibold'>Profile</h6>
          </button>
        </div>
        <div className=' pt-5'>
          <div className='flex items-center flex-col'>
          <img src={profilePic} alt="Profile" className='w-[50px] h-[50px] rounded-full' />
          <label className='cursor-pointer'>
            <TbEdit className='w-[21px] h-[21px]' />
            <input type="file" className='hidden' onChange={handleFileChange} />
          </label>
          </div>
          <InputEdit type="name" handleChange={handleChange} input={formData.name} handleSubmit={submit} />

          <div>

            <div className='py-5 px-4'>
              <p className='text-[10px] tracking-wide text-[#3b4a54] '>
                This is not your username or pin. This name will be visible to your contacts
              </p>
            </div>

          </div>
          <InputEdit type="bio" handleChange={handleChange} input={formData.bio} handleSubmit={submit} />
        </div>

        <div onClick={logoutUser} className='flex items-center justify-center mt-5 cursor-pointer shadow-2xl'>
          <IoMdLogOut className='text-[#e44d4d] w-[27px] h-[23px]' />
          <h6 className='text-[17px] text-[#e44d4d] font-semibold'>Logout</h6>
        </div>
      </div>
    </div>
  )
}

export default Profile