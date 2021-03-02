import React from 'react';
import { ENUM_KIND_OF_ICONPANEL } from '../../../../libraries/Enum/icon-panel';
import { IconBellNotificationOnWhite, IconChatMessage2LineWhite, IconQuestionCircleWhite, IconUsersGroup1 } from '../../../../libraries/Icons/icon.screen';
import IconPanelScreen from './icon-panel/icon-panel.screen';
import './navbar.scss';

function NavbarScreen(props: any) {

  const { activedIcon , setActivedIcon } = props;

  return (
    <div className="navbar-container step2">
      <IconPanelScreen 
        isActive={ activedIcon === ENUM_KIND_OF_ICONPANEL.MESSAGES } 
        eleIcon={ <IconChatMessage2LineWhite></IconChatMessage2LineWhite> } 
        contextToolTip={"Trò chuyện"} 
        onClick={ () =>{setActivedIcon(ENUM_KIND_OF_ICONPANEL.MESSAGES)} } 
        hasNotification={ true }
      ></IconPanelScreen>
      <IconPanelScreen 
        isActive={ activedIcon === ENUM_KIND_OF_ICONPANEL.COMPANYMEMBER } 
        eleIcon={ <IconUsersGroup1></IconUsersGroup1> } 
        contextToolTip={"Thành viên"} 
        onClick={ () =>{setActivedIcon(ENUM_KIND_OF_ICONPANEL.COMPANYMEMBER)} }
        hasNotification={ false }
      ></IconPanelScreen>
      <IconPanelScreen 
        isActive={ activedIcon === ENUM_KIND_OF_ICONPANEL.NOTI } 
        eleIcon={ <IconBellNotificationOnWhite></IconBellNotificationOnWhite> } 
        contextToolTip={"Thông báo"} 
        onClick={ () =>{setActivedIcon(ENUM_KIND_OF_ICONPANEL.NOTI)} }
        hasNotification={ false }
      ></IconPanelScreen> 
      <div className="navbar-iconpanel-last">
        <IconPanelScreen 
          isActive={ activedIcon === ENUM_KIND_OF_ICONPANEL.QUESTIONS } 
          eleIcon={ <IconQuestionCircleWhite></IconQuestionCircleWhite> } 
          contextToolTip={"Giải đáp"} 
          onClick={ () =>{setActivedIcon(ENUM_KIND_OF_ICONPANEL.QUESTIONS)} }
          hasNotification={ false }
        ></IconPanelScreen>
      </div>
    </div>
  );
}

export default NavbarScreen;
