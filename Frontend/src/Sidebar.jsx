import './Sidebar.css';


// function closeSidebar() {
//     const sideBar = document.getElementsByClassName('sidebar');
//     sideBar.clas

// }



function Sidebar() {

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <img className="sidebar__logo" src="src/assets/ChatGPT-Logo.svg.png" alt="logo" />
                <button className="sidebar__close-btn">
                    <span className="sidebar__close-icon">
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                </button>
            </div>

            <div className="sidebar__new-chat">
                <button className="sidebar__new-chat-btn">
                    <i className="fa-solid fa-pen-to-square sidebar__new-chat-icon"></i>
                    New Chat
                </button>
            </div>

            <div className="sidebar__history">
                <h3 className="sidebar__history-title">Chats</h3>
                <ul className="sidebar__threads">
                    <li className="sidebar__thread-item">thread 1</li>
                    <li className="sidebar__thread-item">thread 2</li>
                    <li className="sidebar__thread-item">thread 3</li>
                </ul>
            </div>

            <div className="sidebar__bottom">
                <span className="sidebar__user-icon-wrapper">
                    <i className="fa-solid fa-user"></i>
                </span>
                <h3 className="sidebar__username">Sanjay</h3>
            </div>
        </div>
    );
}

export default Sidebar;