/* 
    Created by longdq
*/

import { Dispatch } from 'redux';
import IncomingCallContainer from '../../features/incoming-call/view/incoming-call.screen';
import NavigationService from 'routers/navigation-service';
import { VideoCallScreen } from 'routers/screen-name';
import { KindOfMsg } from '../common/types/message';
import { StatusVideoCallParams } from '../../features/video-call/model-video-call/video-call.props';
import { processRequestRespository } from 'core/common/networking/api-helper';
import IncomingCallServices from './incoming-call.services';
import { HyperUtils } from 'core/common/hyper-utils';
import { showAlert, TYPE } from '../../libraries/dropdown-alert/index';

export class IncomingCallAdapter {
  IncomingCallContainer: IncomingCallContainer;
  constructor(container: IncomingCallContainer) {
    this.IncomingCallContainer = container;
  }
  goBack = () => {
    NavigationService.goBack();
  };

  onCancelCall = () => {
    const params: StatusVideoCallParams = {
      chatId:
        this.IncomingCallContainer.chatInfo?.chatId || this.IncomingCallContainer.chatInfo?._id,
      type: KindOfMsg.TYPE_VIDEO_CALL_DENY,
      senderId: this.IncomingCallContainer.props.userInfo?.id,
      receiverId: this.IncomingCallContainer.chatInfo?.user?.id,
      timeStart: this.IncomingCallContainer.timeStart,
    };

    processRequestRespository(
      IncomingCallServices.getInstance().updateStatusVideoCall(params),
      () => {
        NavigationService.pop();
      },
      undefined,
      false,
      false
    );
  };

  //VideoCall
  updateStatusVideoCall = () => {
    const params: StatusVideoCallParams = {
      chatId:
        this.IncomingCallContainer.chatInfo?.chatId || this.IncomingCallContainer.chatInfo?._id,
      type: KindOfMsg.TYPE_VIDEO_CALL_ACCEPT,
      link: 'https://meet.hyperlogy.com/' + HyperUtils.genRandomID(16),
      senderId: this.IncomingCallContainer.props.userInfo?.id,
      receiverId: this.IncomingCallContainer.chatInfo?.user?.id,
      timeStart: this.IncomingCallContainer.timeStart,
    };

    processRequestRespository(
      IncomingCallServices.getInstance().updateStatusVideoCall(params),
      () => this.updateStatusVideoCallSuccess(params?.link),
      undefined,
      false,
      false
    );
  };

  updateStatusVideoCallSuccess = (link: string) => {
    console.log('test_updateStatusVideoCallSuccess');
    NavigationService.navigate(VideoCallScreen, {
      chatInfo: this.IncomingCallContainer.chatInfo,
      link,
    });
  };

  onFinishCall = () => {
    showAlert(TYPE.WARN, 'Finish call:', this.IncomingCallContainer.props.userInfo?.id);
    console.log('test_onFinishCall: ', this.IncomingCallContainer.props);
    const chatId =
      this.IncomingCallContainer.chatInfo?.chatId ||
      this.IncomingCallContainer.chatInfo?._id ||
      this.IncomingCallContainer.chatInfo?.data?.id;
    const params: StatusVideoCallParams = {
      chatId: chatId,
      type: KindOfMsg.TYPE_VIDEO_CALL_FINISH,
      senderId: this.IncomingCallContainer.props.userInfo?.id,
      receiverId:
        this.IncomingCallContainer.chatInfo?.user?.id ||
        this.IncomingCallContainer.chatInfo?.data?.contact?.id,
      timeStart: this.IncomingCallContainer.timeStart,
    };

    processRequestRespository(
      IncomingCallServices.getInstance().updateStatusVideoCall(params),
      () => {
        NavigationService.pop();
      },
      undefined,
      false,
      false
    );
  };
}
