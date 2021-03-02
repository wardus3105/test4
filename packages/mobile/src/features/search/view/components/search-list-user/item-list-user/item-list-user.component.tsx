/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, View } from 'react-native';
import { ItemListUserProps } from './item-list-user.props';
import { ItemListUserAdapter } from './item-list-user.adapter';
import Colors from '../../../../../../res/colors';
export class ItemListUserComponent extends PureComponent<ItemListUserProps> {
  private ItemListUserAdapter: ItemListUserAdapter;
  constructor(props: ItemListUserProps) {
    super(props);
    this.ItemListUserAdapter = new ItemListUserAdapter(this);
  }

  render() {
    const { item, goToChatDetail } = this.props;
    return (
      <TouchableOpacity onPress={() => goToChatDetail(item)} activeOpacity={0.5}>
        <View style={styles.container}>
          <View style={styles.wrapAvatar}>
            {/* <Image
              style={styles.avatarStyle}
              source={{
                uri: 'https://placeimg.com/128/128/any',
              }}
            /> */}
            <View style={styles.avatarStyle}>
              <Text style={{ color: Colors.primaryColor, fontSize: 24, fontWeight: '500' }}>
                {item && item.username && item.username[0]}
              </Text>
            </View>
            <View style={styles.status} />
          </View>
          <Text style={styles.name}>{item && item.username}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarStyle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.bg1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
  },
  wrapAvatar: {
    width: 56,
    height: 56,
  },
  status: {
    width: 14,
    height: 14,
    backgroundColor: '#33CC7F',
    position: 'absolute',
    borderRadius: 7,
    bottom: 0,
    right: 0,
    borderColor: '#fff',
    borderWidth: 2,
  },
  name: {
    marginLeft: 12,
    fontSize: 18,
    color: '#1A2948',
  },
});
