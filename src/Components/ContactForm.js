import React, { useState } from 'react';
import NameField from './NameField';
import EmailField from './EmailField';
import MessageField from './MessageField';
import CurrencyCalculator from './CurrencyCalculator';
import './ContactForm.css';

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);
        formData.append('convertedAmount', convertedAmount);

        fetch('https://your-server-endpoint.com/submit', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                setStatus('Form submitted successfully!');
                setName('');
                setEmail('');
                setMessage('');
                setConvertedAmount('');
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                setStatus('Error submitting form.');
            });
    };

    return (
        <div className="contact-form">
            <form onSubmit={handleSubmit}>
                <NameField value={name} onChange={setName} />
                <EmailField value={email} onChange={setEmail} />
                <MessageField value={message} onChange={setMessage} />
                <CurrencyCalculator onAmountChange={setConvertedAmount} />
                <button type="submit">Submit</button>
            </form>
            {status && <p>{status}</p>}
        </div>
    );
}

export default ContactForm;
