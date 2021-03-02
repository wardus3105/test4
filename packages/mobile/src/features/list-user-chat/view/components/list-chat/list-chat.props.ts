/* 
    Created by longdq
*/

import { ListChatModel } from 'core/model-list-user-chat/list-user-chat.props';

export interface ListChatProps {
  dataListChat: ListChatModel[];
  goToChatDetail: (item: ListChatModel) => void;
  onRefresh: () => void;
  onEndReached: () => void;
  loading: boolean;
  page: number;
  ITEM_PAGE: number;
}

// export interface ListChatStates {
//   loading:boolean
// }
