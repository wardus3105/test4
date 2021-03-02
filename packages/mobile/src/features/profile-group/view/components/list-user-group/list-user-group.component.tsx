/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ListUserGroupProps } from './list-user-group.props';
import { ListUserGroupAdapter } from './list-user-group.adapter';
import { ItemUserGroupComponent } from './item-user-group/item-user-group.component';

export class ListUserGroupComponent extends PureComponent<ListUserGroupProps> {
  private ListUserGroupAdapter: ListUserGroupAdapter;
  constructor(props: ListUserGroupProps) {
    super(props);
    this.ListUserGroupAdapter = new ListUserGroupAdapter(this);
  }

  render() {
    const { dataInfoGr, goToChatDetail, removeUserGr } = this.props;
    if (dataInfoGr && dataInfoGr.users) {
      return (
        <View style={{ flex: 1, paddingHorizontal: 16 }}>
          <FlatList
            data={dataInfoGr.users}
            renderItem={({ item }) => (
              <ItemUserGroupComponent
                item={item}
                goToChatDetail={goToChatDetail}
                removeUserGr={removeUserGr}
              />
            )}
            ListFooterComponent={() => <View style={{ height: 40, width: '100%' }} />}
          />
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  container: {},
});
