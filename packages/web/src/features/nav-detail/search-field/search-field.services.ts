
/* 
    Created by huydz
*/

// import { fetch, post, put, deletes } from "networking/api-helper"

export default class SearchFieldServices {
  private static instance: SearchFieldServices;

  static getInstance(): SearchFieldServices {
    if (!SearchFieldServices.instance) {
      SearchFieldServices.instance = new SearchFieldServices();
    }
    return SearchFieldServices.instance;
  }
}


