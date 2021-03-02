/* 
    Created by longdq
*/

import { User } from 'core/common/types/user';

export interface ItemListUserProps {
  item: User;
  goToChatDetail: (item: User) => void;
}
