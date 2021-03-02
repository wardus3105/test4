import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../libraries/Enum/status-code";
import useDebounce from "../../../../../../libraries/Hooks/useDebounce";
import useEventListener from "../../../../../../libraries/Hooks/useEventListener";

import CompanyMemberListServices from "./company-member-list.services";
import CompanyMemberListStates from "./company-member-list.states";
import ReconnectingWebSocket from 'reconnecting-websocket';

var sockets: ReconnectingWebSocket[] = [];
var socket: ReconnectingWebSocket;

const options = {
  WebSocket: WebSocket, // custom WebSocket constructor
  connectionTimeout: 1000,
  maxRetries: 10,
};

function CompanyMemberListAdapter() {
  const history = useHistory();

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
      console.log("-----Message Received-----")
      console.log(message);
    },

    subChat: (userId: string) => {
      console.log("-----Sub chat-----")
      console.log(`ws://172.20.50.96:31000/ws?Channels=` + userId)
      socket = new ReconnectingWebSocket(
        `ws://172.20.50.96:31000/ws?Channels=` + userId,
        [],
        options
      );

      socket.onopen = () => {
        // connection opened
        console.log('test_Connected');
        console.log(`test_ws://172.20.50.96:31000/ws?Channels=` + userId);
      };

      socket.onmessage = (e) => {
        console.log("-----on message")
        pushStreamService.messageReceived(decodeURIComponent(JSON.parse(e.data).text));
      };

      socket.onerror = (e: any) => {
        // an error occurred
        console.log('test_socket_err: ', e);
        socket.close();
        clearInterval();
        setTimeout(function () {
          pushStreamService.subChat(userId);
        }, 1000);
      };

      socket.onclose = (e: any) => {
        console.log('test_Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
      };
      // sockets.push(ws);
    },
    closeSocket: () => {
      console.log('test_closeSocket');
      socket.close();
    },
    closeAllSocket: () => {
      console.log('test_closeAllSocket');
      sockets.map((s) => s.close());
    },
  };

  const createChatRoom = async (userId: any) => {
    // eslint-disable-next-line no-restricted-globals
    let pathList = location.pathname.split("/");
    const id = pathList[2];

    let chatRoomMemberList = [
      { userId: userId },
      { userId: id }
    ];

    let chatRoom = {
      avatar: "url",
      title: "Chat riêng",
      slogan: "Room này tạo ra để 2 người chat",
      type: 0,
      createdBy: userId,
      chatRoomMemberList: chatRoomMemberList
    }

    console.log(chatRoom);

    await CompanyMemberListServices().createChatRoom(chatRoom);
  }

  const {
    query, setQuery,
    searchCompanyMemberList, setSearchCompanyMemberList,
    hasSearch, setHasSearch,
  } = CompanyMemberListStates();

  const onChange = useDebounce(setQuery);

  const onClick = (event: any) => {
    if (hasSearch) {
      const id = event.target.id
      if (id !== "descriptionchatlist-input-index" && id !== "searchfield-container-index") {
        setHasSearch(false);
      }
    }
  }
  useEventListener('click', onClick);


  useEffect(() => {
    const getData = async () => {
      const data = {
        text: query,
        page: 1,
        pageSize: process.env.REACT_APP_NUM_ITEMS_PER_PAGE
      };

      const response = await CompanyMemberListServices().getInstance().getCompanyMemberListByQuery(data);
      if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
        setSearchCompanyMemberList(response.data.data);
        console.log(response.data.data);
      }

    };
    getData();
  }, [query, setSearchCompanyMemberList]);

  useEffect(() => {
    if (!hasSearch) {
      setQuery("");
    }
  }, [hasSearch, setQuery])


  const redirectToChatDetail = (id: string) => {
    let kind = "p";
    const userId: string = localStorage.getItem('userId') || "";
    // pushStreamService.subChat(userId);
    // createChatRoom(userId);
    history.push(`/${kind}/${id}`);

  };

  // const onChange = (e: ChangeEvent<HTMLInputElement>) =>{
  //     if(typingTimeoutRef.current){
  //         clearTimeout(typingTimeoutRef.current);
  //     }

  //     typingTimeoutRef.current = setTimeout(() =>{
  //         setQuery(e.target.value);
  //     },5e2);
  // }

  return {
    query, setQuery,
    searchCompanyMemberList,
    hasSearch, setHasSearch,
    onChange,
    redirectToChatDetail
  }
}

export default CompanyMemberListAdapter;