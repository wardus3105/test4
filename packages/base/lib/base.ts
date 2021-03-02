function ChatRoomAdapter(){
    function printHello(){
        console.log("wassp");
    }
    function printService(){
        console.log("1231");
    }
    return { printService, printHello};
}

export default ChatRoomAdapter;
