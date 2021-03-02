import React from "react";
import CircleAvatarScreen from "../../../../../../libraries/Features/circle-avtar/circle-avatar.screen";
import CustomBadgeScreen from "../../../../../../libraries/Features/custom-badge/custom-badge.screen";
import getApiUrl from "../../../../../../libraries/Functions/get-api-url";
import DescriptionChatAdapter from "./description-chat.adapter";
import { IDescriptionChatComp } from "./description-chat.props";
import "./description-chat.scss";

function DescriptionChatScreen(props: IDescriptionChatComp) {
  const {
    descriptionChat,
    isGroup,
    hasRead,
    hasActived,
    isOnline,
    widthAva,
    heightAva,
    createdAt,
    lastMessage,
    onClick
  }  = DescriptionChatAdapter(props)

  return (
    <div
      className={ "descriptionchat-container cursor-pointer " + ( hasActived ? "descriptionchat-container--active" : "" ) }
      onClick={onClick}
    >
      <div className={"descriptionchat-image "}>
        <CircleAvatarScreen
          class="img-48"
          src={ getApiUrl(descriptionChat.avatar) }
          isOnline={ isOnline }
          hasCursor
        />
      </div>
      <div className={"descriptionchat-context " + ( hasRead ? " " : "unread" )}>
        <div className="descriptionchat-context-top">
          <span className={ ( hasRead ? "descriptionchat-username" : "descriptionchat-username-unread" ) }>
            {
              descriptionChat.title
              // descriptionChat.id
            }
          </span>
          {
            isGroup && (
              <CustomBadgeScreen
                text="Nhóm"
                class="margin-left-4"
              ></CustomBadgeScreen>
            )
          }
          <span className="descriptionchat-timeoflastmess body-reglar-hinted">
            {
              createdAt 
            }
          </span>
        </div>
        <div className={ "descriptionchat-context-bottom " + ( hasRead ? "" : "unread" ) } >
          <p className={ "text-overflow-ellipsis width-200 " + ( hasRead ? "body-reglar-hinted " : "body-bold" ) }>
            {
              lastMessage ? lastMessage : ""
            }
          </p>
        </div>      
      </div>
    </div>
  );
}

export default DescriptionChatScreen;
