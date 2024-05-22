import React from 'react';

function EmailField({ value, onChange }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label>
        Email:
        <input type="email" value={value} onChange={handleChange} required />
      </label>
    </div>
  );
}

export default EmailField;
