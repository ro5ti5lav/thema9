import React from 'react';

function MessageField({ value, onChange }) {
    const handleChange = (event) => {
        onChange(event.target.value);
    };

    return (
        <div>
            <label>
                Сообщение:
                <textarea value={value} onChange={handleChange} required />
            </label>
        </div>
    );
}

export default MessageField;
