import dotenv from "dotenv";


dotenv.config();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const generateText =async  (msg) => {


  const options={
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: msg + "always be short and specific"}] }],
      }),
    }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
     options
  );

  const data = await response.json();

  const output =
    data?.candidates?.[0]?.content?.parts?.[0]?.text || "No output returned";
  console.log(" Generated Text:", output);
  return output;
}

export default generateText;