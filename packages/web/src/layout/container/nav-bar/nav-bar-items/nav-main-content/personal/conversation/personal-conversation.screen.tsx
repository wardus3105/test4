// @ts-nocheck
import React from 'react';
import DetailPopupScreen from '../../../../../../../libraries/Features/popup/detail-popup/detail-popup.screen';
import MainPopupScreen from '../../../../../../../libraries/Features/popup/main-popup/main-popup.screen';
import TooltipScreen from '../../../../../../../libraries/Features/tooltip/tooltip.screen';
import useIdInPath from "../../../../../../../libraries/Hooks/useIdInPath"
import ReconnectingWebSocket from 'reconnecting-websocket';
import { IconSearchLoupe , IconVolumeOff , IconTrashDeleteBin , IconVideoCircleLine } from '../../../../../../../libraries/Icons/icon.screen';

var sockets: ReconnectingWebSocket[] = [];
var socket: ReconnectingWebSocket;

const options = {
    WebSocket: WebSocket, // custom WebSocket constructor
    connectionTimeout: 1000,
    maxRetries: 10,
};

socket = new ReconnectingWebSocket(
    `ws://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_PUSH_STREAM_PORT}/ws?Channels=` + localStorage.getItem('userId'),
    [],
    options
 );
 
 socket.onopen = () => {
    // connection opened
    console.log("test_Connected");
    console.log(`test_ws://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_PUSH_STREAM_PORT}/ws?Channels=` + localStorage.getItem('userId'));
 };

function PersonalConversationScreen() {
    var roomId=useIdInPath(2);
    var roomName=Math.floor(Math.random() * 1000000);

    // React.useEffect(() => {
    //     socket.onmessage = (message) => {
    //         debugger
    //         var json=JSON.parse(decodeURIComponent(JSON.parse(message.data).text));
    //         if(localStorage.getItem('userId')!==json.value.userId){
    //             // window.open(window.location.protocol+"/video-call?roomName="+json.value.chatRoomId+"&userId="+localStorage.getItem('userId')+"&isCall=0","_blank","width=1000,height=1000");    
    //         }
    //    };
    // });
    // const {
    //     pushStreamService
    //  } = PersonalConversationAdapter()


    //  pushStreamService.subChat(localStorage.getItem('userId'));

    const clickCallVideo=()=>{              
         window.open(window.location.protocol+"/video-call?roomName="+roomId+"&userId="+localStorage.getItem('userId')+"&isCall=1","_blank","width=1000,height=1000"); 
    }


    const listEles = [
        {
            onClick: null,
            icon: <IconSearchLoupe></IconSearchLoupe>,
            text: "Tìm kiếm"
        },
        {
            onClick: null,
            icon: <IconVolumeOff></IconVolumeOff>,
            text: "Tắt thông báo"
        },
        {
            onClick: null,
            icon: <IconTrashDeleteBin></IconTrashDeleteBin>,
            text: "Xóa chat"
        }
    ];

    const eleDetailPopup =(onClosePopup: any) =>(<DetailPopupScreen 
                                                    listEles={ listEles } 
                                                    onClosePopup={ onClosePopup }
                                                ></DetailPopupScreen>);

    const eleOptionHeader = (onSearch: any) => (
        <>
            <TooltipScreen position={ ['bottom center'] } context="Gọi video">
                <div onClick={()=>clickCallVideo()} className="cursor-pointer">
                    <IconVideoCircleLine className="icon-svg--hover"></IconVideoCircleLine>
                </div>
            </TooltipScreen>
            <TooltipScreen context="Tìm kiếm">
                <IconSearchLoupe onClick={ onSearch } className="cursor-pointer icon-svg--hover"></IconSearchLoupe>
            </TooltipScreen>
            <MainPopupScreen context={ eleDetailPopup }>
                <div>
                    <TooltipScreen position={ ['top center'] } context="Chức năng khác">
                        <div className="img-24 flex-center cursor-pointer icon-svg--hover">
                            <div className="vertical3dots " ></div>
                        </div>
                    </TooltipScreen>
                </div>
            </MainPopupScreen>
        </>
    )

    return eleOptionHeader;
}

export default PersonalConversationScreen;
