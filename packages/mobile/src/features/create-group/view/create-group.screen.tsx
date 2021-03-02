/* 
    Created by longdq
*/

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ContainerComponent } from 'libraries/main/container/container.component';
import { CreateGroupAdapter } from '/core/model-create-group/create-group.adapter';
import { CreateGroupProps } from '/core/model-create-group/create-group.props';
import { CreateGroupStates } from '/core/model-create-group/create-group.states';
import { HeaderTypes } from 'types/header-types';
import { GroupInfoComponent } from './components/group-info/group-info.component';
import { SearchComponent } from './components/search/search.component';
import { SearchListUserComponent } from './components/search-list-user/search-list-user.component';
import { ListUserCheckComponent } from './components/list-user-check/list-user-check.component';
import { translate } from 'res/languages';

export default class CreateGroupContainer extends React.PureComponent<
  CreateGroupProps,
  CreateGroupStates
> {
  CreateGroupAdapter: CreateGroupAdapter;
  //Local States

  page: number = 1;
  ITEM_PAGE = 15;

  constructor(props: CreateGroupProps) {
    super(props);
    this.CreateGroupAdapter = new CreateGroupAdapter(this);
    this.state = {
      dataSearchUser: [],
      dataUserCheck: [],
      nameGr: '',
      emptyNameGr: false,
      loading: false,
      txt: '',
    };
  }

  componentDidMount = () => {
    this.CreateGroupAdapter.searchUser();
  };

  render() {
    const { dataSearchUser, dataUserCheck, emptyNameGr } = this.state;
    return (
      <ContainerComponent
        style={styles.container}
        title={translate('createGr.titleCreateGr')}
        headerType={HeaderTypes.BACK_TITLE}
      >
        <GroupInfoComponent
          onChangeText={this.CreateGroupAdapter.onChangeText}
          emptyNameGr={emptyNameGr}
        />
        <SearchComponent search={this.CreateGroupAdapter.setTxtSearch} />
        <SearchListUserComponent
          dataSearchUser={dataSearchUser}
          addToDataCheck={this.CreateGroupAdapter.addToDataCheck}
          loading={this.state.loading}
          onEndReached={this.CreateGroupAdapter.onEndReached}
          onRefresh={this.CreateGroupAdapter.onRefresh}
          page={this.page}
          ITEM_PAGE={this.ITEM_PAGE}
        />
        <ListUserCheckComponent
          dataUserCheck={dataUserCheck}
          removeUserCheck={this.CreateGroupAdapter.removeUserCheck}
          onCreateGr={this.CreateGroupAdapter.onCreateGr}
        />
      </ContainerComponent>
    );
  }
}

//Styles
const styles = StyleSheet.create({
  container: {},
});
