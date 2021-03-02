import React from 'react';
import MessageFoundScreen from '../context-chat/MessageFound/Views/MessageFoundScreen';
import './search-chat.scss';

function SearchChatScreen(props : any) {

  return (
    <div className="searchmessage-container">
      {
        props.query ? (
          <>
            <MessageFoundScreen query={ props.query }></MessageFoundScreen>
          </>
        ) : (
          <div></div>
        )
      }

    </div>
  );
}

export default SearchChatScreen;
