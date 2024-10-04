import React, { useState } from "react";

const Output = () => {
  const [name, setName] = useState("");

  const handleChange = (e) => setName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { name });
    // Add your form submission logic here
  };

  return (
    <div>
      <h2>OUTPUT</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Output Response:</label>
          <textarea
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default Output;
