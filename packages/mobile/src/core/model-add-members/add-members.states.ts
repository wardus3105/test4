/* 
    Created by longdq
*/

import { User } from 'core/common/types/user';
import { itemDataCheck } from 'features/create-group/view/components/search-list-user/item-list-user/item-list-user.component';

export interface AddMembersStates {
  dataSearchUser: User[];
  loading: boolean;
  txt: string;

  dataUserCheck: itemDataCheck[];
  nameGr: string;
  emptyNameGr: boolean;
}
