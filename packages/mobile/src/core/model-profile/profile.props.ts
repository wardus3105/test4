/* 
    Created by longdq
*/

import { LoginMobileResponse } from 'features/login-old/view/components/login-form-wv/login-form-wv.props';

export interface ProfileProps {
  userInfo: LoginMobileResponse;
  removeUserInfoAction: () => void;
}
