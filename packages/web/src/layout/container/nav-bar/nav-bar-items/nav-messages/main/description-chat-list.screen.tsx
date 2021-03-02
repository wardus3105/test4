import React from 'react';
import DescriptionChatScreen from '../description-chat/description-chat.screen';
import HeaderDescriptionChatListScreen from '../header/header-description-chat-list.screen';
import './description-chat-list.scss';
import DescriptionChatListAdapter from './description-chat-list.adapter';
import { IDescriptionChat } from '../description-chat/description-chat.props';
import { ENUM_KIND_OF_ICONPANEL } from '../../../../../../libraries/Enum/icon-panel';
import CustomInputScreen from '../../../../../../libraries/Features/custom-input/custom-input.screen';
import { SearchFieldScreen } from '../../../../../../features/nav-detail/search-field';
import InfiniteScrollFieldScreen from '../../../../../../libraries/Features/infinity-scroll-field/infinity-scroll-field.screen';
import { SrcSearchLoupe } from '../../../../../../libraries/Icons/icon-src';


const styleCustomInput = {
  backgroundImage: `url('${SrcSearchLoupe}')`,
  backgroundPosition: "3% 50%",
  padding: "12px 20px 12px 40px",
  borderRadius: "0.7rem",
  fontSize: "1rem",
};

const iconpanel = ENUM_KIND_OF_ICONPANEL.MESSAGES;

function DescriptionChatListScreen() {
  const {
    onChange,
    activedDescriptionChat ,
    descriptionChatList,
    totalPages,
    hasSearch, setHasSearch,
    query , setQuery,
    searchDescriptionChatList,
    page , setPage ,
    isUpdating,
    redirectToChatDetail
  } = DescriptionChatListAdapter()

  const length = descriptionChatList.length;

  const showDescriptionChatList = (descriptionChatList: IDescriptionChat[] , activedDescriptionChat: any ) => {
    if(descriptionChatList){
      return descriptionChatList.map(
        (descriptionChat: IDescriptionChat, idx: number) => (
          <DescriptionChatScreen
            key={idx}
            descriptionChat={ descriptionChat }
            activedDescriptionChat={ activedDescriptionChat }
            onClick={ () =>{ redirectToChatDetail(descriptionChat.id)} }
          ></DescriptionChatScreen>
        )
      );
    }
    return <></>
  };

  return (
    <>
      <div className="descriptionchatlist-top">
        <HeaderDescriptionChatListScreen></HeaderDescriptionChatListScreen>

        <CustomInputScreen
          style={styleCustomInput}
          class="searchinput-container step5"
          placeHolder="Tìm kiếm cuộc trò chuyện"
          isMultiline={false}
          isTextArea={ false }
          onChange={ onChange }
          onClick={ () => {
            setHasSearch(true)
          }}
          hasClearText={ true }
          value={ query }
          setValue={ setQuery }
          id="descriptionchatlist-input-index"
        ></CustomInputScreen>

      </div>

      {
        hasSearch && <SearchFieldScreen child={ showDescriptionChatList(searchDescriptionChatList , null) }></SearchFieldScreen>
      }

      <InfiniteScrollFieldScreen
        child={ showDescriptionChatList(descriptionChatList , activedDescriptionChat) }
        iconpanel={ iconpanel }
        length={ length }
        totalPages={ totalPages }
        className={ "descriptionchatlist-bottom" }
        isUpdating={ isUpdating }
        page={ page }
        setPage={ setPage }
      ></InfiniteScrollFieldScreen>
      
    </>
  );
}

export default DescriptionChatListScreen;
