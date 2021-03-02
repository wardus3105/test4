/* 
    Created by longdq
*/

import { processRequestRespository, deletes } from 'core/common/networking/api-helper';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import NavigationService from 'routers/navigation-service';
import { IncomingCallScreen } from 'routers/screen-name';
import { IHyperMessage, KindOfMsg } from 'core/common/types/message';
import { translate } from '../../res/languages';
import ChatDetailContainer from '../../features/chat-detail/view/chat-detail.screen';
import ChatDetailServices from './chat-detail.services';
import { User } from '../common/types/user';
import { RemoveMessageParams } from './chat-detail.props';
import { Clipboard } from 'react-native';

export class ChatDetailAdapter {
  ChatDetailContainer: ChatDetailContainer;
  tmpMessage: IHyperMessage = null;
  constructor(container: ChatDetailContainer) {
    this.ChatDetailContainer = container;
  }

  goBack = () => {
    NavigationService.goBack();
  };

  //say Hi!
  sayHi = () => {
    const newMess = {
      _id: null,
      text: 'Hi!',
      createdAt: null,
      user: null,
      image: null,
      video: null,
      audio: null,
      system: null,
      sent: null,
      received: null,
      pending: null,
      quickReplies: null,
      type: null,
      path: null,
      reply: null,
      fileExtension: null,
      attachment: null,
      deleted: null,
    };
    this.checkSendMessage([newMess], null);
  };

  // Messages
  onDeleteMessage(msg: IHyperMessage) {
    console.log('test_delete_msg: ', msg);
    const params: RemoveMessageParams = {
      msgId: msg?._id,
      senderId: msg.user?._id,
      chatId: this.ChatDetailContainer.roomId,
    };
    processRequestRespository(ChatDetailServices.getInstance().removeMessage(params), (rs) =>
      this.onDeleteMessageSuccess(rs, msg)
    );
  }

  onDeleteMessageSuccess = (rs: any, msg: IHyperMessage) => {
    console.log('test_onDeleteMessageSuccess: ', rs, '__', msg);
    this.ChatDetailContainer.setState((previousState) => ({
      dataListMessage: previousState.dataListMessage.filter((message) => message._id !== msg._id),
    }));
  };

  showMessageActions = (context: any, message: IHyperMessage) => {
    console.log('test_showActionMessage:', message);
    const myId = this.ChatDetailContainer.props.userInfo?.user?.id;
    const msgId = message?.user.id || message?.user._id;
    const isMe = myId === msgId;
    this.ChatDetailContainer.refChatActionsComponent?.current?.openModal(isMe);
    this.tmpMessage = message;
  };

  goToVideoCall = () => {
    NavigationService.navigate(IncomingCallScreen, {
      type: KindOfMsg.TYPE_VIDEO_CALL_OUTGOING,
      user: this.ChatDetailContainer.chatInfo?.data?.contact,
      chatInfo: this.ChatDetailContainer.chatInfo,
    });

    const msg: IHyperMessage[] = [{ text: KindOfMsg.TYPE_VIDEO_CALL_INCOMING }];
    this.checkSendMessage(msg, KindOfMsg.TYPE_VIDEO_CALL_INCOMING);
  };

  requestToUser = (id: string) => {
    processRequestRespository(
      ChatDetailServices.getInstance().requestToUser(id),
      this.requestToUserSuccess
    );
  };

  requestToUserSuccess = (res: any) => {
    if (res && res.chatId) {
      this.getListMessage(res.chatId);
      this.ChatDetailContainer.roomId = res.chatId;
    } else {
      this.ChatDetailContainer.isCreateRoom = true;
    }
  };

  createRoom = (id: string, typeMsg: KindOfMsg) => {
    processRequestRespository(ChatDetailServices.getInstance().createRomChat(id), (res) =>
      this.createRoomSuccess(res, typeMsg)
    );
  };

  createRoomSuccess = (res: any, typeMsg: KindOfMsg) => {
    if (res && res.chatId) {
      // this.getListMessage(res.chatId);
      this.ChatDetailContainer.roomId = res.chatId;
      this.ChatDetailContainer.isCreateRoom = false;
      this.sendMessage(this.ChatDetailContainer.firstMessage, res.chatId, typeMsg);
    }
  };

  appendMessage = (msg: IHyperMessage) => {
    console.log(
      'test_incoming_call_append_msg: ',
      msg,
      '__',
      this.ChatDetailContainer.props.userInfo.user.id
    );
    switch (msg.type) {
      case KindOfMsg.TYPE_VIDEO_CALL_INCOMING:
        break;
      default:
        this.ChatDetailContainer.setState((previousState) => ({
          // @ts-ignore
          dataListMessage: GiftedChat.append(previousState.dataListMessage, msg),
        }));
        break;
    }
  };

  getListMessage = (chatId: string) => {
    processRequestRespository(
      ChatDetailServices.getInstance().getListMessage(chatId),
      this.getListMessageSuccess
    );
  };

