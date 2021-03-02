import { ENUM_KIND_OF_CONVERSATIONDETAIL } from './../../../../../../../libraries/Enum/conversation-detail';
import { useEffect } from "react";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../libraries/Enum/status-code";
import { IMiniImage } from "../../../../../../../libraries/Features/image-overlay-full-screen/image-overlay-full-screen.props";
import useIdInPath from "../../../../../../../libraries/Hooks/useIdInPath";
import useKeyDown from "../../../../../../../libraries/Hooks/useKeyDown";
import GroupDetailServices from "./group-detail.services";
import GroupDetailStates from "./group-detail.states";
import { ENUM_KIND_OF_STATUS } from '../../../../../../../libraries/Enum/status';
import {  ENUM_KIND_OF_MESSAGE } from '../../../../../../../libraries/Enum/message';
import PopupConfirmStates from '../../../../../../../features/popup-confirm/popup-confirm.state';

function GroupDetailAdapter() {
    const {
        activeLi, setActiveLi,
        isOpenOverlay, setIsOpenOverlay,
        hasNoti , setHasNoti,
        mainImage, setMainImage,
        imageInGroup, setImageInGroup,
        memberInGroup, setMemberInGroup,
        linkInGroup, setLinkInGroup,
        fileInGroup, setFileInGroup,
        groupDetail, setGroupDetail,
        isShowPopupConfirm,setIsShowPopupConfirm,
        miniImageList , setMiniImageList
    } = GroupDetailStates();


    const {
        popupConfirmIsDisplayed,setPopupConfirmIsDisplayed
    } = PopupConfirmStates()


    const roomId = useIdInPath(3)

    useEffect(() => {
        const getData = async () => {
            
            const response = await GroupDetailServices().getInstance().getGroupDetail(roomId);
            if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                const result = response.data.data;
                setMemberInGroup(result);
            }

            const response1 = await GroupDetailServices().getInstance().getInforGroupDetail(roomId);
            if (response1 && response1.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                const result1 = response1.data.data;
                setGroupDetail(result1[0]);
            }
        }
        getData();
    }, [setMemberInGroup, setGroupDetail, roomId])


    // useEffect(() =>{
    //     window.addEventListener('keydown', closeImageOverlayByEscKey );

    //     return() =>{
    //         window.removeEventListener('keydown', closeImageOverlayByEscKey );
    //     }
    // })

    const onChangeActiveLi = async (num: number) => {
        setActiveLi(num);
        switch (num) {
            case ENUM_KIND_OF_CONVERSATIONDETAIL.LINK:
                const response2 = await GroupDetailServices().getInstance().getLinkGroupDetail(roomId);
                if (response2 && response2.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                    const result2 = response2.data.data;
                    setLinkInGroup(result2);
                }
                break;
            case ENUM_KIND_OF_CONVERSATIONDETAIL.IMAGE:
                const response3 = await GroupDetailServices().getInstance().getAttachmentImageGroupDetail(roomId);
                if (response3 && response3.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                    const result3 = response3.data.data;
                    setImageInGroup(result3);
                    setMiniImageList(result3);
                }
                break;
            case ENUM_KIND_OF_CONVERSATIONDETAIL.FILE:
                const response4 = await GroupDetailServices().getInstance().getAttachmentFileGroupDetail(roomId);
                if (response4 && response4.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                    const result4 = response4.data.data;
                    setFileInGroup(result4);
                }
                break;
        }
    }

    const toggleOverlay = (miniImage: IMiniImage) => {
        setIsOpenOverlay(prev => !prev);
        setMainImage(miniImage);
    }


    const deleteUserInChatRoomMemberAdapter= async (userId:any)=>{
        const data={
            userId:userId,
            chatRoomId:roomId
        }
        const response= await GroupDetailServices().getInstance().deleteUserInChatRoomMember(data);
        if(response.data.status===ENUM_KIND_OF_STATUS_CODE.SUCCESS){
            const response= await GroupDetailServices().getInstance().getUserById(userId);
            setMemberInGroup(prev => prev.filter(member => member.user_id !== userId))
            let messageSend: any = {
                message: response.data.data.lastName + " " + response.data.data.firstName + " đã bị xóa khỏi nhóm",
                messageType: ENUM_KIND_OF_MESSAGE.TEXT,
                messageStatus: ENUM_KIND_OF_STATUS.ACTIVE,
                userId: userId,
                user: {
                    userName: "",
                    status: ENUM_KIND_OF_STATUS.ACTIVE,
                    id: userId
                },
                chatRoomId: roomId,
                createdAt: new Date(),
                attachments: []
            }
            await GroupDetailServices().getInstance().sendMessage(messageSend);
        }
    }


    const updatePermissionAdminRoomAdapter = async (id:any,userId:any,isAdmin:any)=>{
        const data={
            userId:userId,
            chatRoomId:roomId,
            isAdmin:isAdmin
        }
        const response= await GroupDetailServices().getInstance().updatePermissionRoomChat(data);
        if(response.data.status===ENUM_KIND_OF_STATUS_CODE.SUCCESS){
            const response= await GroupDetailServices().getInstance().getUserById(userId);
            // setMemberInGroup(prev => prev.filter(member => member.user_id !== userId))
            const item=memberInGroup.filter(s=>s.id===id)[0];
            item.is_admin=parseInt(isAdmin);
            setMemberInGroup(prev => prev.filter(member => (member.id === id ? item : member)))

            var message ="";
            if(isAdmin==="1"){
                message=response.data.data.lastName + " " + response.data.data.firstName + " được chỉ định làm admin";
            }
            else{
                message=response.data.data.lastName + " " + response.data.data.firstName + " bị hủy bỏ vai trò admin";
            }

            let messageSend: any = {
                message: message,
                messageType: ENUM_KIND_OF_MESSAGE.TEXT,
                messageStatus: ENUM_KIND_OF_STATUS.ACTIVE,
                userId: userId,
                user: {
                    userName: "",
                    status: ENUM_KIND_OF_STATUS.ACTIVE,
                    id: userId
                },
                chatRoomId: roomId,
                createdAt: new Date(),
                attachments: []
            }
            await GroupDetailServices().getInstance().sendMessage(messageSend);
        }
    }

    return {
        activeLi,
        toggleOverlay,
        hasNoti , setHasNoti,
        isOpenOverlay,
        mainImage,
        onChangeActiveLi,
        memberInGroup,
        imageInGroup,
        linkInGroup,
        groupDetail,
        fileInGroup,
        isShowPopupConfirm,setIsShowPopupConfirm,
        miniImageList,
        deleteUserInChatRoomMemberAdapter,
        updatePermissionAdminRoomAdapter
    }
}

export default GroupDetailAdapter;


