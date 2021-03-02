/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ShadowPropTypesIOS,
} from 'react-native';
import { ListUserCheckProps } from './list-user-check.props';
import { ListUserCheckAdapter } from './list-user-check.adapter';
import { ItemUserCheckComponent } from './item-user-check/item-user-check.component';
import { SvgXml } from 'react-native-svg';
import svgs from 'res/svgs';

export class ListUserCheckComponent extends PureComponent<ListUserCheckProps> {
  private ListUserCheckAdapter: ListUserCheckAdapter;
  constructor(props: ListUserCheckProps) {
    super(props);
    this.ListUserCheckAdapter = new ListUserCheckAdapter(this);
  }

  render() {
    const { dataUserCheck, removeUserCheck, onCreateGr } = this.props;
    return dataUserCheck && dataUserCheck.length > 0 ? (
      <View style={styles.container}>
        <FlatList
          data={dataUserCheck}
          horizontal
          renderItem={({ item }) => (
            <ItemUserCheckComponent itemUserCheck={item} removeUserCheck={removeUserCheck} />
          )}
          ItemSeparatorComponent={() => <View style={{ width: 16, height: '100%' }} />}
        />
        <View style={styles.wrapButton}>
          <TouchableOpacity onPress={onCreateGr}>
            <View style={styles.btn}>
              <SvgXml height={24} width={24} xml={svgs.ic_check_white} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View></View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    borderTopColor: '#E6E8EB',
    borderTopWidth: 1,
    backgroundColor: '#fff',
    paddingLeft: 8,
    alignItems: 'center',
  },
  wrapButton: {
    width: 76,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#115DD3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtCreate: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
});
