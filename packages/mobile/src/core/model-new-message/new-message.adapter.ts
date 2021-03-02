/* 
    Created by longdq
*/

import { processRequestRespository } from 'core/common/networking/api-helper';
// import { hideLoading, showLoading } from 'libraries/loading/loading-modal';
import { User } from 'core/common/types/user';
import NewMessageContainer from '../../features/new-message/view/new-message.screen';
import NewMessageServices from './new-message.services';

export class NewMessageAdapter {
  NewMessageContainer: NewMessageContainer;
  constructor(container: NewMessageContainer) {
    this.NewMessageContainer = container;
  }

  onRefresh = () => {
    this.NewMessageContainer.page = 1;
    this.NewMessageContainer.setState({
      dataSearchUser: [],
    });
    this.searchUser();
  };

  onEndReached = () => {
    console.log('test_onEndReached');
    const { dataSearchUser } = this.NewMessageContainer.state;
    const { loading } = this.NewMessageContainer.state;
    let { page, ITEM_PAGE } = this.NewMessageContainer;
    if (loading || dataSearchUser.length < page * ITEM_PAGE) return;
    this.NewMessageContainer.page += 1;
    this.searchUser();
    //Call url with new page
  };

  searchUser = () => {
    const text = this.NewMessageContainer.state.txt;
    const { page, ITEM_PAGE } = this.NewMessageContainer;
    // showLoading();
    this.NewMessageContainer.setState({
      loading: true,
    });
    processRequestRespository(
      NewMessageServices.getInstance().searchUser(text, ITEM_PAGE, page),
      this.searchUserSuccess
    );
  };

  setTxtSearch = (txt: string) => {
    this.NewMessageContainer.setState(
      {
        txt: txt,
        dataSearchUser: [],
      },
      () => {
        this.searchUser();
      }
    );
  };

  // searchUser = (text: string) => {
  //   showLoading();
  //   console.log(text, 'text search ......');
  //   processRequestRespository(
  //     NewMessageServices.getInstance().searchUser(text),
  //     this.searchUserSuccess
  //   );
  // };
  searchUserSuccess = (res: User[]) => {
    this.NewMessageContainer.setState({
      loading: false,
    });
    // hideLoading();
    this.NewMessageContainer.setState({
      dataSearchUser: [...this.NewMessageContainer.state.dataSearchUser, ...res],
    });
  };
}
