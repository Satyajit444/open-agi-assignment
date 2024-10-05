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
  const handleNavButtonClick = () => {
    if (validateCreds()) {
      console.log("API Credentials are valid.");
      const promptSubmitted = submitPrompt();
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
