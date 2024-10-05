import React from "react";
import { useFormContext } from "./context/FormContext";

export const Output = () => {
  const { response } = useFormContext();

  return (
    <div>
      <h2>API Response</h2>
      <textarea value={response} readOnly />
    </div>
  );
};

