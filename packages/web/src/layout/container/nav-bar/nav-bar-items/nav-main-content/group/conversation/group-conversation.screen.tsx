import React from 'react';
import DetailPopupScreen from '../../../../../../../libraries/Features/popup/detail-popup/detail-popup.screen';
import MainPopupScreen from '../../../../../../../libraries/Features/popup/main-popup/main-popup.screen';
import TooltipScreen from '../../../../../../../libraries/Features/tooltip/tooltip.screen';
import { IconInformationInforLine, IconSearchLoupe, IconSignoutRight, IconTrashDeleteBin, IconVolumeOff } from '../../../../../../../libraries/Icons/icon.screen';

function GroupConversationScreen() {

    const listEles = [
        {
            onClick: null,
            icon: <IconSearchLoupe></IconSearchLoupe>,
            text: "Tìm kiếm"
        },
        {
            onClick: null,
            icon: <IconVolumeOff></IconVolumeOff>,
            text: "Tắt thông báo"
        },
        {
            onClick: null,
            icon: <IconInformationInforLine></IconInformationInforLine>,
            text: "Giới thiệu"
        },
        {
            onClick: null,
            icon: <IconSignoutRight></IconSignoutRight>,
            text: "Thoát khỏi nhóm"
        },
        {
            onClick: null,
            icon: <IconTrashDeleteBin></IconTrashDeleteBin>,
            text: "Xóa nhóm"
        }
    ];
    const eleDetailPopup =(onClosePopup: any) =>(<DetailPopupScreen 
                                                    listEles={ listEles } 
                                                    onClosePopup={ onClosePopup }
                                                ></DetailPopupScreen>);

    const eleOptionHeader = (onSearch: any) => (
        <>
            <TooltipScreen context="Tìm kiếm">
                <div>
                    <IconSearchLoupe onClick={ onSearch } className="cursor-pointer"></IconSearchLoupe>
                </div>
            </TooltipScreen>
            <MainPopupScreen context={ eleDetailPopup }>
                <div>
                    <TooltipScreen context="Chức năng khác">
                        <div className="img-24 flex-center cursor-pointer icon-svg--hover">
                            <div className="vertical3dots"></div>
                        </div>
                    </TooltipScreen>
                </div>
            </MainPopupScreen>

            <IconSearchLoupe></IconSearchLoupe>
        </>
    );

    return eleOptionHeader
}

export default GroupConversationScreen;






