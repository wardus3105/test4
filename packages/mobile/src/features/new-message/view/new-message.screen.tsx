/* 
    Created by longdq
*/

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ContainerComponent } from 'libraries/main/container/container.component';
import { NewMessageAdapter } from 'core/model-new-message/new-message.adapter';
import { NewMessageProps } from 'core/model-new-message/new-message.props';
import { NewMessageStates } from 'core/model-new-message/new-message.states';
import { HeaderTypes } from 'types/header-types';
import { NewGroupComponent } from './components/new-group/new-group.component';
import { SearchComponent } from './components/search/search.component';
import { SearchListUserComponent } from './components/search-list-user/search-list-user.component';
import NavigationService from 'routers/navigation-service';
import { translate } from 'res/languages';
import { ChatDetailScreen, CreateGroupScreen } from 'routers/screen-name';
import { TypeParam } from 'core/model-chat-detail/chat-detail.props';
import { User } from 'core/common/types/user';

export default class NewMessageContainer extends React.PureComponent<
  NewMessageProps,
  NewMessageStates
> {
  NewMessageAdapter: NewMessageAdapter;
  //Local States

  page: number = 1;
  ITEM_PAGE = 15;

  constructor(props: NewMessageProps) {
    super(props);
    this.NewMessageAdapter = new NewMessageAdapter(this);
    this.state = {
      dataSearchUser: [],
      loading: false,
      txt: '',
    };
  }

  componentDidMount = () => {
    this.NewMessageAdapter.searchUser();
  };

  goToChatDetail = (item: User) => {
    NavigationService.navigate(ChatDetailScreen, {
      chatInfo: { data: item, type: TypeParam.FROM_USER },
    });
  };

  goToCreateGr = () => {
    NavigationService.navigate(CreateGroupScreen);
  };

  render() {
    const { dataSearchUser } = this.state;

    return (
      <ContainerComponent
        style={styles.container}
        title={translate('newMess.newMess')}
        headerType={HeaderTypes.BACK_TITLE}
      >
        <NewGroupComponent goToCreateGr={this.goToCreateGr} />
        <SearchComponent search={this.NewMessageAdapter.setTxtSearch} />
        <SearchListUserComponent
          dataSearchUser={dataSearchUser}
          goToChatDetail={this.goToChatDetail}
          loading={this.state.loading}
          onEndReached={this.NewMessageAdapter.onEndReached}
          onRefresh={this.NewMessageAdapter.onRefresh}
          page={this.page}
          ITEM_PAGE={this.ITEM_PAGE}
        />
      </ContainerComponent>
    );
  }
}

//Styles
const styles = StyleSheet.create({
  container: {},
});
