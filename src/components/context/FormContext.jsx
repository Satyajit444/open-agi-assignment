import React, { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "./ToastContext";

// Create context
const FormContext = createContext();

// Hook to use context
export const useFormContext = () => useContext(FormContext);

// Provider component
export const FormProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [llmEngineData, setLlmEngineData] = useState({
    modelName: "",
    openAiKey: "",
    apiBase: "",
    maxTokens: "",
    temperature: "",
  });

  const { showToast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState([]);

  const [res, setRes] = useState("");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);

  const checkValidation = () => {
    if (!prompt) {
      showToast({
        toastType: "error",
        message: "Please enter the input text before running the flow",
        title: "Error while running the flow",
      });
      return false;
    }
    if (!llmEngineData.modelName) {
      showToast({
        toastType: "error",
        message: "Please enter the model name before running the flow",
        title: "Error while running the flow",
      });
      return false;
    }
    if (!llmEngineData.apiBase) {
      showToast({
        toastType: "error",
        message: "Please enter the OpenAI API base before running the flow",
        title: "Error while running the flow",
      });
      return false;
    }
    if (!llmEngineData.openAiKey) {
      showToast({
        toastType: "error",
        message: "Please enter the OpenAI key before running the flow",
        title: "Error while running the flow",
      });
      return false;
    }
    if (!llmEngineData.maxTokens) {
      showToast({
        toastType: "error",
        message: "Please enter the max tokens before running the flow",
        title: "Error while running the flow",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const promptInput = {
      role: "user",
      content: prompt,
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${llmEngineData?.openAiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [...messages, promptInput],
          }),
        }
      );

      const data = await response.json();
      if (data?.error) {
        const errorMessage =
          data?.error.message || "Please Check the OpenAI Key And Try Again";
        const limitedMessage = errorMessage.split(" ").slice(0, 15).join(" ");
        showToast({
          toastType: "error",
          message:
            errorMessage.split(" ").length > 15
              ? `${limitedMessage}...`
              : errorMessage,
        });
      } else {
        const resContent = data.choices[0]?.message?.content || "";
        setRes(resContent);
        setHistory((prevHistory) => [
          ...prevHistory,
          { question: prompt, answer: resContent },
        ]);
        showToast({
          toastType: "success",
          title: "Flow Ran Successfully.",
          messages: "Your workflow is ready to deploy",
        });
      }
      setPrompt("");
    } catch (error) {
      console.error("Error fetching from OpenAI:", error);
      showToast({
        toastType: "error",
        message: "An error occurred while fetching the response.",
      });
    }
  };

  const handleNavButtonClick = async () => {
    if (checkValidation()) {
      await handleSubmit();
    }
  };

  return (
    <FormContext.Provider
      value={{
        apiKey,
        setApiKey,
        apiSecret,
        setApiSecret,
        llmEngineData,
        setLlmEngineData,
        prompt,
        setPrompt,
        response,
        handleNavButtonClick,
        res,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
