import React, { useState, useEffect } from 'react';
import { BsPlusLg } from "react-icons/bs";
import { Modal, Box } from "@mui/material";
import { searchUsers } from '../api/auth';
import { RxCross2 } from "react-icons/rx";
import { createGroup } from '../api/chat';
import { fetchChats } from '../redux/chatSlice';
import { useDispatch } from 'react-redux';
import Search from './group/Search';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2
};

function Group() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [chatName, setChatName] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [error, setError] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setSearch("");
        setSelectedUsers([]);
        setError(null);
    };

    const handleFormSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleClick = (user) => {
        if (selectedUsers.includes(user)) {
            return;
        }
        setSelectedUsers([...selectedUsers, user]);
    };

    const deleteSelected = (user) => {
        setSelectedUsers(selectedUsers.filter((e) => e._id !== user._id));
    };

    const handleSubmit = async () => {
        if (selectedUsers.length >= 2) {
            try {
                await createGroup({
                    chatName,
                    users: selectedUsers.map((e) => e._id).join(',') // Use comma-separated string
                });
                dispatch(fetchChats());
                handleClose();
            } catch (err) {
                console.error('Failed to create group:', err);
                setError('Failed to create group. Please try again.');
            }
        } else {
            setError("A group must have at least 2 users.");
        }
    };

    useEffect(() => {
        const searchChange = async () => {
            if (search) {
                setIsLoading(true);
                setError(null);
                try {
                    const data = await searchUsers(search);
                    console.log("data", data);
                    setSearchResults(data || []);
                } catch (error) {
                    console.error('Error in search users API:', error.response?.data || error.message);
                    setError('Failed to search users.');
                    setSearchResults([]);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setSearchResults([]);
            }
        };
        searchChange();
    }, [search]);

    return (
        <>
            <button className='mt-1 transition duration-150 ease-in-out' onClick={handleOpen}>
                <div className='flex justify-start border-r-2'>
                    <button className='text-[11px] font-normal tracking-wide flex items-center gap-x-1 bg-[#f6f6f6] text-[#1f2228] py-1 -mb-7 mt-2 px-2'>
                        New Group <BsPlusLg />
                    </button>
                </div>
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h5 className='text-[18px] text-[#111b21] font-medium text-center'>Create A Group</h5>
                    <form onSubmit={(e) => e.preventDefault()} className='flex flex-col gap-y-3 mt-3'>
                        <input onChange={(e) => setChatName(e.target.value)} className="border-[#c4ccd5] border-[1px] text-[13.5px] py-[4px] px-2 w-[100%]" type="text" name="chatName" placeholder="Group Name" required />
                        <input onChange={handleFormSearch} className="border-[#c4ccd5] border-[1px] text-[13.5px] py-[4px] px-2 w-[100%]" type="text" name="users" placeholder="add users" />
                        <div className='flex -mt-2'>
                            {selectedUsers?.map((user) => (
                                <button key={user._id} onClick={() => deleteSelected(user)} className='flex items-center gap-x-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400'>
                                    <span>{user.name}</span>
                                    <RxCross2 />
                                </button>
                            ))}
                        </div>
                        {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
                        <Search isLoading={isLoading} handleClick={handleClick} search={search} searchResults={searchResults} />
                        <div className='flex justify-end mt-3'>
                            <button onClick={handleSubmit} className='bg-[#0086ea] text-[#fff] text-[15px] font-medium px-2 py-1 tracking-wide' type='submit'>Create</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    );
}

export default Group;
