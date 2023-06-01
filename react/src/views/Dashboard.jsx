import { useEffect, useState } from 'react';
import './Dashboard.css';
import Spinner from '../components/Spinner';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

function replaceNewlinesWithBreaks(text) {
    return text.replace(/\n/g, '<br />');
  }

export default function Dashboard() {
    const [messages, setMessages] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { setNotification } = useStateContext();

    useEffect(() => {
        getMessages();
    }, []);

    const getMessages = () => {
        axiosClient.get('/contact-us')
            .then(({ data }) => {
                setMessages(data.data);
                setIsLoading(false);
            });
    };

    const handleClick = (id) => {
        if (!window.confirm('Are you sure you want to delete this message?')) {
            return;
        }
        
        axiosClient.delete('/contact-us/' + id)
            .then(() => {
                setNotification('Message deleted');
                getMessages();
            });
    };

    return (
        <div className='Dashboard'>
            <div className="dashboard-content">
                <h1>Poruke</h1>
                {isLoading && <Spinner />}
                {!isLoading && !messages && <p>No Messages!</p>}
                {messages && <p>Broj poruka: {messages.length}</p>}
                {messages && (
                    <ul className="comment-list">
                        {messages.map(comment => (
                            <li key={comment.id} className="comment-item">
                                <div className="comment-header">
                                    <span className="comment-from">{comment.name}</span>
                                    <span className="comment-time">{comment.created_at}</span>
                                </div>
                                <div className="comment-body">
                                    <p className="comment-email">{comment.email}</p>
                                    
                                    {comment.message.split('\n').map((p, index) => <p key={index}>{p}</p>)}
                                </div>
                                <button
                                    className="delete-button"
                                    onClick={() => handleClick(comment.id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
