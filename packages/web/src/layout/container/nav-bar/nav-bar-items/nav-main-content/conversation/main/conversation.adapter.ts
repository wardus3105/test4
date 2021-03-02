import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IConversation } from "./conversation.props";
import useIdInPath from "../../../../../../../libraries/Hooks/useIdInPath";
import ConversationServices from "./conversation.services";
import ConversationStates from "./conversation.states";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../libraries/Enum/status-code";
import GroupDetailServices from "../../group/detail/group-detail.services";

function ConversationAdapter() {
    const history = useHistory();
    const roomIdInPage = useIdInPath()

    const {
        query , setQuery,
        hasSearch , setHasSearch,
        conversation , setConversation,
        page , setPage,
        count , setCount,
        isUpdating, setIsUpdating,
        isGroup, setIsGroup,
        listMessage, setListMessage,
        hasUploadImages, setHasUploadImages,
        respondedMess, setRespondedMess,
        editedMess, setEditedMess,
        roomId , setRoomId,
        isLoading, setIsLoading,
        memberInGroup , setMemberInGroup
    } = ConversationStates()

    useEffect(() => {
        !hasSearch && setQuery("");
    },[hasSearch , setQuery])

    useEffect(() => {
        if(roomId !== roomIdInPage){
            setRoomId(roomIdInPage)
            setListMessage([])
            setPage(1)
        }

    },[roomIdInPage , setRoomId , setListMessage , roomId , setPage])

    useEffect(() => {
        const conversation: IConversation = {
            id: roomId,
            title: "test",
            status: "1",
            avatar: "",
            type: "1",
            chats: []
        }
        setConversation(conversation);
    },[])

    useEffect(() => {
        const getData = async () => {
            setIsUpdating(true)
            
            // const response = await ConversationServices().getInstance().getConversationList(roomId , page);
            // if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
            //     let listMessage = response.data.data;
            //     for (let message of listMessage) {
            //         if (message["reaction"]) {
            //             message["reaction"] = JSON.parse(message["reaction"]);
            //             message["reaction"] = [...message["reaction"]]
            //         }
            //     }
            //     setListMessage(listMessage)
            //     setCount(response.data.totalPages)
            // }

            if(roomId === roomIdInPage){
                const response = await ConversationServices().getInstance().getConversationList(roomId , page);
                if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
                    setListMessage((prev: any) => [ ...prev , ...response.data.data ])
                    setCount(response.data.totalPages)
                }
            }

            setIsUpdating(false)
            setIsLoading(false)
        }

        getData();
    }, [ roomId , page , setCount , setIsUpdating , setIsGroup , setListMessage , setPage , setRoomId , roomIdInPage , setIsLoading ]);

    // get list group member
    useEffect(() => {
        const getData = async () => {
            
            const response = await GroupDetailServices().getInstance().getGroupDetail(roomId);
            if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                const result = response.data.data;
                setMemberInGroup(result);
            }

        }
        getData();
        
    }, [roomId]);

    const onSearch = () =>{
        setHasSearch(prev => !prev)
    }

    const redirectToDetail = (id: string) =>{
        history.push("/g/detail/" + id)
    }

    return {
        query , setQuery,
        hasSearch,
        conversation,
        onSearch,
        count,
        page , setPage,
        isUpdating,
        isGroup, 
        listMessage, setListMessage,
        hasUploadImages, setHasUploadImages,
        redirectToDetail,
        respondedMess, setRespondedMess,
        roomId,
        editedMess, setEditedMess,
        isLoading,
        memberInGroup
    }
}

export default ConversationAdapter;

