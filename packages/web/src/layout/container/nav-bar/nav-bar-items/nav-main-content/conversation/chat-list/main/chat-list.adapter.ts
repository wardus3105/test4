import { useEffect, useLayoutEffect, useRef } from "react";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../../libraries/Enum/status-code";
import useScroll from "../../../../../../../../libraries/Hooks/useScroll";
import ChatInputServices from "../../chat-input/main/chat-input.services";
import ChatListStates from "./chat-list.states";

import ReconnectingWebSocket from "reconnecting-websocket";
import { IMiniImage } from "../../../../../../../../libraries/Features/image-overlay-full-screen/image-overlay-full-screen.props";
import ChatListServices from "./chat-list.services";

var sockets: ReconnectingWebSocket[] = [];
var socket: ReconnectingWebSocket;

const options = {
    WebSocket: WebSocket, // custom WebSocket constructor
    connectionTimeout: 1000,
    maxRetries: 10,
};

function ChatListAdapter(props: any) {
    const chatlistRef = useRef<HTMLInputElement>(null);

    const { count, page, setPage, isUpdating, roomId , setListMessage } = props;

    const {
        userid, setUserid,
        bottom, setBottom,
        isOpenOverlay, setIsOpenOverlay,
        mainImage, setMainImage,
        miniImageList, setMiniImageList
    } = ChatListStates();

    useEffect(() => {
        const eleChatInput = document.getElementById("chat-input");
        if (eleChatInput) {
            setBottom(eleChatInput.offsetHeight.toString());
        }
    })

    useEffect(() => {
        const getData = async () => {
            const response = await ChatListServices().getInstance().getAttachmentImageGroupDetail(roomId , 1);
            if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                const result = response.data.data;
                setMiniImageList(result);
            }
        }

        getData();
    }, [setMiniImageList, roomId])

    // useEffect(() => {
    //     const userId: string = localStorage.getItem("userId") || "";
    //     if (userId) {
    //         console.log('test_init_app...');
    //         pushStreamService.subChat(userId);
    //     }
    // }, []);

    useLayoutEffect(() => {
        if (chatlistRef.current) {
            if (page === 1 && !isUpdating) {
                chatlistRef.current.scrollTop = chatlistRef.current.scrollHeight;
            } else {
                if (!isUpdating) {
                    chatlistRef.current.scrollTop = chatlistRef.current.scrollHeight / 4;
                }
            }
        }
    }, [page, isUpdating])

    useEffect(() => {
        const userId = localStorage.getItem('userId') || "";
        setUserid(userId);
    }, [setUserid])

    const clickFirstMessage = async () => {
        const chats = {
            chatRoomId: roomId,
            message: "Xin chào",
            messageStatus: "1",
            messageType: "1",
            user: { userName: "Huy dz", status: "1", id: userid },
            userId: userid,
            createdAt: new Date(),
            attachments: []
        }

        setListMessage((prev:any) => [chats, ...prev])

        const response = await ChatInputServices().getInstance().sendMessage(chats);
        if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {

        }
    }

    const { handleScroll } = useScroll(page, setPage, count, isUpdating, chatlistRef, true)


    const toggleOverlay = (miniImage: IMiniImage) => {
        setIsOpenOverlay(prev => !prev);
        setMainImage(miniImage);
    }

    // const pushStreamService = {
    //     messageReceived: (message: any, userid: string) => {
    //         console.log("-----Message Received-----");
    //         const messageReceived = JSON.parse(message)

    //         if (messageReceived.value.user !== userid) {
    //             const chats = [{
    //                 chatRoomId: messageReceived.value.chatId,
    //                 message: messageReceived.value.text,
    //                 messageStatus: "1",
    //                 messageType: "1",
    //                 user: { userName: "chat.app6", status: "1" },
    //                 userId: messageReceived.value.user
    //             }]

    //             setChatList(prev => [...chats, ...prev])
    //         }

    //     },

    //     subChat: (userId: string) => {
    //         console.log("-----Sub chat-----");
    //         console.log(`ws://172.20.50.77:31000/ws?Channels=` + userId);
    //         socket = new ReconnectingWebSocket(
    //             `ws://172.20.50.77:31000/ws?Channels=` + userId,
    //             [],
    //             options
    //         );

    //         socket.onopen = () => {
    //             // connection opened
    //             console.log("test_Connected");
    //             console.log(`test_ws://172.20.50.77:31000/ws?Channels=` + userId);
    //         };

    //         socket.onmessage = (e) => {
    //             console.log("-----on message");
    //             pushStreamService.messageReceived(
    //                 decodeURIComponent(JSON.parse(e.data).text),
    //                 userId
    //             );
    //         };

    //         socket.onerror = (e: any) => {
    //             // an error occurred
    //             console.log("test_socket_err: ", e);
    //         };

    //         socket.onclose = (e: any) => {
    //             console.log(
    //                 "test_Socket is closed. Reconnect will be attempted in 1 second.",
    //                 e.reason
    //             );
    //         };
    //         // sockets.push(ws);
    //     },
    //     closeSocket: () => {
    //         console.log("test_closeSocket");
    //         socket.close();
    //     },
    //     closeAllSocket: () => {
    //         console.log("test_closeAllSocket");
    //         sockets.map((s) => s.close());
    //     },
    // };

    return {
        userid,
        chatlistRef,
        handleScroll,
        isUpdating,
        clickFirstMessage,
        bottom,
        isOpenOverlay,
        mainImage,
        miniImageList,
        toggleOverlay
    };
}

export default ChatListAdapter;
