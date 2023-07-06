import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { sendAMessage } from '../../services/firebase';
import './styles.css';

function MessageInput({ roomId }) {
    const { user } = useAuth();
    // const url = process.env.NODE_ENV === 'production' ? 'https://gpt-loop-server.herokuapp.com/' : 'http://localhost:5000/';
    const url = 'https://gpt-loop-server.herokuapp.com/';

    const [chatResponse, setChatResponse] = useState('');


    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const chatResponse = data.chatResponse;
                setChatResponse(chatResponse);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [url]);

    useEffect(() => {
        const handleSubmit = () => {
            sendAMessage(roomId, user, chatResponse);
            setChatResponse("");
        };

        if (chatResponse) {
            handleSubmit();
        }
    }, [chatResponse, roomId, user]);


    return (
        <div>
            <form className="message-input-container">

            </form>


        </div>
    );
}

export { MessageInput };
