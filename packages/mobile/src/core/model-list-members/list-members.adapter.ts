/* 
    Created by longdq
*/

import { TypeParam } from 'core/model-chat-detail/chat-detail.props';
import { processRequestRespository } from 'core/common/networking/api-helper';
import { hideLoading, showLoading } from 'libraries/loading/loading-modal';
import NavigationService from 'routers/navigation-service';
import {
  ChatDetailScreen,
  NewMessageScreen,
  ProfileScreen,
  SearchScreen,
} from 'routers/screen-name';
import { User, User2 } from 'core/common/types/user';
// import ListMembersContainer from '../../features/list-members/view/list-members.screen';
import ListMembersServices from './list-members.services';
// import { User, User2 } from 'types/user';
// import ListMembersContainer from 'features/list-members/view/list-members.screen';
import { ListMembersProps } from './list-members.props';
import { useState } from 'react';

function ListMembersAdapter(props: ListMembersProps) {
  // ListMembersContainer: ListMembersContainer;
  // constructor(container: ListMembersContainer) {
  //   this.ListMembersContainer = container;
  // }

  // Variables
  const { userInfo } = props;
  var page: number = 1;
  const ITEM_PAGE = 15;

  // States
  const [dataSearchUser, setDataSearchUser] = useState<User2[]>([]);
  const [loading, setLoading] = useState(false);
  const [txt, setTxt] = useState('');

  // logic

  function goToProfile() {
    NavigationService.navigate(ProfileScreen, {
      user: userInfo.user,
    });
  }

  function goToSearch() {
    NavigationService.navigate(SearchScreen);
  }

  function goToNewMess() {
    NavigationService.navigate(NewMessageScreen);
  }

  function onRefresh() {
    page = 1;
    setDataSearchUser([]);
    searchUser();

    console.log('List Member refresh :', page, '-------------', dataSearchUser);
  }

  function onEndReached() {
    console.log('test_onEndReached');
    // const { dataSearchUser } = this.ListMembersContainer.state;
    // const { loading } = this.ListMembersContainer.state;
    // let { page, ITEM_PAGE } = this.ListMembersContainer;
    // if (loading || dataSearchUser.length < page * ITEM_PAGE) return;
    page++;
    console.log('Test onEndReached :', page, '-----', dataSearchUser);

    searchUser();

    //Call url with new pages
  }

  function setTxtSearch(txt: string) {
    // this.ListMembersContainer.setState(
    //   {
    //     txt: txt,
    //     dataSearchUser: [],
    //   },
    //   () => {
    //     this.searchUser();
    //   }
    // );
    setTxt(txt);
    setDataSearchUser([]);
    searchUser();
  }

  function searchUser() {
    // const text = this.ListMembersContainer.state.txt;
    // const text = txt;
    // const { page, ITEM_PAGE } = this.ListMembersContainer;
    showLoading();
    // this.ListMembersContainer.setState({
    //   loading: true,
    // });
    setLoading(true);
    processRequestRespository(
      ListMembersServices.getInstance().searchUser(txt, ITEM_PAGE, page),
      searchUserSuccess
    );
  }

  function searchUserSuccess(res: User2[]) {
    // this.ListMembersContainer.setState({
    //   loading: false,
    // });
    setLoading(false);
    hideLoading();
    // this.ListMembersContainer.setState({
    //   dataSearchUser: [...this.ListMembersContainer.state.dataSearchUser, ...res],
    // });
    setDataSearchUser(dataSearchUser.concat(res));
  }

  function goToChatDetail(item: User2) {
    NavigationService.navigate(ChatDetailScreen, {
      chatInfo: { data: item, type: TypeParam.FROM_USER },
    });
  }

  return {
    page,
    ITEM_PAGE,
    dataSearchUser,
    loading,
    txt,
    goToProfile,
    goToSearch,
    goToNewMess,
    onRefresh,
    onEndReached,
    setTxtSearch,
    searchUser,
    searchUserSuccess,
    goToChatDetail,
  };
}

export default ListMembersAdapter;
