/* 
    Created by longdq
*/

import { User } from 'core/common/types/user';
import { itemDataCheck } from './item-list-user/item-list-user.component';

export interface SearchListUserProps {
  dataSearchUser: User[];
  addToDataCheck: (item: itemDataCheck) => void;
  loading: boolean;
  onEndReached: () => void;
  onRefresh: () => void;
  page: number;
  ITEM_PAGE: number;
}
