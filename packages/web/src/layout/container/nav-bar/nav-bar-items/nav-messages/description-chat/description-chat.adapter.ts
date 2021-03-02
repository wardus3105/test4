import useWindowSize from "../../../../../../libraries/Hooks/useWindowSize";
import { IDescriptionChatComp } from "./description-chat.props";
import { ENUM_KIND_OF_CHATROOM } from "../../../../../../libraries/Enum/chat-room";
import getTimePeriodFromNow from "../../../../../../libraries/Functions/get-time-period-from-now";
import { ENUM_KIND_OF_STATUS } from "../../../../../../libraries/Enum/status";


function DescriptionChatAdapter(props: IDescriptionChatComp) {
    const { width } = useWindowSize();

    const { descriptionChat , activedDescriptionChat , onClick } = props;

    const createdAt = getTimePeriodFromNow(descriptionChat.createdAt);
    const lastMessage = descriptionChat.lastMessage;

    const isGroup = descriptionChat.type === ENUM_KIND_OF_CHATROOM.GROUP;
    
    let hasActived = false;
    if(activedDescriptionChat){
        hasActived = activedDescriptionChat === descriptionChat.id;
    }
    const hasRead = descriptionChat.status === ENUM_KIND_OF_STATUS.ACTIVE || hasActived;
    const isOnline = descriptionChat.status === ENUM_KIND_OF_STATUS.ACTIVE;

    let widthAva="48px";
    let heightAva="48px";
    if (width < 768) {
        widthAva="40px";
        heightAva="40px";
    }

    return {
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
    }
}

export default DescriptionChatAdapter;
