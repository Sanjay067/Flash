import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import "./Chat.css";
import 'highlight.js/styles/github.css';
import ReactMarkDown from 'react-markdown';
import RehypeHighlight from 'rehype-highlight';




function Chat() {

    const { currThread, setCurrThread,
        reply, setReply,
        prevChats, setPrevChats,
        newChat, setNewChat,
        latestReply, setLatestReply
    } = useContext(MyContext);


    useEffect(() => {

        if (reply === null) {
            setLatestReply(null)
            return;
        }
        if (!prevChats?.length) {
            return;
        }



        setNewChat(false);

        // const lastAssistantReply = prevChats.findLast(chat => chat.role == 'assistant');
        try {
            const content = reply.split(" ");

            let idx = 1;

            let interval = setInterval(() => {
                setLatestReply(content.slice(0, idx + 1).join(" "));
                idx++;

                if (idx >= content.length) {
                    clearInterval(interval);
                    // console.log('Cleared');
                }

            }, 30)
        }
        catch(err){
            console.log("Error in spliting reply :" ,err.message);
        }

    }, [prevChats, reply])



    return (
        <>
            {newChat && (<h1>Start new Chat</h1>)}
            {prevChats?.slice(0, -1).map((chat, idx) => (
                <div className={chat.role === 'user' ? 'userDiv' : 'assistantDiv'} key={idx}>
                    {chat.role === 'user'
                        ? <p className="userMessage">{chat.content}</p>
                        : <ReactMarkDown rehypePlugins={[RehypeHighlight]}>{chat.content}</ReactMarkDown>
                    }
                </div>
            ))}
            {
                prevChats.length > 0 && latestReply === null ? (

                    < div className="assistantDiv">
                        <ReactMarkDown rehypePlugins={[RehypeHighlight]}>{prevChats[prevChats.length - 1].content}</ReactMarkDown>
                        <div className="bottom_space"></div>
                    </div >)
                    :
                    (< div className="assistantDiv">
                        <ReactMarkDown rehypePlugins={[RehypeHighlight]}>{latestReply}</ReactMarkDown>
                        <div className="bottom_space"></div>
                    </div >

                    )

            }

        </>
    );
}

export default Chat;