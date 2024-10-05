import React, { createContext, useContext, useState } from "react";

// Create the context
const FormContext = createContext();

// Hook to use context
export const useFormContext = () => useContext(FormContext);

// Provider component
export const FormProvider = ({ children }) => {
  const [submitForm, setSubmitForm] = useState(null);
  console.log("🚀 ~ FormProvider ~ submitForm:", submitForm)

  return (
    <FormContext.Provider value={{ submitForm, setSubmitForm }}>
      {children}
    </FormContext.Provider>
  );
};
