/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { CustomViewMessageProps } from './custom-view-message.props';
import { CustomViewMessageAdapter } from './custom-view-message.adapter';
import { Attachment } from 'core/common/types/message';
import colors from 'res/colors';
import { IHyperMessage } from '../../../../../core/common/types/message';
import svgs from '../../../../../res/svgs';
import { SvgXml } from 'react-native-svg';
import { translate } from '../../../../../res/languages';

export class CustomViewMessageComponent extends PureComponent<CustomViewMessageProps> {
  private CustomViewMessageAdapter: CustomViewMessageAdapter;
  constructor(props: CustomViewMessageProps) {
    super(props);
    this.CustomViewMessageAdapter = new CustomViewMessageAdapter(this);
    this.state = {
      heightFl: 1,
    };
  }

  componentDidMount() {
    const currentMessage = this.props.propCustom && this.props.propCustom.currentMessage;
    if (currentMessage && currentMessage.attachment) {
      this.setState({
        heightFl: Math.ceil(currentMessage.attachment.length / 3),
      });
    }
  }

  renderItem = (item: Attachment) => {
    const currentMessage = this.props.propCustom && this.props.propCustom.currentMessage;

    if (item && item.type && item.type === 'IMAGE') {
      return (
        <TouchableOpacity
          onPress={() => this.CustomViewMessageAdapter.goToPhotoDetail(currentMessage)}
        >
          <Image
            source={{ uri: `http://172.16.20.50:31001/preview/${item.path}` }}
            style={{ width: 90, height: 90, borderRadius: 4, marginRight: 4, marginTop: 4 }}
          />
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={() => this.CustomViewMessageAdapter.goToPhotoDetail(item)}>
        <View
          style={{
            width: 90,
            height: 90,
            borderRadius: 4,
            marginRight: 4,
            marginTop: 4,
            backgroundColor: colors.primaryColor,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ textAlign: 'center' }}>{item && item.contentType}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderReplyMsg = () => {
    const currentMessage: IHyperMessage = this.props.propCustom?.currentMessage;
    if (currentMessage?.reply) {
      const position = this.props?.propCustom?.position;
      const uName1 =
        position === 'right' ? translate('message.you') : currentMessage?.user?.username;
      const uName2 =
        position === 'right' ? currentMessage?.reply?.user?.userName : translate('message.you');
      return (
        <View
          style={{
            padding: 8,
            backgroundColor: colors.msgNormal,
            // height: 80,
            // width: 50,
            // borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}
        >
          <View style={styles.headerView}>
            <SvgXml width={16} height={16} xml={svgs.actionMenu.ic_reply} />
            <Text style={styles.username1}>{uName1}</Text>
            <Text style={styles.replytext}>{translate('message.answered')}</Text>
            <Text style={styles.username2}>{uName2}</Text>
          </View>
          <Text>{currentMessage?.reply?.message?.message || ''}</Text>
          {position === 'left' && <View style={{ height: 1, backgroundColor: colors.lineChat, marginTop:12 }} />}
        </View>
      );
    } else {
      return <View />;
    }
  };

  render() {
    const currentMessage = this.props.propCustom && this.props.propCustom.currentMessage;

    if (currentMessage && currentMessage.attachment) {
      return (
        <View style={{ width: '100%', height: this.state.heightFl * 98 }}>
          <FlatList
            numColumns={3}
            data={currentMessage.attachment}
            renderItem={({ item }) => this.renderItem(item)}
            // keyExtractor={(item: any) => item.id}
            listKey={(item, index) => 'D' + index.toString()}
            contentContainerStyle={{
              alignItems: 'flex-end',
            }}
          />
        </View>
      );
    }

    return this.renderReplyMsg();
  }
}

const styles = StyleSheet.create({
  container: {},
  headerView: {
    flexDirection: 'row',
    marginBottom: 4,
  },

  username1: {
    fontSize: 12,
    color: '#808999',
    lineHeight: 18,
    paddingHorizontal: 4,
  },
  replytext: {
    fontSize: 12,
    color: '#808999',
    lineHeight: 18,
    paddingRight: 4,
  },
  username2: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4D5971',
    lineHeight: 18,
  },
});
