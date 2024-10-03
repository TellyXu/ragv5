// import React from 'react';
// import './log.css';
//
// const MessageDisplay = ({ messages }) => {
//     return (
//         <div className="message-container">
//             {messages.map((message, index) => {
//                 const levelClass = 'message-info';// : 'message-error';
//                 return (
//                     <div key={index} className={`message ${levelClass}`}>
//                         {message}
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }
//
// export default MessageDisplay;

import React from 'react';
import './log3.css';
const MessageDisplay = ({ messages }) => {
    return (
        <div className="message-container">
            {messages.map((message, index) => (
                <div key={index} className={`message ${message.level === 'info' ? 'log-info' : 'log-error'}`}>
                    <span className="timestamp">{message.timestamp}</span>
                    <span className="message-text">{message.text}</span>
                </div>
            ))}
        </div>
    );
}

export default MessageDisplay;
