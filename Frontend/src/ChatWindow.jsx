import Chat from './Chat';
import './ChatWindow.css';
import { useContext, useState, useEffect } from 'react';
import { ScaleLoader } from 'react-spinners';
import { MyContext } from './MyContext';



function ChatWindow() {

    const { prompt, setPrompt, reply, setReply, prevChats, setPrevChats, currThread, setCurrThread , loader , setLoader } = useContext(MyContext);

    async function getreply(prompt) {
        if (!prompt.trim()) return;
        setLoader(true);
        let options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt,
                threadId: currThread
            }),
        }
        try {
            let res = await fetch('http://localhost:3000/api/chat', options);
            let data = await res.json();
            // console.log("AI response :", data.generated_response);
            setReply(data.generated_response);
        } catch (e) {
            console.log('error :', e);
        }

        finally {
            setLoader(false);
        }

    }



    //Append new chat to previous chat

    useEffect(() => {
        if (prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: 'user',
                    content: prompt
                }, {
                    role: 'assistant',
                    content: reply
                }]
            ));
        }

        setPrompt("");
    }, [reply]);



    return (
        <div className='chatwindow'>
            <nav className='chatwindow_top'>
                <div className="model">
                    <h3 className='model_name'>Flash</h3>
                </div>
                <div className="logout">
                    <button className='logout_btn'><i className="fa-solid fa-right-from-bracket"></i></button>
                </div>
            </nav>
            <div className="chat_interface">
                <Chat />
            </div>
            <ScaleLoader loading={loader} color='#ffffff' />
            <div className="chatwindow_bottom">
                <div className="chatwindow_input">
                    <input placeholder='Ask anything' value={prompt} onChange={(e) => {
                        setPrompt(e.target.value);
                    }} onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            getreply(e.target.value);

                        }
                    }} />
                    <button onClick={() => {
                        getreply(prompt);
                    }} disabled={loader}><i className="fa-solid fa-paper-plane"></i></button>
                </div>
                <div className="disclaimer">
                    <p className='disclaimer_msg'>
                        Flash can make mistakes. Check important info.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default ChatWindow;