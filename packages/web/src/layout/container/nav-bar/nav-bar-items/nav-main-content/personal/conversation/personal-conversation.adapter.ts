import ReconnectingWebSocket from 'reconnecting-websocket';

var sockets: ReconnectingWebSocket[] = [];
var socket: ReconnectingWebSocket;

const options = {
    WebSocket: WebSocket, // custom WebSocket constructor
    connectionTimeout: 1000,
    maxRetries: 10,
  };

function PersonalConversationAdapter() {
}

export default PersonalConversationAdapter;
