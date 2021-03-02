/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { ItemUserGroupProps } from './item-user-group.props';
import { ItemUserGroupAdapter } from './item-user-group.adapter';
import colors from 'res/colors';
import { HyperUtils } from 'core/common/hyper-utils';
import { StatusUserTypes } from 'core/common/types/user';
import svgs from 'res/svgs';
import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import { DimensionHelpers } from 'helpers/dimension-helpers';

export class ItemUserGroupComponent extends PureComponent<ItemUserGroupProps> {
  private ItemUserGroupAdapter: ItemUserGroupAdapter;
  constructor(props: ItemUserGroupProps) {
    super(props);
    this.ItemUserGroupAdapter = new ItemUserGroupAdapter(this);
  }

  render() {
    const { item, goToChatDetail, removeUserGr } = this.props;
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => goToChatDetail(item)}>
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
                <Text
                  style={{
                    color: colors.primaryColor,
                    fontSize: 24,
                    fontWeight: '500',
                  }}
                >
                  {HyperUtils.capitalFirstCharacter(item?.username)}
                </Text>
              </View>
              {item.statusUser === StatusUserTypes.ONLINE && <View style={styles.status} />}
            </View>
            <Text style={styles.name} numberOfLines={1}>
              {item && item.username}
            </Text>
          </View>
          <View>
            <HyperButtonComponent
              img={svgs.ic_delete}
              imgHeight={24}
              imgWidth={24}
              onPress={() => removeUserGr(item)}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    // padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  avatarStyle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.bg1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
  },
  wrapAvatar: {
    width: 48,
    height: 48,
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
    width: DimensionHelpers.width - 32 - 48 - 12 - 50,
  },
});
