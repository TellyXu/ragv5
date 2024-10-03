import React, { useState, useEffect } from 'react';

function App() {
    const [openaiKey, setOpenAIKey] = useState('sk-proj-XXX');
    const [fmpKey, setFmpKey] = useState('KlrimT7FwkkBiLxYyQ9rvjV0bvY8Tj4w');
    const [ticker, setTicker] = useState('AAPL');
    const [typedoc, setTypeDoc] = useState('10-k');
    const [year, setYear] = useState('2023');
    const [query, setQuery] = useState('Who are the key leadership at Apple? Use the context to answer this question.');
    const [apiResponse, setApiResponse] = useState('');
    const [error, setError] = useState('');
    const [realTimeMessages, setRealTimeMessages] = useState([]);


    useEffect(() => {
        document.title = ' RAG - OPENAI | CDHAI';
        const ws = new WebSocket('ws://localhost:8000/ws'); // Ensure this is the correct URL for your WebSocket connection
        ws.onopen = () => console.log('WebSocket Connected');
        ws.onmessage = (event) => {
            console.log('Message from WebSocket:', event.data);
            setRealTimeMessages((prevMessages) => [...prevMessages, event.data]);
        };
        ws.onerror = (error) => console.log('WebSocket Error:', error);
        ws.onclose = () => console.log('WebSocket Disconnected');

        return () => {
            ws.close();
        };
    }, [ticker]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Clear any previous errors
        try {
            const response = await fetch('http://localhost:8000/process-filings/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    openai_key: openaiKey,
                    fmp_key: fmpKey,
                    ticker: ticker,
                    typedoc: typedoc,
                    year: year,
                    query: query,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setApiResponse(data.message); // Update state with the response message
        } catch (e) {
            setError(`There was a problem with your fetch operation: ${e.message}`);
        }
    };

    return (
        <div>
            <h1>CDHAI logo on left and start button on right</h1>

            <p>Fill out the form below </p>
            {error && <p style={{color: 'red'}}>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" value={openaiKey} onChange={(e) => setOpenAIKey(e.target.value)}
                       placeholder="OpenAI Key" />
                <input type="text" value={fmpKey} onChange={(e) => setFmpKey(e.target.value)} placeholder="FMP Key" style={{}}/>
                <input type="text" value={ticker} onChange={(e) => setTicker(e.target.value)} placeholder="Ticker"/>
                <input type="text" value={typedoc} onChange={(e) => setTypeDoc(e.target.value)}
                       placeholder="Type of Document"/>
                <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Year"/>
                <br/>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Query" style={{width: '1000px'}}/>
                <br/>
                <button type="submit">Submit</button>
            </form>
            {apiResponse && <div><h2>Response from API:</h2><p>{apiResponse}</p></div>}

            <h2>Real-Time Updates (working on it)</h2>
            <ul>
                {realTimeMessages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
