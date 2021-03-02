import { useState } from "react";
import { ENUM_KIND_OF_CONVERSATIONDETAIL } from "../../../../../../../libraries/Enum/conversation-detail";
import { IMiniImage } from "../../../../../../../libraries/Features/image-overlay-full-screen/image-overlay-full-screen.props";
import { IChatRoom } from "../../../../../../../type/chatrooms";



function GroupDetailStates() {
    const [groupDetail , setGroupDetail] = useState<IChatRoom>({
        id:"",
        avatar:"",
        title:""
    });
    const [fileInGroup , setFileInGroup] = useState<any[]>([]);
    const [linkInGroup , setLinkInGroup] = useState<any[]>([]);
    const [imageInGroup , setImageInGroup] = useState<any[]>([]);
    const [memberInGroup , setMemberInGroup] = useState<any[]>([]);
    const [activeLi , setActiveLi] = useState<number>(ENUM_KIND_OF_CONVERSATIONDETAIL.MEMBER);
    const [isOpenOverlay , setIsOpenOverlay] = useState<boolean>(false);
    const [hasNoti , setHasNoti] = useState<boolean>(true);
    const [miniImageList , setMiniImageList] = useState<any[]>([]);
    const [isShowPopupConfirm , setIsShowPopupConfirm] = useState<boolean>(false);
    const [mainImage , setMainImage] = useState<IMiniImage>({
      index:-1,
      author:"",
      srcImage:"",
      id:""
    })



    return {
        activeLi , setActiveLi,
        isOpenOverlay , setIsOpenOverlay,
        hasNoti , setHasNoti,
        mainImage , setMainImage,
        memberInGroup , setMemberInGroup,
        linkInGroup , setLinkInGroup,
        groupDetail , setGroupDetail,
        imageInGroup , setImageInGroup,
        fileInGroup , setFileInGroup,
        isShowPopupConfirm,setIsShowPopupConfirm,
        miniImageList , setMiniImageList
    }
}

export default GroupDetailStates;