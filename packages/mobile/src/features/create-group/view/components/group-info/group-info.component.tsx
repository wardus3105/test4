/* 
    Created by lolngdq
*/

import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import colors from 'res/colors';
import svgs from 'res/svgs';
import { GroupInfoAdapter } from './group-info.adapter';
import { GroupInfoProps } from './group-info.props';
import { translate } from 'res/languages';
const screenWidth = Dimensions.get('window').width;

export class GroupInfoComponent extends PureComponent<GroupInfoProps> {
  private GroupInfoAdapter: GroupInfoAdapter;
  constructor(props: GroupInfoProps) {
    super(props);
    this.GroupInfoAdapter = new GroupInfoAdapter(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapInfo}>
          <SvgXml width="56" height="56" xml={svgs.ic_camera} />
          <TextInput
            style={[styles.input, { borderColor: this.props.emptyNameGr ? '#FF4D54' : '#4080FF' }]}
            placeholder={translate('createGr.nameGr')}
            placeholderTextColor="#808999"
            onChangeText={this.props.onChangeText}
          />
        </View>
        <View style={styles.line} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  line: {
    backgroundColor: '#E6E8EB',
    height: 1,
    marginTop: 16,
    width: '100%',
  },
  input: {
    height: 44,
    width: screenWidth - 32 - 56 - 10,
    marginLeft: 10,
    borderColor: '#E6E8EB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: colors.txtColor,
  },
  wrapInfo: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
  },
});
