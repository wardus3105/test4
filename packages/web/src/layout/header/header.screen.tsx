import React from 'react';
import CircleAvatarScreen from '../../libraries/Features/circle-avtar/circle-avatar.screen';
import DetailPopupScreen from '../../libraries/Features/popup/detail-popup/detail-popup.screen';
import MainPopupScreen from '../../libraries/Features/popup/main-popup/main-popup.screen';
import './header.scss';
import { IconBellNotificationOn, IconGridLayout, IconLogoColorFull, IconQuestionCircle, IconSignoutRight, IconUserProfileSquare } from '../../libraries/Icons/icon.screen';

function HeaderScreen() {

  const listEles = [
    {
        onClick: null,
        icon: <IconBellNotificationOn></IconBellNotificationOn>,
        text: "Cài đặt thông báo"
    },
    {
        onClick: null,
        icon: <IconUserProfileSquare></IconUserProfileSquare>,
        text: "Hồ sơ của tôi"
    },
    {
        onClick: null,
        icon: <IconQuestionCircle></IconQuestionCircle>,
        text: "Trợ giúp"
    },
    {
        onClick: null,
        icon: <IconSignoutRight></IconSignoutRight>,
        text: "Đăng xuất"
    },
  ];

  const eleHeader = (
    <div className="detailpopup-header">
      <CircleAvatarScreen 
        isOnline={false}
        src={ "https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg" }
        width={'36px'}
        height={'36px'}
        class={""}
      ></CircleAvatarScreen>
      <div className="detailpopup-header-right">
        <p>
          Quang Huy
        </p>
        <span>
          iSoft
        </span>
      </div>
    </div>
  )

  const eleDetailPopup =(onClosePopup: any) =>(<DetailPopupScreen 
                                                listEles={ listEles } 
                                                eleHeader={ eleHeader }
                                                onClosePopup={ onClosePopup }
                                              ></DetailPopupScreen>);

  return (
    <div className="header-container">
      <IconGridLayout className="header-icon-9dots step1 cursor-pointer"></IconGridLayout>
      <IconLogoColorFull className="header-icon-main cursor-pointer"></IconLogoColorFull>

      <div className="header-icon-avatar">
        <MainPopupScreen context={ eleDetailPopup }>
          <div>
            <CircleAvatarScreen 
              isOnline={false}
              src={"https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"}
              width={'40px'}
              height={'40px'}
              class={""}
              hasCursor={ true }
            ></CircleAvatarScreen>
          </div>

        </MainPopupScreen>
      </div>

  </div>

  );
}

export default HeaderScreen;

