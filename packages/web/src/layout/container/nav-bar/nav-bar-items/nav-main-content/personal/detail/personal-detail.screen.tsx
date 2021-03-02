import React, { useEffect, useState } from 'react';
import { ENUM_KIND_OF_CONVERSATIONDETAIL } from '../../../../../../../libraries/Enum/conversation-detail';
import IconCirclePanel from '../../../../../../../libraries/Features/icon-circle-panel/icon-circle-panel.screen';
import { IMiniImage } from '../../../../../../../libraries/Features/image-overlay-full-screen/image-overlay-full-screen.props';
import ImageOverlayScreen from '../../../../../../../libraries/Features/image-overlay-full-screen/image-overlay-full-screen.screen';
import useKeyDown from '../../../../../../../libraries/Hooks/useKeyDown';

import { IBodyConversationDetail } from '../../conversation-detail/body/body-conversation-detail.props';
import { IHeaderConversationDetail } from '../../conversation-detail/header/header-conversation-detail.props';
import ConversationDetailScreen from '../../conversation-detail/main/conversation-detail.screen';
import FileContextChatScreen from '../../conversation/chat-list/context-chat/file-context-chat/file-context-chat.screen';
import './personal-detail.scss';

const iconVideoCircleLine = require("../../../../../../../libraries/Icons/video-circle-line.svg").default;
const iconBellNotificationOn = require("../../../../../../../libraries/Icons/bell-notification-on.svg").default;
const iconBellNotificationOff = require("../../../../../../../libraries/Icons/bell-notification-off.svg").default;
const iconChatMessage2LineWhite = require("../../../../../../../libraries/Icons/chat-message-2-line-white.svg").default;

const miniImageList :IMiniImage[] =[
  {
      index:1,
      author:"Trung Đức",
      srcImage:"https://i.pinimg.com/736x/26/da/78/26da780891a603e8f9793810350ac13a.jpg",
  },
  {
      index:2,
      author:"Chi Chi",
      srcImage:"https://external-preview.redd.it/LRmT8yJPpoqGulM3_Js5IskqmxqPwgb196NFUtX08oY.jpg?auto=webp&s=8cafc04e8600b49eee044ec92d833b986e2c33d9",
  },
  {
      index:3,
      author:"Chi Chi",
      srcImage:"https://external-preview.redd.it/LRmT8yJPpoqGulM3_Js5IskqmxqPwgb196NFUtX08oY.jpg?auto=webp&s=8cafc04e8600b49eee044ec92d833b986e2c33d9",
  },
  {
      index:4,
      author:"Chi Chi1",
      srcImage:"https://external-preview.redd.it/LRmT8yJPpoqGulM3_Js5IskqmxqPwgb196NFUtX08oY.jpg?auto=webp&s=8cafc04e8600b49eee044ec92d833b986e2c33d9",
  },
  {
      index:5,
      author:"Chi Chi1",
      srcImage:"https://external-preview.redd.it/LRmT8yJPpoqGulM3_Js5IskqmxqPwgb196NFUtX08oY.jpg?auto=webp&s=8cafc04e8600b49eee044ec92d833b986e2c33d9",
  },
  {
      index:6,
      author:"Chi Chi3",
      srcImage:"https://external-preview.redd.it/LRmT8yJPpoqGulM3_Js5IskqmxqPwgb196NFUtX08oY.jpg?auto=webp&s=8cafc04e8600b49eee044ec92d833b986e2c33d9",
  },
  {
      index:7,
      author:"Chi Chi3",
      srcImage:"https://external-preview.redd.it/LRmT8yJPpoqGulM3_Js5IskqmxqPwgb196NFUtX08oY.jpg?auto=webp&s=8cafc04e8600b49eee044ec92d833b986e2c33d9",
  },
  {
      index:8,
      author:"Chi Chi3",
      srcImage:"https://wallpaperaccess.com/full/629735.jpg",
  },
  {
      index:9,
      author:"Chi Chi4",
      srcImage:"https://wallpaperaccess.com/full/629735.jpg",
  },
  {
      index:10,
      author:"Chi Chi5",
      srcImage:"https://wallpaperaccess.com/full/629735.jpg",
  },
  {
      index:11,
      author:"Chi Chi5",
      srcImage:"https://wallpaperaccess.com/full/629735.jpg",
  },
  {
      index:12,
      author:"Chi Chi55",
      srcImage:"https://wallpaperaccess.com/full/629735.jpg",
  },
  {
      index:13,
      author:"Chi Chi556",
      srcImage:"https://wallpaperaccess.com/full/629735.jpg",
  },
  {
      index:14,
      author:"Chi Chi556",
      srcImage:"https://wallpaperaccess.com/full/629735.jpg",
  },
]

