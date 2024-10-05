import React, { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [prompts, setPrompts] = useState("");
  const [apiCred, setApiCred] = useState({});
  const [response, setResponse] = useState({});

  const submitAllForms = () => {
    if (prompts) console.log("Submitting Form 1 data: ", prompts);
    if (apiCred) console.log("Submitting Form 2 data: ", apiCred);
    if (response) console.log("Submitting Form 3 data: ", response);
  };

  return (
    <FormContext.Provider
      value={{ setPrompts, setApiCred, setResponse, submitAllForms }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
