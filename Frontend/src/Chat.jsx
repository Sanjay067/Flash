import { useContext } from "react";

import { MyContext } from "./MyContext";

import "./Chat.css"


function Chat() {

    const { currThread, setCurrThread,
        reply, setReply,
        prevChats, setPrevChats,
        newChat, setNewChat } = useContext(MyContext);



    return (
        <>
            {newChat && (<h1>Start new Chat</h1>)}
            {prevChats?.map((chat, idx) => (
                <div className={chat.role === 'user' ? 'userdiv' : 'assistant'} key={idx}>
                    {chat.role === 'user'
                        ? <p className="userMessage">{chat.content}</p>
                        : <p className="assistantMessage">{chat.content}</p>
                    }
                </div>
            ))}
            {/* <div className="chat">
                <div className="user">
                    <p>Explain Devops</p>
                </div>
                <div className="assistant">
                    <p>Chrome DevTools (MCP) for your AI agentWith the newly launched Chrome DevTools MCP server, AI coding assistants can now debug web pages directly in Chrome, and benefit from DevTools debugging capabilities and performance insights. Debug the network dependency tree with Gemini</p>
                </div>
            </div> */}
        </>
    );
}

export default Chat;