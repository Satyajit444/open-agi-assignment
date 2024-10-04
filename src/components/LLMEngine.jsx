import React, { useState } from 'react';

const initialFormData = {
  model: 'gpt-3.5',
  openApiBase: '',
  openApiKey: '',
  maxTokens: 0,
  temperature: 0.5,
};

const fieldsConfig = [
  {
    label: 'Model',
    name: 'model',
    type: 'select',
    options: [
      { label: 'GPT-3.5', value: 'gpt-3.5' },
      { label: 'GPT-4', value: 'gpt-4' },
    ],
  },
  {
    label: 'Open API Base',
    name: 'openApiBase',
    type: 'text',
  },
  {
    label: 'Open API Key',
    name: 'openApiKey',
    type: 'text',
  },
  {
    label: 'Max Tokens',
    name: 'maxTokens',
    type: 'number',
  },
  {
    label: 'Temperature',
    name: 'temperature',
    type: 'select',
    options: Array.from({ length: 11 }, (_, i) => ({
      label: (i * 0.1).toFixed(1),
      value: (i * 0.1).toFixed(1),
    })),
  },
];

const LLMEngine = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  const renderField = ({ label, name, type, options }) => {
    switch (type) {
      case 'select':
        return (
          <div key={name}>
            <label htmlFor={name}>{label}:</label>
            <select
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        );
      case 'text':
      case 'number':
        return (
          <div key={name}>
            <label htmlFor={name}>{label}:</label>
            <input
              type={type}
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>LLM Engine</h2>
      <form onSubmit={handleSubmit}>
        {fieldsConfig.map((field) => renderField(field))}
      </form>
    </div>
  );
};

export default LLMEngine;
