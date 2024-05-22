import React, { useState, useEffect, useCallback } from 'react';
import './CurrencyCalculator.css';

const CurrencyCalculator = ({ onAmountChange }) => {
    const [baseCurrency, setBaseCurrency] = useState('RUB');
    const [targetCurrency, setTargetCurrency] = useState('USD');
    const [amount, setAmount] = useState(5000);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [exchangeRate, setExchangeRate] = useState(null);
    const [inverseExchangeRate, setInverseExchangeRate] = useState(null);
    const [error, setError] = useState(null);

    const currencies = ['RUB', 'USD', 'EUR', 'GBP', 'BYN'];

    const fetchExchangeRate = useCallback(async () => {
        const myHeaders = new Headers();
        myHeaders.append("apikey", "RUX8NlhOlDR46rhg6YJkhvx2vt4XkYy3");

        const requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        try {
            const response = await fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=${targetCurrency}&base=${baseCurrency}`, requestOptions);
            const data = await response.json();
            setExchangeRate(data.rates[targetCurrency]);

            const inverseResponse = await fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=${baseCurrency}&base=${targetCurrency}`, requestOptions);
            const inverseData = await inverseResponse.json();
            setInverseExchangeRate(inverseData.rates[baseCurrency]);

            const converted = (amount * data.rates[targetCurrency]).toFixed(4);
            setConvertedAmount(converted);
            onAmountChange(converted);
        } catch (error) {
            setError('Error fetching exchange rate');
        }
    }, [baseCurrency, targetCurrency, amount, onAmountChange]);

    useEffect(() => {
        fetchExchangeRate();
    }, [fetchExchangeRate]);

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    return (
        <div className="currency-calculator">
            <div className="currency-section">
                <div className="currency-header">
                    <h3>У меня есть</h3>
                    <div className="currency-buttons">
                        {currencies.map(currency => (
                            <button
                                key={currency}
                                className={currency === baseCurrency ? 'active' : ''}
                                onClick={() => setBaseCurrency(currency)}
                            >
                                {currency}
                            </button>
                        ))}
                    </div>
                </div>
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    className="currency-input"
                />
                {inverseExchangeRate && (
                    <p className="exchange-rate">1 {targetCurrency} = {inverseExchangeRate} {baseCurrency}</p>
                )}
            </div>
            <div className="conversion-arrow">⇄</div>
            <div className="currency-section">
                <div className="currency-header">
                    <h3>Хочу приобрести</h3>
                    <div className="currency-buttons">
                        {currencies.map(currency => (
                            <button
                                key={currency}
                                className={currency === targetCurrency ? 'active' : ''}
                                onClick={() => setTargetCurrency(currency)}
                            >
                                {currency}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="converted-amount">
                    {error ? error : convertedAmount}
                </div>
                {exchangeRate && (
                    <p className="exchange-rate">1 {baseCurrency} = {exchangeRate} {targetCurrency}</p>
                )}
            </div>
        </div>
    );
};

export default CurrencyCalculator;
