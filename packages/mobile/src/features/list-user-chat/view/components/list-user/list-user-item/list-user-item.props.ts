/* 
    Created by longdq
*/

import { User } from 'features/login-old/view/components/login-form-wv/login-form-wv.props';

export interface ListUserItemProps {
  item: User;
  goToChatDetail: (item: User) => void;
}