function PersonalDetailScreen() {
    const [activeLi , setActiveLi] = useState<number>(ENUM_KIND_OF_CONVERSATIONDETAIL.IMAGE);
    const [isOpenOverlay , setIsOpenOverlay] = useState<boolean>(false);
    const [iconnoti , setIconnoti] = useState(iconBellNotificationOn);
    const [mainImage , setMainImage] = useState<IMiniImage>({
      index:-1,
      author:"",
      srcImage:"",
    })
    
    const toggleOverlay = (miniImage: IMiniImage) =>{
      setIsOpenOverlay(prev => !prev);
      setMainImage(miniImage);
    }

    const toggleNoti = ()=>{
      if(iconnoti === iconBellNotificationOn){
        setIconnoti(iconBellNotificationOff)
      } else{
        setIconnoti(iconBellNotificationOn)
      }
    }

    const onChangeActiveLi = (num: number) =>{
        setActiveLi(num);
    }

    const showMainBody = () =>{
        switch (activeLi) {
          case ENUM_KIND_OF_CONVERSATIONDETAIL.IMAGE:
            return (
              <div className="bodyconversationdetail-main-body-tab bodyconversationdetail-main-body-image">
              {
                miniImageList.map((miniImage: IMiniImage , index: number) => (
                  <img alt="" onClick={ () =>{ toggleOverlay(miniImage) } } src={ miniImage.srcImage } key={ index }></img>
                ))
              }
              </div>
            )
          case ENUM_KIND_OF_CONVERSATIONDETAIL.FILE:
            return (
              <div className="bodyconversationdetail-main-body-tab bodyconversationdetail-main-body-fileandlink">
                <FileContextChatScreen isFile={ true } isCurrent={ true } context="https://morioh.com/p/b82afe6648dd" datetime=""></FileContextChatScreen>
                <FileContextChatScreen isFile={ true } isCurrent={ true } context="https://morioh.com/p/b82afe6648dd" datetime=""></FileContextChatScreen>
                <FileContextChatScreen isFile={ true } isCurrent={ true } context="https://morioh.com/p/b82afe6648dd" datetime=""></FileContextChatScreen>
       
              </div>
            )
          case ENUM_KIND_OF_CONVERSATIONDETAIL.LINK:
            return (
              <div className="bodyconversationdetail-main-body-tab bodyconversationdetail-main-body-fileandlink">
                <FileContextChatScreen isFile={ false } isCurrent={ true } context="https://morioh.com/p/b82afe6648dd" datetime=""></FileContextChatScreen>
              </div>
            )
        
          default:
            break;
        }
    }

    const eleUl = (
        <ul className="bodyconversationdetail-main-header-li--small">
          <li 
          className={ activeLi === ENUM_KIND_OF_CONVERSATIONDETAIL.IMAGE ? "bodyconversationdetail-main-header-li--active" : "" } 
          onClick={ () => { onChangeActiveLi(ENUM_KIND_OF_CONVERSATIONDETAIL.IMAGE) } }
          >
          Hình ảnh
          </li>

          <li 
          className={ activeLi === ENUM_KIND_OF_CONVERSATIONDETAIL.FILE ? "bodyconversationdetail-main-header-li--active" : "" } 
          onClick={ () => { onChangeActiveLi(ENUM_KIND_OF_CONVERSATIONDETAIL.FILE) } }
          >
          Tài liệu
          </li>
          <li 
          className={ activeLi === ENUM_KIND_OF_CONVERSATIONDETAIL.LINK ? "bodyconversationdetail-main-header-li--active" : "" } 
          onClick={ () => { onChangeActiveLi(ENUM_KIND_OF_CONVERSATIONDETAIL.LINK) } }
          >
          Link
          </li>
      </ul>
    )

    const body:IBodyConversationDetail = {
        showMainBody: showMainBody,
        eleUl: eleUl
    }

    const eleOption: React.ReactElement = (
        <>
            <div>
              <IconCirclePanel srcIcon={ iconChatMessage2LineWhite } class="" padding="0.8rem"></IconCirclePanel>
              <p>Tin nhắn</p>
            </div>
            <div>
              <IconCirclePanel srcIcon={ iconVideoCircleLine } class="" padding="0.8rem"></IconCirclePanel>
              <p>Gọi video</p>
            </div>
            <div>
              <IconCirclePanel srcIcon={ iconnoti } class="" padding="0.8rem" onClick={ toggleNoti }></IconCirclePanel>
              <p>
                { iconnoti === iconBellNotificationOn ? "Thông báo" : "Tắt thông báo" }
              </p>
            </div>
        </>
    );


    const header:IHeaderConversationDetail = {
        name: "Trung Đức",
        title: "iSoft",
        srcImage: "https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg",
        eleOption: eleOption,
    }

    return (
      <>
        <ConversationDetailScreen header={ header } body={ body }></ConversationDetailScreen>
        {
          isOpenOverlay && ( <ImageOverlayScreen close={ toggleOverlay } miniImageList ={ miniImageList } mainMiniImage={ mainImage }></ImageOverlayScreen> )
        }
      </>
    );
}

export default PersonalDetailScreen;
