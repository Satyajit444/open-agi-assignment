import React, { useState, useEffect } from "react";
import { useFormContext } from "./context/FormContext";

const Input = () => {
  const [name, setName] = useState("");
  const { setSubmitForm } = useFormContext(); // Access the context

  const handleChange = (e) => setName(e.target.value);
  console.log("Form submitted:", { name });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { name });
    // Add your form submission logic here
  };

  useEffect(() => {
    setSubmitForm(() => handleSubmit);
    console.log("Form submitted:", { name });
  }, [setSubmitForm]);

  return (
    <div>
      <h2>INPUT</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
            placeholder="type something"
          />
        </div>
      </form>
    </div>
  );
};

export default Input;
