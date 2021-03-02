// @ts-nocheck
import React, { useState } from "react";
import jitsiVidelCall from "./video-call.adapter";
import jitsiState from "./video-call.state"
import { IChat } from "../../../layout/container/nav-bar/nav-bar-items/nav-main-content/conversation/main/conversation.props"
import { ENUM_KIND_OF_MESSAGE } from '../../Enum/message'
import { ENUM_KIND_OF_STATUS } from '../../Enum/status'
import { ENUM_KIND_OF_MESSAGE_VIDEO_CALL, ENUM_TYPE_STATUS_VIDEO_CALL } from '../../Enum/video-call'
import { ENUM_KIND_OF_TYPE_VIDEO_CALL } from '../../Enum/type-video-call'
import videoCallService from "./video-call.service";
import ReconnectingWebSocket from 'reconnecting-websocket';
import * as Default from './defaults'
import { ENUM_KIND_OF_VIDEO_CALL } from '../../Enum/video-call'
var config = require('./config.js')
var interfaceConfig = require('./interface_config.js')

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

var startDateCurrent;

const VideoConference = () => {

   const {
      jitsi, setJitsi,
      roomId, setRoomId,
      roomName, setRoomName,
      userId, setUserId,
      isCall, setIsCall,
      isListen, setIsListen,
      startDate, setStartDate,
      endDate, setEndDate,
      loading, setLoading
   } = jitsiState()

   const {
      sendMessage,
      getUserById,
      sendMessageVideo
   } = videoCallService()

   const data = {
      roomName: roomName,
      width: "100%",
      height: "100%",
      setJitsi: setJitsi
   }

   const setStartDateFuntion=(value:any)=>{
      setStartDate(value);
   }

   const setListenFuntion=(value:any)=>{
      setIsListen(value);
   }

   const sendMessageFunction=()=>{
      const time = (new Date() - startDateCurrent);
      let messageSend: IChat = {
         message: "",
         messageType: ENUM_KIND_OF_MESSAGE.VIDEO_CALL,
         messageStatus: ENUM_KIND_OF_STATUS.ACTIVE,
         userId: userId,
         user: {
            userName: "",
            status: ENUM_KIND_OF_STATUS.ACTIVE,
            id: userId,
         },
         chatRoomId: roomName,
         createdAt: new Date(),
         attachments: []
      }

      if (isCall === "1" && isListen) {
         messageSend.message=ENUM_TYPE_STATUS_VIDEO_CALL.LISTEN_CALL_VIDEO
         messageSend.timeVideoCall=new Date(time)
      }
      else if(isCall === "1" && !isListen){
         messageSend.message=ENUM_KIND_OF_MESSAGE_VIDEO_CALL.MISSED_CALL_VIDEO
         messageSend.statusVideoCall=ENUM_TYPE_STATUS_VIDEO_CALL.MISSED_CALL_VIDEO
      }
      if(isCall==="1"){
         sendMessageVideo(messageSend)
      }
   }

   const loadJitsiScript = async () => {
      let resolveLoadJitsiScriptPromise: any | null = null;

      const loadJitsiScriptPromise = new Promise(resolve => {
         resolveLoadJitsiScriptPromise = resolve;
      });

      const script = document.createElement("script");
      script.src = ENUM_KIND_OF_VIDEO_CALL.LINK_JITSI_MEET_JS;
      script.async = true;
      script.onload = () => resolveLoadJitsiScriptPromise(true);
      document.body.appendChild(script);
      return loadJitsiScriptPromise;
   };

   React.useEffect(() => {
      (async () => {
         if (!window.JitsiMeetExternalAPI) {
            await loadJitsiScript();
         }

         // Lấy thông tin người đăng nhập  
         const response = await getUserById(userId);

         const _jitsi = new window.JitsiMeetExternalAPI(ENUM_KIND_OF_VIDEO_CALL.LINK_JITSI_MEET, {
            roomName: "123",
            // jwt: '<jwt_token>',
            devices: {
               audioInput: '<deviceLabel>',
               audioOutput: '<deviceLabel>',
               videoInput: '<deviceLabel>'
            },
            configOverwrite: { startWithAudioMuted: true, enableClosePage: false },
            interfaceConfigOverwrite: interfaceConfig,
            parentNode: document.getElementById("jitsi-container-id")
         });

         //set tên người tham gia phòng chat
         _jitsi.executeCommand('displayName', response.data.data.lastName + " " + response.data.data.firstName);
         //set email người tham gia phòng chat
         _jitsi.executeCommand('email', response.data.data.email);

         //hành động tắt cuộc gọi
         _jitsi.addEventListener('readyToClose', function () {          
            sendMessageFunction()
            _jitsi?.dispose?.();

         });

         if(isCall==="1"){
            //Bật hoặc tắt chế độ sảnh đợi.
            _jitsi.executeCommand('toggleVideo');
         }

         window.onbeforeunload = closingCode;
            function closingCode(){
               // do something...
               sendMessageFunction();
               _jitsi?.dispose?.();
               return null;
            }

         let messageSend: IChat = {
            message: ENUM_KIND_OF_MESSAGE_VIDEO_CALL.CREATE_CALL_VIDEO,
            messageType: ENUM_KIND_OF_MESSAGE.VIDEO_CALL,
            messageStatus: ENUM_KIND_OF_STATUS.ACTIVE,
            userId: userId,
            chatRoomId: roomName,
            typeVideoCall: ENUM_KIND_OF_TYPE_VIDEO_CALL.PRIVATE
         }
         
         if (isCall === "0") {
            messageSend.statusVideoCall = ENUM_TYPE_STATUS_VIDEO_CALL.LISTEN_CALL_VIDEO
            setListenFuntion(true);
         }

         sendMessage(messageSend)

         socket.onmessage = (message) => {
            var data = JSON.parse(decodeURIComponent(JSON.parse(message.data).text));
            if (data.value.statusVideoCall === ENUM_TYPE_STATUS_VIDEO_CALL.NOT_LISTEN_CALL_VIDEO) {
               _jitsi?.dispose?.();
               window.close();
            }
            if (data.value.statusVideoCall === ENUM_TYPE_STATUS_VIDEO_CALL.LISTEN_CALL_VIDEO && isCall === "1") {
               _jitsi.executeCommand('toggleVideo');
               setStartDateFuntion(new Date());
               startDateCurrent=new Date();
               setListenFuntion(true);
            }
            if (data.value.statusVideoCall === ENUM_TYPE_STATUS_VIDEO_CALL.LISTEN_CALL_VIDEO && isCall === "1") {
               _jitsi?.dispose?.();
               window.close();
            }
         };

      })();

      return () => jitsi?.dispose?.();

   }, []);

   return (
      <div id="jitsi-container-id" style={{ height: window.outerHeight, width: "100%" }} />
   )
};

export default VideoConference;
