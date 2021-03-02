import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ENUM_KIND_OF_MESSAGE } from "../../../../../../../../libraries/Enum/message";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../../libraries/Enum/status-code";
import { messageDatabase } from "../../../../../../../../sampledatabase/Message.database";
import { IGuestChat } from "./guest-chat.props";
import GuestChatServices from "./guest-chat.services";
import GuestChatStates from "./guest-chat.states";

function GuestChatAdapter(props : IGuestChat){
    const history = useHistory();

    const {
        isVisibleReaction, setVisibleReaction
    } = GuestChatStates()

    const redirectToDetailUser = () =>{
        history.push("/personal/detail/" + props.roomId);
    }

    const setResponMess = () =>{
        const { message , context , type , user:{ userName } , setRespondedMess } = props;
        const messageId = message.id;
        setRespondedMess({
            messageId,
            context,
            type,
            userName
        })
    }

    const addReaction = async (event: any) => {
        // console.log(props.message.id);
        let sym = event.unified.split('-')
        let codesArray: any = []
        sym.forEach((el: any) => codesArray.push('0x' + el))
        let emoji: string = String.fromCodePoint(...codesArray)
        // console.log(emoji);

        let loginId = localStorage.getItem("userId");

        let message = props.message;
        // console.log(message);
        if (message.reaction) {
            let reactionList = message.reaction;
            if (reactionList.constructor !== [{}].constructor) {
                reactionList = JSON.parse(reactionList);
            }
            let flagEmoji: boolean = false;
            for (let reaction of reactionList) {
                if (reaction.key === emoji) {
                    let flag: boolean = false;
                    for (let userId of reaction.userListId) {
                        if (userId === loginId) {
                            flag = true;
                            reaction.userListId = reaction.userListId.filter((item:string) => item !== loginId);
                            break;
                        }
                    }
                    if (!flag) {
                        // console.log("add")
                        // console.log(reaction.userListId)
                        reaction.userListId.push(loginId);
                        // console.log(reaction.userListId)
                    }
                    flagEmoji = true;
                    break
                }
            }
            if (!flagEmoji) {
                let newKey = {
                    key: emoji,
                    userListId: [loginId]
                }
                reactionList.push(newKey);
            }
            message["reaction"] = reactionList;
        } else {
            message["reaction"] = [
                {
                    key: emoji,
                    userListId: [loginId]
                }
            ]
        }


        message["reaction"] = JSON.stringify(message["reaction"]);

        const response = await GuestChatServices().getInstance().editMessage(message);

        if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
            const { setChatList } = props;
            const messageId = message.id;
            setChatList((prev: any) => prev.map((messageEdit:any) => {
                if (messageId === messageEdit.id) {
                    message["reaction"] = JSON.parse(message["reaction"]);
                    messageEdit["reaction"] = message.reaction;
                    return messageEdit
                }
                return messageEdit;
            }));
        }
    }

    const copyText = () =>{
        props.type === ENUM_KIND_OF_MESSAGE.TEXT && navigator.clipboard.writeText(props.context)
    }

    return {
        redirectToDetailUser,
        setResponMess,
        copyText,
        addReaction,
        isVisibleReaction, setVisibleReaction
    }
}

export default GuestChatAdapter;