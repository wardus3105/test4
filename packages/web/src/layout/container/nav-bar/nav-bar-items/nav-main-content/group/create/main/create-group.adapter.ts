import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../../libraries/Enum/status-code";
import ToastifyAdapter from "../../../../../../../../libraries/Features/toastify/toastify.adapter";
import CreateGroupService from "./create-group.services";
import CreateGroupStates from "./create-group.states";

function CreateGroupAdapter(){
    const history = useHistory();

    const {
        title , setTitle,
        avatar , setAvatar,
        avatarTemp , setAvatarTemp,
        createBy , setCreateBy,
        memberIdList , setMemberIdList,
        slogan , setSlogan,
        textSearch, setTextSearch,
    } = CreateGroupStates()

    useEffect(() => {
        const userId = localStorage.getItem('userId') || "";
        setCreateBy(userId);
    },[setCreateBy])

    const { warning } = ToastifyAdapter()

    
    const createChatRoom = async () =>{
        // if(!avatar){
        //     return warning("Bạn chưa tải ảnh lên")
        // }
        // if(!slogan){
        //     return warning("Bạn chưa nhập slogan của nhóm")
        // }
        if(!createBy){
            return warning("Bạn chưa nhập userid")
        }
        if(!title){
            return warning("Bạn chưa nhập tên nhóm")
        }
        if(!memberIdList){
            return warning("Bạn chưa chọn thành viên")
        }

        const formData = new FormData();
        formData.append('fileContent', avatar);
        const response = await CreateGroupService().getInstance().sendFile(formData);
        if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
            const avatarId = response.data.data[0].guid;
            if(createBy && title && memberIdList){
                const memberidList = [...memberIdList];
                const chatRoomMemberList = memberidList.map((memberid: string) => {
                    const obj = {
                        userId:memberid
                    }
                    return obj;
                })
                
                const formData = new FormData();

                formData.append("avatar" , avatarId);
                formData.append("createdBy" , createBy);
                formData.append("title" , title);
                formData.append("chatRoomMemberList" , JSON.stringify(chatRoomMemberList));
                formData.append("slogan" , slogan);
                formData.append("type" , "1");

            const response = await CreateGroupService().getInstance().createGroup(formData);
            if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
                setTitle("");
                setMemberIdList([])
                setAvatar(null)
                setAvatarTemp([])
                var chatRoom = response.data.data;
                if (chatRoom) {
                    history.push("/g/" + chatRoom.id);
                }

            }
            }
        }
    }

    const changeSearch = async (event: any) => {
        setTextSearch(event.target.value)
    }


    return {
        createChatRoom,
        title , setTitle,
        setAvatar,
        avatarTemp , setAvatarTemp,
        memberIdList , setMemberIdList,
        slogan , setSlogan,
        textSearch, setTextSearch,
        changeSearch
    }
}

export default CreateGroupAdapter;