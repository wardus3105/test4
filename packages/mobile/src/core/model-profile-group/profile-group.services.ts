/* 
    Created by longdq
*/

import { fetch, post, put, deletes } from 'core/common/networking/api-helper';
import { URL_PATHS } from 'core/common/networking/url-paths';

export default class ProfileGroupServices {
  private static instance: ProfileGroupServices;

  static getInstance(): ProfileGroupServices {
    if (!ProfileGroupServices.instance) {` `
      ProfileGroupServices.instance = new ProfileGroupServices();
    }
    return ProfileGroupServices.instance;
  }

  getInfoChat = (chatId: string) => {
    return post(URL_PATHS.CHAT_INFO, { chatId: chatId }, true);
  };

  removeUserGr = (userId: string, chatId: string) => {
    return post(URL_PATHS.REMOVE_GROUP, { userId: userId, chatId: chatId }, true);
  };
}
