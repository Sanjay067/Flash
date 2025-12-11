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


router.get('/threads', async (req, res) => {

  const allThreads = await Thread.find({}).sort({ updatedAt: -1 });

  const threads = allThreads.map(obj => {
    return { threadId: obj.threadId, title: obj.title };
  });

  res.json(threads);
})



//show thread
router.get('/threads/:threadId', async (req, res) => {
  const { threadId } = req.params;

  let thread = await Thread.findOne({ threadId });

  if (!thread) {
    console.log('thread doesnt exist');

    try {
      res.json(thread);
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
    let { prompt, threadId } = req.body;

    const reply = await generateText(prompt);

    let thread = await Thread.findOne({ threadId });

    if (!thread) {
      thread = new Thread({
        threadId,
        title: prompt,
        messages: [{ role: 'user', content: prompt }, { role: 'assistant', content: reply }]
      })
    }

    else {
      thread.messages.push({ role: 'user', content: prompt }, { role: 'assistant', content: reply });
    }

    thread.updatedAt = new Date();
    await thread.save();

    // const output = sample_res;
    res.json({ user_prompt: prompt, generated_response: reply });

  } catch (error) {
    console.log("errror :", error);
    res.json({ msg: 'Some error occured' });
  }
});

//delete thread by id
router.delete('/delete/:threadId', async (req, res) => {
  try {
    const { threadId } = req.params;
    let deletedThread = await Thread.findOneAndDelete({ threadId });
    res.json({deletedThread,msg:"Deleted thread"});

  } catch (err) {
    res.json("Error in deleting (from backend ) :" ,err);

  }
})




export default router;
