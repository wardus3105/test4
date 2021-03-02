/* 
    Created by longdq
*/

import { fetch, post, put, deletes } from 'core/common/networking/api-helper';
import { URL_PATHS } from '../common/networking/url-paths';

export default class ListUserChatServices {
  private static instance: ListUserChatServices;

  static getInstance(): ListUserChatServices {
    if (!ListUserChatServices.instance) {
      ListUserChatServices.instance = new ListUserChatServices();
    }
    return ListUserChatServices.instance;
  }

  getListUser = () => {
    return post(URL_PATHS.LIST_USER, {}, true);
  };

  getRoomChat = (userId: number, limit: number, page: number) => {
    return fetch(URL_PATHS.LIST_ROOM_CHAT, { userId: userId, pageSize: limit, page: page }, true);
  };
}
