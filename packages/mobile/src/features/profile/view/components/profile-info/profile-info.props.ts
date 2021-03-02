/* 
    Created by longdq
*/

import { User } from 'core/common/types/user';

export interface ProfileInfoProps {
  userInfo: User;
  logout: () => void;
  goBack: () => void;
}
