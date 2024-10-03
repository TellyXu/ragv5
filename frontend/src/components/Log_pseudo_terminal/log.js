import React from 'react';
import './log.css';

const MessageDisplay = ({ messages }) => {
    return (
        <div className="message-container">
            {messages.map((message, index) => {
                const levelClass = 'message-info';// : 'message-error';
                return (
                    <div key={index} className={`message ${levelClass}`}>
                        {message}
                    </div>
                );
            })}
        </div>
    );
}

export default MessageDisplay;
