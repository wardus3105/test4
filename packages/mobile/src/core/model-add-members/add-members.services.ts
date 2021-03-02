/* 
    Created by longdq
*/

import { fetch, post, put, deletes } from 'core/common/networking/api-helper';
import { URL_PATHS } from 'core/common/networking/url-paths';

export default class AddMembersServices {
  private static instance: AddMembersServices;

  static getInstance(): AddMembersServices {
    if (!AddMembersServices.instance) {
      AddMembersServices.instance = new AddMembersServices();
    }
    return AddMembersServices.instance;
  }

  searchUser = (text: string, limit: number, page: number) => {
    return fetch(URL_PATHS.SYNC_USER_IHCM, { value: text, pageSize: limit, page: page }, true);
  };

  addMembers = (data: any) => {
    return post(URL_PATHS.ADD_MEMBERS, data, true);
  };
}
