import './Sidebar.css';


// function closeSidebar() {
//     const sideBar = document.getElementsByClassName('sidebar');
//     sideBar.clas

// }

import { MyContext } from './MyContext';
import { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Sidebar() {

    const [isOpen, setIsOpen] = useState(true);

    const { allThreads, setAllThreads, reply, setReply, prevChats, latestReply, setLatestReply, setPrevChats, currThread, setCurrThread, newChat, setNewChat, loader, setLoader } = useContext(MyContext);

    const getAllThreads = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/threads');
            const threads = await response.json();
            setAllThreads(threads);
            return;

        } catch (err) {
            console.log("Sidebar : couldn't get all thread ", err);
            return;
        }
    }

    useEffect(() => {
        getAllThreads();
    }, [currThread, allThreads]);




    const getThread = async (threadId) => {

        try {
            let response = await fetch(`http://localhost:3000/api/threads/${threadId}`);
            let thread = await response.json();

            setCurrThread(threadId);
            setPrevChats(thread.messages);
            setReply(null);
            setNewChat(false);


        } catch (err) {
            console.log("Sidebar : couldn't get that thread ", err);
        }
    }

    const createChat = () => {
        setPrevChats([]);
        setLatestReply(null);
        setReply(null);
        setCurrThread(uuidv4());
        setNewChat(true);
    }


    const deleteThread = async (threadId) => {
        try {
            const options = {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            }
            const response = await fetch(`http://localhost:3000/api/delete/${threadId}`, options);
            const deleteThread = await response.json();
            console.log(deleteThread);

        } catch (err) {
            console.log('Error sending a delete request : ', err.message)
        }

    }

    const toggleSidebar = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <>
            <div className="display_sidebar" style={{ display: isOpen ? "none" : "block" }}><button onClick={toggleSidebar}><i className="fa-solid fa-list"></i></button></div>
            <div className="sidebar" style={{ display: isOpen ? "block" : "none" }}>

                <div className="sidebar__top">
                    <img className="sidebar__logo" src="src/assets/ChatGPT-Logo.svg.png" alt="logo" />
                    <button className="sidebar__close_btn" onClick={toggleSidebar}>
                        <span className="sidebar__close_icon">
                            <i className="fa-solid fa-xmark"></i>
                        </span>
                    </button>
                </div>
                <div className="sidebar__new-chat">
                    <button className="sidebar__new_chat_btn" disabled={loader} onClick={() => createChat()}>
                        <i className="fa-solid fa-pen-to-square sidebar__new-chat-icon"></i>
                        New Chat
                    </button>
                </div>

                <div className="sidebar__history">
                    <h3 className="sidebar__history-title">Chats</h3>
                    <ul className="sidebar__threads">
                        {
                            allThreads?.map((thread, idx) => (
                                <li key={idx} onClick={() => getThread(thread.threadId)} >{thread.title}
                                    <button onClick={() => {
                                        deleteThread(thread.threadId)
                                    }}><i className="fa-solid fa-trash"></i></button></li>
                            )
                            )
                        }
                    </ul>
                </div>

                <div className="sidebar__bottom">
                    <span className="sidebar__user-icon-wrapper">
                        <i className="fa-solid fa-user"></i>
                    </span>
                    <h3 className="sidebar__username">Sanjay</h3>
                </div>
            </div>
        </>
    );
}

export default Sidebar;