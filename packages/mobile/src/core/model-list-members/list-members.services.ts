/* 
    Created by longdq
*/

import { fetch, post, put, deletes } from 'core/common/networking/api-helper';
import { URL_PATHS } from 'core/common/networking/url-paths';

export default class ListMembersServices {
  private static instance: ListMembersServices;

  static getInstance(): ListMembersServices {
    if (!ListMembersServices.instance) {
      ListMembersServices.instance = new ListMembersServices();
    }
    return ListMembersServices.instance;
  }

  searchUser = (text: string, limit: number, page: number) => {
    return fetch(URL_PATHS.SYNC_USER_IHCM, { value: text, pageSize: limit, page: page }, true);
  };
}
