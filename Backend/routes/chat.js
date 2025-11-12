import { Router } from "express";
import generateText from "../utils/flash.js";
import { v4 as uuidv4 } from 'uuid';
import Thread from '../models/thread.js';


// let sample_res = "Chrome DevTools (MCP) for your AI agentWith the newly launched Chrome DevTools MCP server, AI coding assistants can now debug web pages directly in Chrome, and benefit from DevTools debugging capabilities and performance insights. Debug the network dependency tree with Gemini" ;



const router = Router();

router.get('/test', (req, res) => {
  //   res.json({res:'Server is live'});
  // let threadId=uuidv4();
  // console.log(threadId);
  console.log('req received');
  res.json({ msg: 'Backend connected' });
})


router.get('/threads/:id', async (req, res) => {
  let allThreads = await Thread.find({});
  res.send(allThreads);
})


//show thread
router.get('/chat/:threadId', async (req, res) => {
  const { threadId } = req.params;
  let thread = await Thread.findOne({ threadId });
  if (!thread) {
    console.log('thread doesnt exist');
    try {
      const newThread = new Thread({
        threadId: threadId,
        title: 'New Chat '
      })
      const response = await newThread.save();
      res.send(response);

    } catch (error) {
      res.status(500).json({ error });
    }
  }
  else {
    res.send(thread);
  }
})





//generate text
router.post("/chat", async (req, res) => {
  try {
    let { text } = req.body
    const output = await generateText(text);
    
    // const output = sample_res;
    res.json({ user_prompt: text, generated_response: output });

  } catch (error) {
    console.log("errror :", error);
    res.json({ msg: 'Some error occured' });
  }


  // const { threadId , prompt} = req.body;
  // const prompt = req.body.msg;

  // console.log("threadid :",threadId);

  // if (!prompt) {
  //   return res.status(400).json({
  //     error: "msg not found"
  //   });
  // }

  // let thread = await Thread.findOne({threadId});
  // if(!thread){
  //   console.log(thread);
  //   return res.json({"Error":"no thread exits"});
  // }



});


//delete thread by id
router.delete('/delete/:threadId', async (req, res) => {
  const { threadID } = req.params;
  let deletedThread = await Thread.findByIdAndDelete(id);
  res.send(deletedThread);
})




export default router;
