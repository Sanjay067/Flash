import { useState } from 'react';
import './App.css';
import ChatWindow from './ChatWindow';
import Sidebar from './Sidebar';
import { MyContext } from './MyContext';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [loader, setLoader] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [currThread, setCurrThread] = useState(uuidv4());
  const [reply, setReply] = useState(null);
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [latestReply, setLatestReply] = useState(null);
  const [allThreads, setAllThreads] = useState(null);

  const providerValues = {
    prompt, setPrompt,
    currThread, setCurrThread,
    reply, setReply,
    prevChats, setPrevChats,
    newChat, setNewChat,
    latestReply, setLatestReply,
    allThreads,setAllThreads,
    loader,setLoader

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
