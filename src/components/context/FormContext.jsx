import React, { createContext, useContext, useState } from "react";

// Create context
const FormContext = createContext();

// Hook to use context
export const useFormContext = () => useContext(FormContext);

// Provider component
export const FormProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [prompt, setPrompt] = useState("");
  console.log("🚀 ~ FormProvider ~ prompt:", prompt);
  const [response, setResponse] = useState("");

  // Function to validate API credentials
  const validateCreds = () => {
    return apiKey && apiSecret;
  };

  // Function to handle prompt submission
  const submitPrompt = () => {
    if (prompt) {
      console.log("Prompt submitted:", prompt);
      // Simulate getting a response from OpenAI
      setResponse("This is the response from OpenAI based on your prompt.");
      return true; // Indicate that the submission was successful
    } else {
      alert("Please enter a prompt.");
      return false; // Indicate failure
    }
  };

  // Navbar button handler to trigger form submissions

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);

  console.log(process.env.REACT_APP_OPENAI_API_KEY);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const promptInput = {
      role: "user",
      content: prompt,
    };

    setResponse([...response, promptInput]);

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
        console.log("🚀 ~ .then ~ data:", data);
        const res = data.choices[0].message.content;
        console.log("🚀 ~ .then ~ res:", res);
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

  const handleNavButtonClick = () => {
    if (validateCreds()) {
      console.log("API Credentials are valid.");
      const promptSubmitted = handleSubmit();
      if (promptSubmitted) {
        console.log("Prompt submitted successfully.");
      }
    } else {
      alert("Please enter valid API credentials.");
    }
  };

  return (
    <FormContext.Provider
      value={{
        apiKey,
        setApiKey,
        apiSecret,
        setApiSecret,
        prompt,
        setPrompt,
        response,
        handleNavButtonClick,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
