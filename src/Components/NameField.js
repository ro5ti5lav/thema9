import React from 'react';

function NameField({ value, onChange }) {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <div>
            <label>
                Имя:
                <input type="text" value={value} onChange={handleChange} required />
            </label>
        </div>
    );
}

export default NameField;
