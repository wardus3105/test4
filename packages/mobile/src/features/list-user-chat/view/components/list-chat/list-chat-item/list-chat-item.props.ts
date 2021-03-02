/* 
    Created by longdq
*/

import { ListChatModel } from 'core/model-list-user-chat/list-user-chat.props';

export interface ListChatItemProps {
  item: ListChatModel;
  goToChatDetail: (item: ListChatModel) => void;
}
