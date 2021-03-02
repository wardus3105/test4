/* 
    Created by longdq
*/

import { User2 } from 'core/common/types/user';

export interface ListMembersStates {
  dataSearchUser: User2[];
  loading: boolean;
  txt: string;
}
