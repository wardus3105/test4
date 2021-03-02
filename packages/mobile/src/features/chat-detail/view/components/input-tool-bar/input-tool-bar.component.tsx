/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, Image } from 'react-native';
import { InputToolBarProps } from './input-tool-bar.props';
import { InputToolBarAdapter } from './input-tool-bar.adapter';
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  Composer,
  Send,
  Actions,
} from 'react-native-gifted-chat';
import { SvgXml } from 'react-native-svg';
import svgs from 'res/svgs';
import { translate } from '../../../../../res/languages';
import colors from 'res/colors';

export class InputToolBarComponent extends PureComponent<InputToolBarProps> {
  private InputToolBarAdapter: InputToolBarAdapter;
  constructor(props: InputToolBarProps) {
    super(props);
    this.InputToolBarAdapter = new InputToolBarAdapter(this);
  }
  renderComposer = (propsComposer: Composer['props']) => {
    return (
      <Composer
        {...propsComposer}
        textInputStyle={styles.textInput}
        composerHeight={40}
        placeholder="Nhập nội dung..."
        placeholderTextColor="#99A0AD"
        multiline={true}
      />
    );
  };

  renderSend = (propsSend: Send['props']) => (
    <Send {...propsSend} disabled={!propsSend.text} containerStyle={styles.wrapSend}>
      <SvgXml width="24" height="24" xml={svgs.ic_send} />
    </Send>
  );

  renderActions = (propsActions: Actions['props']) => {
    const titleChooseFile: string = translate('chatDetail.chooseFile');
    const titleCancel = translate('common.cancel');

    return (
      <Actions
        {...propsActions}
        containerStyle={styles.wrapActions}
        icon={() => <SvgXml width="24" height="24" xml={svgs.ic_gim} />}
        options={{
          'Chọn File': this.InputToolBarAdapter.onChooseFile,
          'Chọn ảnh': this.InputToolBarAdapter.onChooseImage,
          Huỷ: () => {
            console.log('Cancel');
          },
        }}
        optionTintColor="#222B45"
      />
    );
  };

  render() {
    return (
      <InputToolbar
        {...this.props.propsInput}
        containerStyle={styles.container}
        primaryStyle={{ alignItems: 'center' }}
        renderComposer={(propsComposer: Composer['props']) => this.renderComposer(propsComposer)}
        renderSend={(propsSend: Send['props']) => this.renderSend(propsSend)}
        renderActions={(propsActions: Actions['props']) => this.renderActions(propsActions)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // paddingVertical: 4,
    paddingRight: 16,
  },
  wrapActions: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 0,
    marginRight: 4,
    marginBottom: 0,
    // backgroundColor: 'red',
  },
  wrapSend: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  textInput: {
    color: '#222B45',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.greyBorder,
    paddingTop: 12,
    paddingHorizontal: 10,
    marginLeft: 0,
    fontSize: 16,
  },
});
