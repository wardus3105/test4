import { URL_PATHS } from './../../../../../../../../helpers/networking/url-paths';
import axios from "axios";
import { ENUM_KIND_OF_ATTACHMENT } from "../../../../../../../../libraries/Enum/attachment";

function ChatListServices() {
    let instance: any;

    function init() {
        return {
            getAttachmentImageGroupDetail: async (chatRoomId: string , page:number) => {
                return await axios({
                    method: "GET",
                    url: `http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.GET_LIST_ATTACHMENT_IN_ROOMCHAT}`,
                    params: {
                        ChatRoomId: chatRoomId,
                        TypeAttachment: ENUM_KIND_OF_ATTACHMENT.IMAGE,
                        page:page,
                        pageSize: 20
                    },
                    timeout: 30000,
                })
                    .then((res) => res)
                    .catch((err) => console.log(err))
            }
        }
    };

    return {
        getInstance : () => {
            if (!instance) instance = init();
            return instance;
        }
    }
}

export default ChatListServices;
