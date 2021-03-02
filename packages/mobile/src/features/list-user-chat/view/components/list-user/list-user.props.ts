/* 
    Created by longdq
*/

import { User } from 'features/login-old/view/components/login-form-wv/login-form-wv.props';

export interface ListUserProps {
  dataListUser: User[];
  goToChatDetail: (item: User) => void;
}
