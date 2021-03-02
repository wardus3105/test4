import "font-awesome/css/font-awesome.min.css";
import React, { useEffect, useState } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import "./App.scss";
import BodyScreen from "./layout/container/body.screen";
import HeaderScreen from "./layout/header/header.screen";
import VideoConference from "./libraries/Features/video-call/video-call.screen";
import "./libraries/Styles/base/hyper-button.scss";
import "./libraries/Styles/base/hyper-common.scss";
import "./libraries/Styles/base/hyper-input.scss";
import "./libraries/Styles/base/hyper-list.scss";
import ChatRoomAdapter from 'base';
var sockets: ReconnectingWebSocket[] = [];
var socket: ReconnectingWebSocket;

const options = {
  WebSocket: WebSocket, // custom WebSocket constructor
  connectionTimeout: 1000,
  maxRetries: 10,
};

const { printService , printHello } = ChatRoomAdapter();

function App() {
  const [hasVideo, setHasVideo] = useState<boolean>(false);
    printService();
    printHello();
  useEffect(() =>{
    if (window.location.pathname.indexOf('video-call')>-1){
      setHasVideo(true)
    }
  } , [])

  const pushStreamService = {
    // subAllChats: (userChats: User[]) => {
    //   pushStreamService.closeAllSocket();
    //   for (let i = 0; i < userChats.length; i++) {
    //     pushStreamService.subChat(userChats[i].id);
    //   }
    // },

    // subChannelSystem: () => {
    //   pushStreamService.subChat('CHANNEL_ACTIVITIES');
    // },

    messageReceived: (message: any) => {
      console.log("-----Message Received-----");
      console.log(message);
    },

    subChat: (userId: string) => {
      console.log("-----Sub chat-----");
      console.log(`ws://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_PUSH_STREAM_PORT}/ws?Channels=` + userId);
      socket = new ReconnectingWebSocket(
          `ws://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_PUSH_STREAM_PORT}/ws?Channels=` + userId,
        [],
        options
      );

      socket.onopen = () => {
        // connection opened
        console.log("test_Connected");
        console.log(`test_ws://${process.env.REACT_APP_IP_ADDRESS_API}:${process.env.REACT_APP_PUSH_STREAM_PORT}/ws?Channels=` + userId);
      };

      socket.onmessage = (e) => {
        console.log("-----on message");
        pushStreamService.messageReceived(
          decodeURIComponent(JSON.parse(e.data).text)
        );
      };

      socket.onerror = (e: any) => {
        // an error occurred
        console.log("test_socket_err: ", e);
        // socket.close();
        // clearInterval();
        // setTimeout(function() {
        // pushStreamService.subChat(userId);
        // }, 1000);
      };

      socket.onclose = (e: any) => {
        console.log(
          "test_Socket is closed. Reconnect will be attempted in 1 second.",
          e.reason
        );
      };
      // sockets.push(ws);
    },
    closeSocket: () => {
      console.log("test_closeSocket");
      socket.close();
    },
    closeAllSocket: () => {
      console.log("test_closeAllSocket");
      sockets.map((s) => s.close());
    },
  };

  // useEffect(() => {
  //   console.log('test_init_app...');
  //   // localStorage.setItem('userId', "189cbce2-4532-4c0e-9e68-2e4fec9351e2");
  //   const userId: string = localStorage.getItem("userId") || "";
  //   if(userId){
  //     pushStreamService.subChat(userId);
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log('Token...');
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const token: any = urlParams.get('token');

  //   localStorage.setItem('access_token', token);
    
  //   console.log(token);
  //   const getProfile = async () => {
  //     await axios({
  //       method: "POST",
  //       url: `http://localhost.ihcm.vn:8088/ihcm/api/employee/detailProfile`,
  //       headers: { 
  //         "content-type": 'application/json',
  //         'Authorization': 'Bearer ' + token
  //       },
  //       data: {},
  //       timeout:30000  
  //   })
  //   .then((res) => console.log("Res...: " + res))
  //   .catch((err) => console.log(err))
  //   };
 
  //   getProfile();
  // }, []);

  
  if(hasVideo){
    return (
      <>
        <VideoConference ></VideoConference>  
      </>
    );
  }
  return (
    <>
      <HeaderScreen></HeaderScreen>

      <BodyScreen></BodyScreen>
    </>
  );
}

export default App;
