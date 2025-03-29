import React, { useState, useEffect } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const wsUrl = 'ws://localhost:8080';
    const ws = new WebSocket(wsUrl);
    setWs(ws);

    ws.onmessage = (event) => {
      console.log('Received message:', event.data);
      const messageString = event.data.toString();
      setMessages((prevMessages) => [...prevMessages, messageString]);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };
  }, []);

  const handleSendMessage = () => {
    if (ws) {
      ws.send(inputValue);
      setInputValue('');
    } else {
      console.log('WebSocket connection not established');
    }
  };

  return (
    <div>
    <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
      
    </div>
  );
};

export default Chat;