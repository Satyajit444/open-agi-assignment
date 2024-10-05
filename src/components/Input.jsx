import React from "react";
import { useFormContext } from "./context/FormContext";

export const Input = () => {
  const { prompt, setPrompt } = useFormContext();

  return (
    <form>
      <h2>Enter your prompt</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your prompt"
        required
      />
    </form>
  );
};
