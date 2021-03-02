/* 
    Created by longdq
*/

import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../../../../res/colors';
import { SvgXml } from 'react-native-svg';
import Icon from '../../../../../../res/svgs';
import { StatusUserTypes, User } from 'core/common/types/user';

export interface itemDataCheck {
  item: User;
  check: boolean;
}
import { ItemListUserAdapter } from './item-list-user.adapter';
import { ItemListUserProps } from './item-list-user.props';
export class ItemListUserComponent extends PureComponent<ItemListUserProps, { check: boolean }> {
  private ItemListUserAdapter: ItemListUserAdapter;
  constructor(props: ItemListUserProps) {
    super(props);
    this.ItemListUserAdapter = new ItemListUserAdapter(this);
    this.state = {
      check: false,
    };
  }

  onPressItem = () => {
    this.setState(
      {
        check: !this.state.check,
      },
      () => {
        this.addToDataCheck({
          item: this.props.item,
          check: this.state.check,
        });
      }
    );
  };

  addToDataCheck = (item: itemDataCheck) => {
    this.props.addToDataCheck(item);
  };

  render() {
    const { item } = this.props;
    return (
      <TouchableOpacity
        // onPress={() => pushToDetail(mess.data.item)}
        activeOpacity={0.5}
        onPress={this.onPressItem}
      >
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
              {item.statusUser === StatusUserTypes.ONLINE && <View style={styles.status} />}
            </View>
            <Text style={styles.name} numberOfLines={1}>
              {item && item.username}
            </Text>
          </View>
          {/* <View>
            {this.state.check ? (
              <SvgXml width="20" height="20" xml={Icon.ic_check} />
            ) : (
              <SvgXml width="20" height="20" xml={Icon.ic_un_check} />
            )}
          </View> */}
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
    justifyContent: 'space-between',
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
    width: '80%',
  },
});
