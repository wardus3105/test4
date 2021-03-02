/* 
    Created by longdq
*/

import { fetch, post, put, deletes } from 'core/common/networking/api-helper';
import { URL_PATHS } from 'core/common/networking/url-paths';

export default class SearchServices {
  private static instance: SearchServices;

  static getInstance(): SearchServices {
    if (!SearchServices.instance) {
      SearchServices.instance = new SearchServices();
    }
    return SearchServices.instance;
  }

  searchUser = (text: string, limit: number, page: number) => {
    return fetch(URL_PATHS.SYNC_USER_IHCM, { value: text, pageSize: limit, page: page }, true);
  };
}
