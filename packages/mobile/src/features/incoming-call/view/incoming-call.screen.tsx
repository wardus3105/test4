/* 
    Created by longdq
*/

import * as React from 'react';
import { ImageBackground, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { getStatusBarHeight } from '../../../helpers/layout-helpers';
import colors from '../../../res/colors';
import { KindOfMsg } from '../../../core/common/types/message';
import { User } from '../../../core/common/types/user';
import { IncomingCallAdapter } from 'core/model-incoming-call/incoming-call.adapter';
import { IncomingCallProps } from 'core/model-incoming-call/incoming-call.props';
import { IncomingCallStates } from 'core/model-incoming-call/incoming-call.states';
import { IncomingHeaderUserComponent } from './components/incoming-header-user/incoming-header-user.component';
import { IncommingFooterComponent } from './components/incomming-footer/incomming-footer.component';
import { OutgoingFooterComponent } from './components/outgoing-footer/outgoing-footer.component';
import { ChatInfoParams } from 'core/model-chat-detail/chat-detail.props';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

export default class IncomingCallContainer extends React.PureComponent<
  IncomingCallProps,
  IncomingCallStates
> {
  IncomingCallAdapter: IncomingCallAdapter;
  userInfo: User;
  typeCall: KindOfMsg;
  chatInfo: ChatInfoParams;
  timeStart: string;
  //Local States
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  constructor(props: IncomingCallProps) {
    super(props);
    this.IncomingCallAdapter = new IncomingCallAdapter(this);
    this.state = {};
    
    this.navigation = props.navigation
    this.userInfo = this.navigation.getParam('user');
    this.typeCall = this.navigation.getParam('type') ;
    this.chatInfo = this.navigation.getParam('chatInfo') || {};
    this.timeStart = this.navigation.getParam('timeStart') || 0;

    console.log('test_video_call_user: ', this.userInfo, '__',this.typeCall);
  }

  componentDidMount() {
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(colors.black);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor(colors.white);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={
            {
              // uri: 'https://wallpapercave.com/wp/wp5489131.jpg',
            }
          }
          style={styles.imgBg}
        >
          <View style={styles.wrapContent}>
            {Platform.OS === 'ios' && <View style={styles.statusBar} />}
            {/* Header user */}
            <IncomingHeaderUserComponent
              onBack={this.IncomingCallAdapter.goBack}
              userInfo={this.userInfo}
              typeCall={this.typeCall}
            />
          </View>
          {/* Footer */}
          {this.typeCall === KindOfMsg.TYPE_VIDEO_CALL_OUTGOING ? (
            <OutgoingFooterComponent onFinishCall={this.IncomingCallAdapter.onFinishCall} />
          ) : (
            <IncommingFooterComponent
              onCancel={this.IncomingCallAdapter.onCancelCall}
              onAnswer={this.IncomingCallAdapter.updateStatusVideoCall}
            />
          )}
        </ImageBackground>
      </View>
    );
  }
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBg: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.black,
    opacity: 0.9,
  },
  wrapContent: {
    flex: 1,
    alignItems: 'center',
  },
  statusBar: {
    width: '100%',
    height: getStatusBarHeight(),
  },
});
