import React from "react";
import { useFormContext } from "./context/FormContext";

export const LLMEngine = () => {
  const { apiKey, setApiKey, apiSecret, setApiSecret } = useFormContext();

  return (
    <form>
      <h2>Enter OpenAI API Credentials</h2>
      <div>
        <label>API Key:</label>
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          required
        />
      </div>
      <div>
        <label>API Secret:</label>
        <input
          type="password"
          value={apiSecret}
          onChange={(e) => setApiSecret(e.target.value)}
          required
        />
      </div>
    </form>
  );
};