  getListMessageSuccess = (res: any[]) => {
    const { userInfo } = this.ChatDetailContainer.props;
    var arrMess: IHyperMessage[] = [];
    if (res.length > 0) {
      res.forEach((element) => {
        let mes: IHyperMessage = {};
        let user: User = {};
        user._id = element?.user?.id;
        user.username = element?.user?.username;
        user.avatar = 'https://placeimg.com/960/540/any';
        mes._id = element?.id;
        mes.createdAt = element?.createdAt;
        mes.type = element?.type;
        mes.path = element?.path;
        mes.fileExtension = element?.fileExtension;
        mes.reply = element?.replyMess;
        mes.user = user;
        mes.attachment = element?.attachment;

        switch (mes.type) {
          case KindOfMsg.TYPE_IMAGE:
            mes.image = `http://172.16.40.43:9000/preview/+${element?.path}`;
            mes.text = '';
            break;
          case KindOfMsg.TYPE_VIDEO_CALL_INCOMING:
            console.log(
              'test_incoming_call: ',
              element,
              '__',
              this.ChatDetailContainer.props.userInfo?.user?.id
            );
            mes.text =
              element.user.id === this.ChatDetailContainer.props.userInfo?.user?.id
                ? translate('videoCall.titleOutGoingCall')
                : translate('videoCall.titleIncomingCall');
            break;
          default:
            mes.text = element?.message;
            break;
        }

        //Check header, footer
        // let sameUserInPrevMessage = false;
        // let sameDate = false;
        // if (previousMessage) {
        //   const d1 = currentMessage?.createdAt?.split('T')[0];
        //   const d2 = previousMessage?.createdAt?.split('T')[0];
        //   sameDate = d1 === d2;
        //   previousMessage?.user?._id === currentMessage?.user?._id
        //     ? (sameUserInPrevMessage = true)
        //     : (sameUserInPrevMessage = false);
        // }

        console.log('test_mes_text: ', mes.text);
        arrMess.push(mes);
      });
    }
    if (arrMess && arrMess.length < 1) {
      this.ChatDetailContainer.setState({
        showHi: true,
      });
    }
    this.ChatDetailContainer.setState({
      dataListMessage: arrMess,
    });
  };

  checkSendMessage = (
    newMessages: IHyperMessage[] = [],
    typeMsg: KindOfMsg = KindOfMsg.TYPE_TEXT
  ) => {
    let chatId = '';
    const chatInfo = this.ChatDetailContainer.chatInfo;
    if (chatInfo && chatInfo.type === 'FORM_MESSAGE') {
      chatId = chatInfo.data && chatInfo.data.id;
      this.sendMessage(newMessages, chatId, typeMsg);
    }
    if (chatInfo && chatInfo.type === 'FROM_USER') {
      const isCreateRoom = this.ChatDetailContainer.isCreateRoom;
      if (!isCreateRoom) {
        chatId = this.ChatDetailContainer.roomId;
        this.sendMessage(newMessages, chatId, typeMsg);
      }
      if (isCreateRoom) {
        const id =
          this.ChatDetailContainer.chatInfo.data && this.ChatDetailContainer.chatInfo.data.id;
        this.ChatDetailContainer.firstMessage = newMessages;
        this.createRoom(id, typeMsg);
      }
    }
  };

  sendMessage = (newMessages: IHyperMessage[] = [], chatId: string, typeMsg: KindOfMsg) => {
    let sendReplyId = '';
    // if (replyData && replyData.isReply) {
    //   sendReplyId = replyData.itemMessage && replyData.itemMessage._id;
    // }

    if (chatId) {
      // TODO
      // sendReplyId = this.ChatDetailContainer.state.currentMessage?._id || '';
      // const postData = {
      //   chatId: ,
      //   message: newMessages[0].text,
      //   replyId: sendReplyId,
      //   type: typeMsg,
      // };

      const postData = {
        chatRoomId: chatId,
        message: newMessages[0].text,
        messageStatus: '1',
        messageType: '1',
        user: { userName: 'Test 1', status: '1' },
        userId: '7JBbXOtJhieqbSpq0k00103E',
      };

      console.log('test_param: ', postData);
      console.log('test_param: ', this.ChatDetailContainer.state.currentMessage);

      processRequestRespository(
        ChatDetailServices.getInstance().insertMessage(postData),
        () => this.sendMessageSuccess(newMessages[0]),
        undefined,
        false,
        false
      );
      this.onCloseReply();
    }
  };

  private onCloseReply = () => {
    // const reply = {
    //   itemMessage: undefined,
    //   isReply: false,
    // };
    // dispatch(changeReplyMessage(reply));
  };

  private sendMessageSuccess = (msg: IHyperMessage) => {
    const { currentMessage } = this.ChatDetailContainer.state;
    currentMessage && this.closePopup();
    // this.appendMessage(msg);
  };

  // Send Files
  sendFile = () => {};

  // Answer, edit, copy, remove
  onAnswer = () => {
    this.closePopup();
    this.ChatDetailContainer.setState({
      currentMessage: this.tmpMessage,
    });
  };
  onEdit = () => {
    this.closePopup();
  };
  onCopy = () => {
    Clipboard.setString(this.tmpMessage?.text);
    this.closePopup();
  };

  onHideFooter = () => {
    this.closePopup();
  };

  onRemove = () => {
    console.log('test_onRemove');
    this.closePopup();
    this.onDeleteMessage(this.tmpMessage);
  };

  closePopup = () => {
    this.ChatDetailContainer.refChatActionsComponent.current?.refModalChatActions.current?.close();
    this.ChatDetailContainer.setState({
      currentMessage: null,
    });
  };
}
