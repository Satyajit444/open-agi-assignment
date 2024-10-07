import React, { useState } from "react";

const OpenAIComponent = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [response, setResponse] = useState("");


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = {
      role: "user",
      content: input,
    };

    setResponse([...response, prompt]);

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [...messages, prompt],
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        const res = data.choices[0].message.content;
        setMessages((messages) => [
          ...messages,
          {
            role: "assistant",
            content: res,
          },
        ]);
        setHistory((history) => [...history, { question: input, answer: res }]);
        setInput("");
      });
  };
  return (
    <div>
      <h1>OpenAI Integration with React</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows="5"
          cols="50"
          placeholder="Type your prompt here..."
        />
        <br />
        <button type="submit">Get Response</button>
      </form>
      <div>
        <h2>Response:</h2>
        {/* <p>{response}</p> */}
      </div>
    </div>
  );
};

export default OpenAIComponent;
