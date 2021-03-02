import React from 'react';
import './datetime-context-chat.scss';

function DatetimeContextChatScreen(props : any){

    const { datetime } = props;

    return (
        <div className="datetime-container">
            <div className="datetime-line"></div>
            <span>
                { datetime }
            </span>
            <div className="datetime-line"></div>
        </div>
    )
}

export default DatetimeContextChatScreen;