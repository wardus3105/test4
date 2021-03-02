/* 
    Created by longdq
*/

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ContainerComponent } from 'libraries/main/container/container.component';
import AddMembersAdapter from 'core/model-add-members/add-members.adapter';
import { AddMembersProps } from 'core/model-add-members/add-members.props';
import { AddMembersStates } from 'core/model-add-members/add-members.states';
import { HeaderTypes } from 'types/header-types';
import { translate } from 'res/languages';
import { ListUserCheckComponent } from './components/list-user-check/list-user-check.component';
import { SearchListUserComponent } from './components/search-list-user/search-list-user.component';
import { SearchComponent } from './components/search/search.component';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { useEffect } from 'react';

export const AddMembersContainer = (props: AddMembersProps) => {
  // AddMembersAdapter: AddMembersAdapter;
  // //Local States
  // page: number = 1;
  // ITEM_PAGE = 15;
  // chatId: string;

  // constructor(props: AddMembersProps) {
  //   super(props);
  //   this.AddMembersAdapter = new AddMembersAdapter(this);
  //   const navigation: NavigationScreenProp<NavigationState, NavigationParams> = this.props
  //     .navigation;
  //   this.chatId = navigation.getParam('chatId');
  //   this.state = {
  //     dataSearchUser: [],
  //     dataUserCheck: [],
  //     nameGr: '',
  //     emptyNameGr: false,
  //     loading: false,
  //     txt: '',
  //   };
  // }

  const {
    dataSearchUser,
    dataUserCheck,
    nameGr,
    emptyNameGr,
    loading,
    txt,
    removeUserCheck,
    onCreateGr,
    page,
    ITEM_PAGE,
    addToDataCheck,
    onEndReached,
    onRefresh,
    searchUser,
    setTxtSearch,
  } = AddMembersAdapter(props);

  // componentDidMount = () => {
  //   this.AddMembersAdapter.searchUser();
  // };

  useEffect(() => {
    searchUser();
  });

  // render() {
  //   const { dataSearchUser, dataUserCheck, emptyNameGr } = this.state;

  return (
    <ContainerComponent
      style={styles.container}
      title={translate('createGr.addMember')}
      headerType={HeaderTypes.BACK_TITLE}
    >
      <SearchComponent search={setTxtSearch} />
      <SearchListUserComponent
        dataSearchUser={dataSearchUser}
        addToDataCheck={addToDataCheck}
        loading={loading}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        page={page}
        ITEM_PAGE={ITEM_PAGE}
      />
      <ListUserCheckComponent
        dataUserCheck={dataUserCheck}
        removeUserCheck={removeUserCheck}
        onCreateGr={onCreateGr}
      />
    </ContainerComponent>
  );
};
// }

//Styles
const styles = StyleSheet.create({
  container: {},
});
