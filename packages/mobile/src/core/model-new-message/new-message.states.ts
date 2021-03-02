/* 
    Created by longdq
*/

import { User } from 'core/common/types/user';

export interface NewMessageStates {
  dataSearchUser: User[];
  loading: boolean;
  txt: string;
}
