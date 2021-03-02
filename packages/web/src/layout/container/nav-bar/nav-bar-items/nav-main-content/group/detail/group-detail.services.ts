import { ENUM_KIND_OF_ATTACHMENT } from './../../../../../../../libraries/Enum/attachment';

import axios from "axios";
import { URL_PATHS } from "../../../../../../../helpers/networking/url-paths";
import { IChat } from '../../conversation/main/conversation.props';

const GroupDetailServices = () => {
    let instance: any;

    function init() {
        return {
            getInforGroupDetail : async (chatRoomId: string) => {
                return await axios({
                    method:"GET",
                    url:`http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.GET_CHATROOM_DETAIL}?ChatRoomId=${chatRoomId}`,
                    timeout:30000  
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            },
            getGroupDetail : async (chatRoomId: string) => {
                return await axios({
                    method:"GET",
                    url:`http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.GET_MEMBER_IN_CONVERSION}?ChatRoomId=${chatRoomId}&page=1&pageSize=25`,
                    timeout:30000  
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            },
            getLinkGroupDetail : async (chatRoomId: string) => {
                return await axios({
                    method:"GET",
                    url:`http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.GET_LIST_LINK_IN_ROOMCHAT}?ChatRoomId=${chatRoomId}&page=1&pageSize=25`,
                    timeout:30000  
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            },

            getAttachmentImageGroupDetail : async (chatRoomId: string) => {
                return await axios({
                    method:"GET",
                    url:`http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.GET_LIST_ATTACHMENT_IN_ROOMCHAT}?ChatRoomId=${chatRoomId}&TypeAttachment=${ENUM_KIND_OF_ATTACHMENT.IMAGE}&page=1&pageSize=25`,
                    timeout:30000  
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            },
            getAttachmentFileGroupDetail : async (chatRoomId: string) => {
                return await axios({
                    method:"GET",
                    url:`http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.GET_LIST_ATTACHMENT_IN_ROOMCHAT}?ChatRoomId=${chatRoomId}&TypeAttachment=${ENUM_KIND_OF_ATTACHMENT.FILE}&page=1&pageSize=25`,
                    timeout:30000  
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            },
            deleteUserInChatRoomMember: async(data:any)=>{
                return await axios({
                    method:"POST",
                    url:`http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.POST_DELETE_USER_IN_CHAT_ROOM}`,
                    //url:"http://localhost:3002/api/chat-room-member/delete-user-in-chat-room",
                    data:data,
                    timeout:30000  
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            },           
            sendMessage: async (message: IChat) => {
                return axios({
                    method:"POST",
                    url:`http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.POST_MESSAGE}`,
                    headers: { 
                        "content-type": 'application/json',
                    },
                    data: message,
                    timeout:30000  
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            },
             getUserById : async (userId: any) => {
                return axios({
                    method: "POST",
                    url: `http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.POST_GET_USER_BY_ID}`,
                    headers: {
                        "content-type": 'application/json',
                    },
                    data: {
                        "text":userId
                    },
                    timeout: 30000
                })
                    .then((res) => res)
                    .catch((err) => err)
            },
            updatePermissionRoomChat: async(data:any)=>{
                debugger
                return await axios({
                    method:"POST",
                    //url:`http://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_IP_ADDRESS_PORT}/${URL_PATHS.POST_DELETE_USER_IN_CHAT_ROOM}`,
                    url:"http://localhost:3002/api/chat-room-member/update-permission-admin-room-chat",
                    data:data,
                    timeout:30000  
                })
                .then((res)=> res)
                .catch((err) => console.log(err))
            }, 
        }
    };
    
    return {
        getInstance : () => {
            if (!instance) instance = init();
            return instance;
        }
    }
}

export default GroupDetailServices;
