import { useState } from 'react';
import './App.css';
import ChatWindow from './ChatWindow';
import Sidebar from './Sidebar';
import { MyContext } from './MyContext';
import { v4 as uuidv4 } from 'uuid';


function App() {

  const [prompt, setPrompt] = useState('');
  const [currThread, setCurrThread] = useState(uuidv4());
  const [reply, setReply] = useState("");
  const [prevChats,setPrevChats] = useState([]); 
  const [newChat,setNewChat] = useState(false);

  const providerValues = {
    prompt, setPrompt,
    currThread,setCurrThread,
    reply,setReply,
    prevChats,setPrevChats,
    newChat,setNewChat
  };
  return (
    <div className='main'>
      <MyContext.Provider value={providerValues}>
        <Sidebar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  )
}

export default App
