import React from 'react';
import { ENUM_KIND_OF_GROUPNOTICHAT } from '../../../../../../../../../libraries/Enum/group-noti-chat';
import CircleAvatarScreen from '../../../../../../../../../libraries/Features/circle-avtar/circle-avatar.screen';
import { IconUserAdd, IconUsersOut } from '../../../../../../../../../libraries/Icons/icon.screen';
import { IGroupNotiContextChat } from './group-noti-context-chat.props';
import './group-noti-context-chat.scss';

function GroupNotiContextChatScreen(props : IGroupNotiContextChat){

    const content = () =>{
        switch (props.status) {
            case ENUM_KIND_OF_GROUPNOTICHAT.ADD_MEMBER: 
                return " đã được thêm vào nhóm";
            case ENUM_KIND_OF_GROUPNOTICHAT.MEMBER_GETOUT: 
                return " đã thoát khỏi nhóm";
            case ENUM_KIND_OF_GROUPNOTICHAT.KICK_MEMBER: 
                return " đã bị xóa khỏi nhóm";
        }
    }

    return (
        <div className="groupnotichat-container">
            <CircleAvatarScreen
                width=""
                height=""
                src={ props.imgSrc }
                class="avatar-circle-default"
                isOnline={ false }
                onClick={ null }
            ></CircleAvatarScreen>
            <div className="groupnotichat-content">
                {
                    props.status === ENUM_KIND_OF_GROUPNOTICHAT.ADD_MEMBER ? (
                        <IconUserAdd className="margin-right-8"></IconUserAdd>
                    ) : (
                        <IconUsersOut className="margin-right-8"></IconUsersOut>
                    )
                }
                { " " }
                <div>
                    <span className="groupnotichat-content-username">
                        { props.username }
                    </span> 
                    {
                        content()
                    }
                </div>
            </div>

        </div>
    )
}

export default GroupNotiContextChatScreen;