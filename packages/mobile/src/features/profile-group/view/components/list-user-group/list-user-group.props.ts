/* 
    Created by longdq
*/

import { ModelInfoGr } from 'features/profile-group/model-profile-group/profile-group.states';
import { User } from 'core/common/types/user';

export interface ListUserGroupProps {
  dataInfoGr: ModelInfoGr;
  goToChatDetail: (item: User) => void;
  removeUserGr: (item: User) => void;
}
