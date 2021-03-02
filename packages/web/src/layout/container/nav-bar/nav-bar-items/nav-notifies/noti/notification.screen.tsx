import React from 'react';
import { ENUM_KIND_OF_NOTIFICATION } from '../../../../../../libraries/Enum/notification';
import CircleAvatarScreen from '../../../../../../libraries/Features/circle-avtar/circle-avatar.screen';
import decodeHTML from '../../../../../../libraries/Functions/decode-html';
import getTimePeriodFromNow from '../../../../../../libraries/Functions/get-time-period-from-now';
import useWindowSize from '../../../../../../libraries/Hooks/useWindowSize';
import { IconNotiLike, IconNotiReply, IconNotiSignout, IconNotiTag } from '../../../../../../libraries/Icons/icon.screen';
import { INotification } from './notification.props';
import './notification.scss';

function NotificationScreen(props: INotification) {
    const { width } = useWindowSize();

    function context ():string{
        switch (props.status) {
            case ENUM_KIND_OF_NOTIFICATION.REPLY:
                return "đã trả lời bình luận của bạn trong &#8243; " + props.context +" &#8243;";
            case ENUM_KIND_OF_NOTIFICATION.KICKED:
                return "đã xóa bạn khỏi nhóm chat &#8243; " + props.context +" &#8243;";
            case ENUM_KIND_OF_NOTIFICATION.LIKE:
                return "đã tương tác bình luận của bạn ";
            case ENUM_KIND_OF_NOTIFICATION.TAG:
                return "đã nhắc bạn trong một bình luận ";
            default:
                return "";
        }
    }

    const icon = () =>{
        switch (props.status) {
            case ENUM_KIND_OF_NOTIFICATION.REPLY:
                return <IconNotiReply></IconNotiReply>;
            case ENUM_KIND_OF_NOTIFICATION.KICKED:
                return <IconNotiSignout></IconNotiSignout>;
            case ENUM_KIND_OF_NOTIFICATION.LIKE:
                return <IconNotiLike></IconNotiLike>
            case ENUM_KIND_OF_NOTIFICATION.TAG:
                return <IconNotiTag></IconNotiTag>;
        }
    }

    const renderUserImage = () => {
        let widthAva="48px";
        let heightAva="48px";
        if (width < 768) {
            widthAva="40px";
            heightAva="40px";
        }

        return (
            <CircleAvatarScreen
              class=""
              width={ widthAva }
              height={ heightAva }
              src={ props.avatar }
              isOnline={ false }
              notiIcon={ icon() }
            />
        );
    };

    return (
        <div className={ "descriptionchat-container notification-container cursor-pointer " + ( props.isActive ? "descriptionchat-container--active" : "" )}>
            <div className="descriptionchat-image">
                {
                    renderUserImage()
                }
            </div>
            <div className="descriptionchat-context">
                <div>
                    <div className="notification-context">
                        <p>{ props.username }</p>
                        {" "}
                        <span>{ decodeHTML(context()) }</span>
                    </div>
                    <span className="notification-time">
                        { getTimePeriodFromNow(props.time) } 
                    </span>
                </div>
            </div>
        </div>
    );
}

export default NotificationScreen;


