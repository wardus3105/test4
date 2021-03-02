/* 
    Created by longdq
*/

import { fetch, post, put, deletes } from 'core/common/networking/api-helper';
import { URL_PATHS } from 'core/common/networking/url-paths';

export default class NewMessageServices {
  private static instance: NewMessageServices;

  static getInstance(): NewMessageServices {
    if (!NewMessageServices.instance) {
      NewMessageServices.instance = new NewMessageServices();
    }
    return NewMessageServices.instance;
  }

  searchUser = (text: string, limit: number, page: number) => {
    return fetch(URL_PATHS.SYNC_USER_IHCM, { value: text, pageSize: limit, page: page }, true);
  };
}
