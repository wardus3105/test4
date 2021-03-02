/*
    Created by longdq
*/
import { post, postFile, deletes } from 'core/common/networking/api-helper';
import { URL_PATHS } from 'core/common/networking/url-paths';
import { RemoveMessageParams } from './chat-detail.props';

export default class ChatDetailServices {
  private static instance: ChatDetailServices;

  static getInstance(): ChatDetailServices {
    if (!ChatDetailServices.instance) {
      ChatDetailServices.instance = new ChatDetailServices();
    }
    return ChatDetailServices.instance;
  }

  getListMessage = (chatId: string) => {
    return post(
      URL_PATHS.LIST_MESSAGE,
      {
        chatId: chatId,
        position: 0,
      },
      true
    );
  };

  insertMessage = (data: any) => {
    return post(URL_PATHS.INSERT_MESSAGE, data, true);
  };

  requestToUser = (id: string) => {
    return post(URL_PATHS.REQUEST_TO_USER, { userId: id }, true);
  };

  createRomChat = (id: string) => {
    return post(URL_PATHS.CREATE_ROM_CHAT, { userId: id }, true);
  };

  uploadFile = (data: any) => {
    return postFile(URL_PATHS.UPLOAD_FILE, data, true);
  };

  removeMessage = (data: RemoveMessageParams) => {
    return deletes(`${URL_PATHS.MESSAGE}`, data, true);
  };
}
