/* 
    Created by longdq
*/

import { fetch, post, put, deletes } from 'core/common/networking/api-helper';
import { URL_PATHS } from 'core/common/networking/url-paths';

export default class CreateGroupServices {
  private static instance: CreateGroupServices;

  static getInstance(): CreateGroupServices {
    if (!CreateGroupServices.instance) {
      CreateGroupServices.instance = new CreateGroupServices();
    }
    return CreateGroupServices.instance;
  }

  searchUser = (text: string, limit: number, page: number) => {
    return fetch(URL_PATHS.SYNC_USER_IHCM, { value: text, pageSize: limit, page: page }, true);
  };

  onCreateGr = (data: any) => {
    return post(URL_PATHS.CREATE_GROUP, data, true);
  };
}
