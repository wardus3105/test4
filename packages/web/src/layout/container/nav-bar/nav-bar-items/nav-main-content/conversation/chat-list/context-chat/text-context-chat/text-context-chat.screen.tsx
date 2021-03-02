import moment from 'moment';
import React from 'react';
import Popup from 'reactjs-popup';
import { ENUM_KIND_OF_MESSAGE } from '../../../../../../../../../libraries/Enum/message';
import { ENUM_KIND_OF_SHAPE_OF_MESSAGE } from '../../../../../../../../../libraries/Enum/shape_of_message';
import MainPopupScreen from '../../../../../../../../../libraries/Features/popup/main-popup/main-popup.screen';
import TooltipScreen from '../../../../../../../../../libraries/Features/tooltip/tooltip.screen';
import getApiUrl from '../../../../../../../../../libraries/Functions/get-api-url';
import getTimePeriodFromNow from '../../../../../../../../../libraries/Functions/get-time-period-from-now';
import { IconDeleteDisabled, IconShareArrowLeftSolid } from '../../../../../../../../../libraries/Icons/icon.screen';
import TextContextChatAdapter from './text-context-chat.adapter';
import './text-context-chat.scss';

function TextContextChatScreen(props : any){
    let { context , datetime , time , index , respondedMess , isCurrent, reactionList, memberInGroup } = props;

    const { } = TextContextChatAdapter();

    const showContext = () =>{
        const rows = context.split("\n");
        if(rows.length > 1){
            return rows.map((row: string) =>{
                return <span>
                            {row}
                            <br></br>
                        </span>;
            })
        }
        return <span>
            {context}
        </span>;
    }

    const getClassByShape = () =>{
        const shape = props.shape;
        if(isCurrent){
            switch (shape) {
                case ENUM_KIND_OF_SHAPE_OF_MESSAGE.TOP:
                    return "";
                case ENUM_KIND_OF_SHAPE_OF_MESSAGE.CENTER:
                    return "currentchat-center";
                case ENUM_KIND_OF_SHAPE_OF_MESSAGE.BOTTOM:
                    return "currentchat-bottom";
            }
        }
        return ""
    }

    const styleInline = { 
        backgroundImage: `url(https://cdn.dribbble.com/users/2199928/screenshots/11532918/shot-cropped-1590177932366.png?compress=1&resize=400x300)` , 
        backgroundColor:"#d7e4e2",
        minWidth: props.width , 
        minHeight: props.height,
        cursor: props.hasCursor ? "pointer" : "initial"
      };

    const TooltipReactionDetail = (props: any) => (
        props.reaction ? props.reaction.userListId.map((userId: any, idx: number) => {
            for (let member of memberInGroup) {
                if (member.userId === userId) {
                    if (member.avatar) {
                        styleInline.backgroundImage = `url(${member.avatar})`
                    }
                    return (
                        <Popup
                            trigger={
                            props.children
                            }
                            position={ props.position ? props.position : ['top center', 'bottom center'] }
                            on={['hover', 'focus']}
                            arrow={true}
                        >
                            <div className="tooltip-container">
                                <ul className="detailpopup-detail detail-popup-reaction">
                                    <li>
                                        <div 
                                            className={ "circleavatar-container img-24" } 
                                            style={ styleInline }
                                        ></div>
                                        <span className="color-neutral-white cursor-default">
                                            {member.user.userName}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </Popup>
                    )
                }
            }
        }) : ''
    )

    const showReaction = reactionList ? reactionList.map((reaction: any, idx: number) => {
        return reaction.userListId ? (reaction.userListId.length > 0 ? ( 
            <TooltipReactionDetail reaction={reaction}>
                <div className={"reaction-icon"} >
                    {reaction.key}
                    {reaction.userListId.length}
                </div>
            </TooltipReactionDetail>
            ) : '') : ''
    }) : '';

    const showRespondedMess = () =>{
        const url = respondedMess.messageType === ENUM_KIND_OF_MESSAGE.ATTACHMENT ? 
                    (respondedMess.attachments ? respondedMess.attachments[0].name : "")
                    : 
                    (respondedMess.message)
    
        return (
            <>
                { 
                    isCurrent && (
                        <div className="margin-left-20 textcontext-subtitle"> 
                            <IconShareArrowLeftSolid></IconShareArrowLeftSolid>
                            <span className="subtitle-regular-2">
                                Bạn đã trả lời 
                                <span className="subtitle-bold-2"> { respondedMess.user.userName }</span> 
                            </span>
                            
                        </div>
                    )
                }
                {
                    respondedMess.messageType === ENUM_KIND_OF_MESSAGE.ATTACHMENT ? (
                        <div className={"imagechat-container cursor-pointer "}>
                            <img src={ getApiUrl(url)} className={ isCurrent ? "margin-left-auto" : ""  } alt=""/>
                        </div>
                    ) :(
                        <div className={"textcontext-respondedmess "  + ( isCurrent ? "margin-left-auto" : "" )}>
                            <span className="margin-left-8">
                                { respondedMess.message }
                            </span>
        
                            <span className="chat-time">
                                { getTimePeriodFromNow(respondedMess.createdAt) }
                            </span>
                        </div>
                    )
                }
            </>
        )
    }

    if(context){
        return (
            <>
                <div className="textcontext-container">
                    {
                        respondedMess && showRespondedMess()
                    }
                </div>
                <div className={ "padding-12 body-regular   " + (isCurrent ? "currentchat-text " : "guestchat-text ") + getClassByShape() }>

                    <div className={ "padding-12 " + (isCurrent ? "currentchat-text " : "guestchat-text ") + getClassByShape() }>
                        { showContext() }    
                        <span className="chat-time">
                            {/* { props.shape + " --- " + moment(time).format("YYYY-MM-DD HH:mm:ss") + " --- " + index } */}
                                { datetime }
                        </span>
                    </div>

                    {showReaction}
                </div>
            </>
        )
    }

    return <></>;
}

export default TextContextChatScreen;


