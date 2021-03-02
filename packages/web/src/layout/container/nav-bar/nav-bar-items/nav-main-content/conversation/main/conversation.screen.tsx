import React from 'react';
import HeaderConversationScreen from '../header/header-conversation.screen'
import ChatListScreen from '../chat-list/main/chat-list.screen';
import ChatInputScreen from '../chat-input/main/chat-input.screen';
import SearchChatScreen from '../chat-list/search-chat/search-chat.screen';
import ConversationAdapter from './conversation.adapter';
import './conversation.scss';
import { ENUM_KIND_OF_STATUS } from '../../../../../../../libraries/Enum/status';
import GroupConversationScreen from '../../group/conversation/group-conversation.screen';
import PersonalConversationScreen from '../../personal/conversation/personal-conversation.screen';
import LoadingSpinnerScreen from '../../../../../../../libraries/Features/loading-spinner/loading-spinner.screen';

function ConversationScreen(){
    const {
        query , setQuery,
        hasSearch,
        conversation,
        onSearch,
        count,
        page , setPage,
        isUpdating,
        isGroup,
        listMessage, setListMessage,
        hasUploadImages, setHasUploadImages,
        redirectToDetail,
        respondedMess, setRespondedMess,
        roomId,
        editedMess, setEditedMess,
        isLoading,
        memberInGroup
    } = ConversationAdapter();

    let eleOptionHeader = null;
    if(isGroup){
        eleOptionHeader = GroupConversationScreen()
    } else{
        eleOptionHeader = PersonalConversationScreen()
    }

    if(isLoading){
        <div className="conversation-container">
            <div className="chatlist-loader">
                <LoadingSpinnerScreen class="loader-big"></LoadingSpinnerScreen>
            </div>
        </div>
    }

    return (
        <div className="conversation-container">

            <HeaderConversationScreen
                id={ conversation?.id }
                title={ conversation?.title }
                avatar={ conversation?.avatar }
                isOnline={ conversation?.status === ENUM_KIND_OF_STATUS.ACTIVE  }
                eleOptionHeader={ eleOptionHeader(onSearch) }
                isGroup={ isGroup }
                hasSearch={ hasSearch }
                onSearch={ onSearch }
                setQuery={ setQuery }
                onClickAvatar={ () =>{ redirectToDetail(conversation?.id || "") } }
            ></HeaderConversationScreen>

            {
                hasSearch && (
                    <SearchChatScreen query={ query }></SearchChatScreen>
                )
            }
            
            <ChatListScreen
                roomId={ roomId }
                listMessage={ listMessage }
                setListMessage={ setListMessage }
                hasSearch={ hasSearch }
                count={ count }
                page={ page }
                setPage={ setPage }
                isUpdating={ isUpdating }
                setRespondedMess={ setRespondedMess }
                setEditedMess={ setEditedMess }
                memberInGroup={memberInGroup}
            ></ChatListScreen>
            
            <ChatInputScreen 
                setListMessage={ setListMessage } 
                roomId={ roomId }
                hasUploadImages= { hasUploadImages }
                setHasUploadImages= { setHasUploadImages }
                respondedMess={ respondedMess }
                setRespondedMess={ setRespondedMess }
                editedMess={ editedMess }
                setEditedMess={ setEditedMess }
            ></ChatInputScreen>
        </div>
    )


}

export default ConversationScreen;