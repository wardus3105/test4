/* 
    Created by longdq
*/

import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ContainerComponent } from 'libraries/main/container/container.component';
import ListMembersAdapter from 'core/model-list-members/list-members.adapter';
import { ListMembersProps } from 'core/model-list-members/list-members.props';
import { ListMembersStates } from 'core/model-list-members/list-members.states';
import { HeaderTypes } from 'types/header-types';
import { SearchComponent } from './components/search/search.component';
import { SearchListUserComponent } from './components/search-list-user/search-list-user.component';
import { UserInfoComponent } from 'features/list-user-chat/view/components/user-info/user-info.component';
import { useEffect } from 'react';

export const ListMembersContainer = (props: ListMembersProps) => {
  const { userInfo } = props;
  const {
    dataSearchUser,
    searchUser,
    setTxtSearch,
    goToChatDetail,
    loading,
    onEndReached,
    onRefresh,
    goToNewMess,
    goToProfile,
    page,
    ITEM_PAGE,
  } = ListMembersAdapter(props);

  // ListMembersAdapter: ListMembersAdapter;
  //Local States

  // page: number = 1;
  // ITEM_PAGE = 15;

  // constructor(props: ListMembersProps) {
  //   super(props);
  //   this.ListMembersAdapter = new ListMembersAdapter(this);
  //   this.state = {
  //     dataSearchUser: [],
  //     loading: false,
  //     txt: '',
  //   };
  // }

  // componentDidMount = () => {
  //   this.ListMembersAdapter.searchUser();
  // };

  useEffect(() => {
    searchUser();
  }, []);

  // render() {
  //   const { userInfo } = this.props;
  //   const { dataSearchUser } = this.state;
  return (
    <ContainerComponent style={styles.container} headerType={HeaderTypes.NONE}>
      <UserInfoComponent
        userInfo={userInfo && userInfo.user}
        goToProfile={goToProfile}
        goToNewMess={goToNewMess}
      />
      <SearchComponent search={setTxtSearch} />
      <Text style={styles.listTitle}>DANG SÁCH THÀNH VIÊN</Text>
      <SearchListUserComponent
        dataSearchUser={dataSearchUser}
        goToChatDetail={goToChatDetail}
        loading={loading}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        page={page}
        ITEM_PAGE={ITEM_PAGE}
      />
    </ContainerComponent>
  );
};

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 16,
    marginVertical: 10,
    color: '#4D5971',
  },
});
