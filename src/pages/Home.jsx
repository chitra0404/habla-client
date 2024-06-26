import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers, validUser } from '../api/auth';
import { setActiveUser } from '../redux/ActiveUserSlice';
import { RiNotificationBadgeFill } from "react-icons/ri";
import { BiNotification } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { setShowNotifications, setShowProfile } from '../redux/profileSlice';
import Chat from './Chat';
import Profile from "../components/Profile";
import { acessCreate } from "../api/chat";
import { fetchChats, setNotifications, setActiveChat } from '../redux/chatSlice';
import { getSender } from '../utils/logics';
import Group from '../components/Group';
import Contacts from '../components/Contact';
import Search from '../components/group/Search';
import { BsSearch } from "react-icons/bs";
import "./Home.css";

function Home() {
    const dispatch = useDispatch();
    const { showProfile, showNotifications } = useSelector((state) => state.profile);
    const { notifications } = useSelector((state) => state.chats);
    const { activeUser } = useSelector((state) => state.activeUser);
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleClick = async (e) => {
        await acessCreate({ userId: e._id });
        dispatch(fetchChats());
        setSearch("");
    };

    useEffect(() => {
        if (search) {
            const searchChange = async () => {
                setIsLoading(true);
                try {
                    const data = await searchUsers(search);
                    console.log('Search Results:', data); // Debugging line
                    setSearchResults(data);
                } catch (error) {
                    console.error('Error during search:', error);
                } finally {
                    setIsLoading(false);
                }
            };
            searchChange();
        } else {
            setSearchResults([]);
        }
    }, [search]);

    useEffect(() => {
        const isValid = async () => {
            try {
                const data = await validUser();
                const user = {
                    id: data?.user?._id,
                    email: data?.user?.email,
                    profilePic: data?.user?.profilePic,
                    bio: data?.user?.bio,
                    name: data?.user?.name
                };
                dispatch(setActiveUser(user));
            } catch (error) {
                console.error('Error validating user:', error);
            }
        };
        isValid();
    }, [dispatch]);

    return (
        <>
            <div className="bg-pink scrollbar-hide z-10 h-[100vh] lg:w-[90%] lg:mx-auto overflow-y-hidden shadow-2xl">
                <div className='flex'>
                    {!showProfile ? (
                        <div className="md:flex md:flex-col min-w-[360px] h-[100vh] md:h-[98.6vh] bg-pink-100 relative">
                            <div className='h-[61px] px-4'>
                                <div className='flex'>
                                    <a className='flex items-center relative -top-4 block h-[90px]' href='/'>
                                        <h3 className='text-[20px] text-[#800080] font-body font-extrabold tracking-wider'>Messages</h3>
                                    </a>
                                </div>
                                <div className='absolute top-4 right-5 flex items-center gap-x-3'>
                                    <button onClick={() => dispatch(setShowNotifications(!showNotifications))} className="relative">
                                        {notifications.length > 0 ? (
                                            <RiNotificationBadgeFill style={{ width: "25px", height: "25px", color: "#319268" }} />
                                        ) : (
                                            <BiNotification style={{ color: "#319268", width: "25px", height: "25px" }} />
                                        )}
                                        {notifications.length > 0 && (
                                            <div className={`${showNotifications ? "absolute top-[-5px] right-[-5px] bg-red-500 text-white rounded-full px-1 text-xs" : "hidden"}`}>
                                                {notifications.length}
                                            </div>
                                        )}
                                    </button>
                                    <div className={`${showNotifications ? "overflow-y-scroll scrollbar-hide tracking-wide absolute top-10 -left-32 z-10 w-[240px] bg-[#fafafa] px-4 py-2 shadow-2xl" : "hidden"}`}>
                                        <div className='text-[13px]'>
                                            {!notifications.length && "No new messages"}
                                        </div>
                                        {notifications.map((e, index) => (
                                            <div
                                                onClick={() => {
                                                    dispatch(setActiveChat(e.chatId));
                                                    dispatch(setNotifications(notifications.filter((data) => data !== e)));
                                                }}
                                                key={index}
                                                className='text-[12.5px] text-black px-2 cursor-pointer'>
                                                {e.chatId.isGroup ? `New Message in ${e.chatId.chatName}` : `New Message from ${getSender(activeUser, e.chatId.users)}`}
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => dispatch(setShowProfile(true))} className='flex items-center gap-x-1 relative'>
                                        <img className='w-[28px] h-[28px] rounded-[25px]' src={activeUser?.profilePic} alt="" />
                                        <IoIosArrowDown style={{ color: "#616c76", height: "14px", width: "14px" }} />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div className='-mt-6 relative pt-6 px-4'>
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <input onChange={handleSearch} className='w-[99.5%] bg-[#f6f6f6] text-[#111b21] tracking-wider pl-9 py-[8px] rounded-[9px] outline-0' type="text" name="search" placeholder="Search" />
                                    </form>
                                    <div className='absolute top-[36px] left-[27px]'>
                                        <BsSearch style={{ color: "#c4c4c5" }} />
                                    </div>
                                    <Group />
                                    <div style={{ display: search ? "" : "none" }} className='h-[100vh] absolute z-10 w-[100%] left-[0px] top-[70px] bg-pink-100 flex flex-col gap-y-3 pt-3 px-4'>
                                        <Search searchResults={searchResults} isLoading={isLoading} handleClick={handleClick} search={search} />
                                    </div>
                                </div>
                                <Contacts />
                            </div>
                        </div>
                    ) : (
                        <Profile className="min-w-[100%] sm:min-w-[360px] h-[100vh] bg-[#FFC0CB] shadow-xl relative" />
                    )}
                    <Chat className="chat-page relative lg:w-[100%] h-[100vh] bg-pink-100" />
                </div>
            </div>
        </>
    );
}

export default Home;
