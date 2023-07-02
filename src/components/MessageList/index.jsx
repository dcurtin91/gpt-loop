import React from 'react';
import { useMessages } from '../../hooks/useMessages';
import './styles.css';

function MessageList({ roomId }) {
    const containerRef = React.useRef(null);
    const messages = useMessages(roomId);

    React.useLayoutEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    });

    return (
        <div className="message-list-container" ref={containerRef}>
            <ul className="message-list">
                {messages.map((x, index) => (
                    <Message
                        key={x.id}
                        message={x}
                        isOwnMessage={index % 2 === 0} //should only occur 50% of the time
                    />
                ))}
            </ul>
        </div>
    );
}

function Message({ message, isOwnMessage }) {
    const { text, timestamp } = message;

    const formattedTimestamp = timestamp
        ? new Date(timestamp.toMillis()).toLocaleString()
        : '';

    return (
        <li className={['message', isOwnMessage && 'own-message'].join(' ')}>

            <h4 className="sender">{isOwnMessage ? 'Jimmy' : 'Gary'}</h4>
            <div className="timestamp">{formattedTimestamp}</div>
            <div>{text}</div>

        </li>
    );
}

export { MessageList };
