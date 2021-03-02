/* 
    Created by longdq
*/

import { User } from 'core/common/types/user';
import { itemDataCheck } from './item-list-user.component';

export interface ItemListUserProps {
  item: User;
  addToDataCheck: (item: itemDataCheck) => void;
}
