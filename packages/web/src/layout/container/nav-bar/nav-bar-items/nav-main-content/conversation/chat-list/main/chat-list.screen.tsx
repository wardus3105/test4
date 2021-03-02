import React from 'react';
import LoadingSpinnerScreen from '../../../../../../../../libraries/Features/loading-spinner/loading-spinner.screen';
import ImageContextChatScreen from '../context-chat/image-context-chat/image-context-chat.screen';
import TextContextChatScreen from '../context-chat/text-context-chat/text-context-chat.screen';
import CurrentChatScreen from '../current-chat/current-chat.screen';
import GuestChatScreen from '../guest-chat/guest-chat.screen';
import DatetimeContextChatScreen from '../context-chat/datetime-context-chat/datetime-context-chat.screen';
import getTimePeriodFromNow from '../../../../../../../../libraries/Functions/get-time-period-from-now';
import './chat-list.scss';
import ChatListAdapter from './chat-list.adapter';
import DataNotFoundScreen from '../../../../../../../../libraries/Features/data-not-found/data-not-found.screen';
import { ENUM_KIND_OF_NOTFOUNDICON } from '../../../../../../../../libraries/Enum/not-found-icon';
import haveSameTimePeriod from '../../../../../../../../libraries/Functions/get-time-period-between-times';
import { ENUM_KIND_OF_SHAPE_OF_MESSAGE } from '../../../../../../../../libraries/Enum/shape_of_message';
import { ENUM_KIND_OF_MESSAGE } from '../../../../../../../../libraries/Enum/message';
import ImageOverlayScreen from '../../../../../../../../libraries/Features/image-overlay-full-screen/image-overlay-full-screen.screen';

function ChatListScreen(props: any) {
    const { listMessage, setListMessage , memberInGroup , setChatList ,  count, page, setPage, isUpdating, roomId, hasSearch, setRespondedMess, setEditedMess } = props;

    const {
        userid,
        chatlistRef,
        handleScroll,
        clickFirstMessage,
        bottom,
        isOpenOverlay,
        toggleOverlay,
        mainImage,
        miniImageList
    } = ChatListAdapter({ count, page, setPage, isUpdating, roomId , setListMessage })


    const length = listMessage.length;
    const showAllMessages = () => {
        if (length > 0) {
            const list = [...listMessage]
            console.log(list)
            let datetimeContext = new Date(list[0].createdAt);

            return list.map((chat: any, index: number) => {
                let eleMainContext = <></>;
                let eleDatetime = <></>;
                let shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.BOTTOM;
                const isCurrent: boolean = chat.user.id === userid;
                const createAt = new Date(chat.createdAt);

                if (isCurrent && chat.messageType === ENUM_KIND_OF_MESSAGE.TEXT) {
                    let haveSameTime = haveSameTimePeriod(datetimeContext, createAt)
                    if (haveSameTime) {
                        shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.CENTER;

                        if (index < list.length - 1) {
                            const haveSameTime2 = haveSameTimePeriod(createAt, new Date(list[index + 1].createdAt))
                            if (haveSameTime2) {
                                if (index === 0) {
                                    shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.BOTTOM;
                                } else {
                                    shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.CENTER;
                                }
                            } else {
                                shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.TOP;
                            }
                        } else {
                            shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.TOP;
                        }
                    } else {
                        shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.TOP;

                        if (index < list.length - 1) {
                            const haveSameTime2 = haveSameTimePeriod(createAt, new Date(list[index + 1].createdAt))
                            if (haveSameTime2) {
                                shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.BOTTOM;
                            } else {
                                shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.TOP;
                            }
                        } else {
                            shape = ENUM_KIND_OF_SHAPE_OF_MESSAGE.TOP;
                        }
                    }
                }

                datetimeContext = createAt;
                // const haveSameDay = datetimeContext.startOf('day').isSame(createAt.startOf('day'));
                // if(!haveSameDay){
                //     eleDatetime = <DatetimeContextChatScreen datetime={ datetimeContext.format("DD/MM/YYYY") }></DatetimeContextChatScreen>;
                // }

                const respondedMess = chat.parent ? chat.parent : (chat.respondedMess ? chat.respondedMess : null);

                const eleContext = (
                    <div className="maincontext">
                        {
                            chat?.attachments?.length > 0 ? (
                                <ImageContextChatScreen
                                    isCurrent={isCurrent}
                                    context={chat.attachments}
                                    datetime={getTimePeriodFromNow(chat.createdAt)}
                                    toggleOverlay={toggleOverlay}
                                    listImage={miniImageList}
                                ></ImageContextChatScreen>
                            ) : (
                                <TextContextChatScreen
                                    isCurrent={ isCurrent }
                                    context={ chat.message }
                                    datetime={ getTimePeriodFromNow(chat.createdAt) }
                                    shape={ shape }
                                    time={ chat.createdAt }
                                    index={ index }
                                    respondedMess={ respondedMess }
                                    reactionList = { chat.reaction }
                                    memberInGroup={memberInGroup}
                                ></TextContextChatScreen>
                            )
                        }
                    </div>
                )
                if (isCurrent) {
                    eleMainContext = (
                        <CurrentChatScreen
                            roomId={roomId}
                            type={chat.messageType}
                            context={chat.messageType === ENUM_KIND_OF_MESSAGE.ATTACHMENT ? chat.attachments[0]?.name : chat.message}
                            setRespondedMess={setRespondedMess}
                            messageId={chat.id}
                            userId={userid}
                            setChatList={setListMessage}
                            setEditedMess={setEditedMess}
                        >
                            {eleContext}
                        </CurrentChatScreen>
                    )
                } else {
                    eleMainContext = (
                        <GuestChatScreen
                            roomId={roomId}
                            type={chat.messageType}
                            user={chat.user}
                            context={chat.messageType === ENUM_KIND_OF_MESSAGE.ATTACHMENT ? chat.attachments[0]?.name : chat.message}
                            setRespondedMess={setRespondedMess}
                            message={chat}
                            setChatList={ setChatList }
                        >
                            { eleContext}
                        </GuestChatScreen>
                    )
                }
                return (
                    <div key={index}>
                        { eleMainContext}
                        { eleDatetime}
                    </div>
                )
            })
        }
    }
    if (length > 0) {
        return (
            <div
                className={"chatlist-container " +
                    (hasSearch ? "chatlist-container-hassearch " : "")
                }
                onScroll={handleScroll}
                ref={chatlistRef}
                style={{ bottom: `${bottom}px` }}
            >
                <div className="chatlist-main">
                    {
                        showAllMessages()
                    }
                    {
                        length < count && <LoadingSpinnerScreen class="loader-small"></LoadingSpinnerScreen>
                    }
                </div>
                {
                    isOpenOverlay && (<ImageOverlayScreen close={toggleOverlay} miniImageList={miniImageList} mainMiniImage={mainImage}></ImageOverlayScreen>)
                }
            </div>
        )
    }
    return (

        <div className="chatlist-container" >
            {
                <DataNotFoundScreen onClick={clickFirstMessage} isPosition={false} icon={ENUM_KIND_OF_NOTFOUNDICON.MESSAGE} text="Nhấn để xin chào"></DataNotFoundScreen>
            }

        </div>
    )
}

export default ChatListScreen;
