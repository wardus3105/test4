/* 
    Created by longdq
*/

import * as React from 'react';
import { View, StyleSheet, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { ContainerComponent } from 'libraries/main/container/container.component';
import { ViewPhotoAdapter } from '../model-view-photo/view-photo.adapter';
import { ViewPhotoProps } from '../model-view-photo/view-photo.props';
import { ViewPhotoStates } from '../model-view-photo/view-photo.states';
import { HeaderTypes } from 'types/header-types';
import { Attachment, IHyperMessage } from 'core/common/types/message';
import PhotoView from 'react-native-photo-view-ex';
import { DimensionHelpers } from 'helpers/dimension-helpers';
import { AppStatusBarComponent } from 'libraries/main/container/app-status-bar/app-status-bar.component';
import { HeaderPhotoComponent } from './components/header-photo/header-photo.component';
import colors from 'res/colors';
import ImageZoom from 'react-native-image-pan-zoom';

export default class ViewPhotoContainer extends React.PureComponent<
  ViewPhotoProps,
  ViewPhotoStates
> {
  ViewPhotoAdapter: ViewPhotoAdapter;
  //Local States

  message: IHyperMessage;

  constructor(props: ViewPhotoProps) {
    super(props);
    this.ViewPhotoAdapter = new ViewPhotoAdapter(this);
    this.state = {
      path: '',
    };
    const { navigation } = this.props;
    this.message = navigation.getParam('message');
  }

  componentDidMount = () => {
    this.setState({
      path: this.message && this.message.attachment && this.message.attachment[0].path,
    });
  };

  renderItem = (item: Attachment) => {
    return (
      <View style={styles.wrapItem}>
        <TouchableOpacity
          onPress={() =>
            this.setState({
              path: item && item.path,
            })
          }
        >
          <Image
            source={{
              uri: `http://172.16.20.50:31001/preview/${item.path}`,
            }}
            style={styles.itemImg}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppStatusBarComponent containerStyles={{ backgroundColor: colors.txtColor }} />
        <HeaderPhotoComponent userInfo={this.message && this.message.user} />
        <View style={styles.container}>
          <View
            style={{
              width: '100%',
              height: DimensionHelpers.height - 100,
            }}
          >
            <ImageZoom
              cropWidth={DimensionHelpers.width}
              cropHeight={DimensionHelpers.height - 150}
              imageWidth={DimensionHelpers.width}
              imageHeight={375}
              style={{}}
            >
              <Image
                source={{
                  uri: `http://172.16.20.50:31001/preview/${this.state.path}`,
                }}
                style={styles.img}
              />
            </ImageZoom>
          </View>
          {this.message.attachment && this.message.attachment.length > 1 ? (
            <View style={styles.wrapList}>
              <FlatList
                data={this.message.attachment}
                renderItem={({ item }) => this.renderItem(item)}
                horizontal
              />
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.txtColor,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingBottom: 12,
  },
  img: {
    width: '100%',
    height: 375,
    resizeMode: 'contain',
  },
  wrapList: {
    height: 64,
    width: '100%',
    marginVertical: 12,
    position: 'absolute',
    bottom: 0,
  },
  wrapItem: {
    width: 64,
    height: 64,
    backgroundColor: '#fff',
    marginLeft: 8,
    borderRadius: 8,
  },
  itemImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
