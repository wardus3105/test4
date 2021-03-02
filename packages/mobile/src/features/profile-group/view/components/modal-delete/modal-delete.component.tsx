/* 
    Created by longdq
*/

import React, { FunctionComponent as Component, PureComponent } from 'react';
import { StyleSheet, Modal } from 'react-native';
import { ModalDeleteProps } from './modal-delete.props';
import { ModalDeleteAdapter } from './modal-delete.adapter';

export class ModalDeleteComponent extends PureComponent<
  ModalDeleteProps,
  { modalVisible: boolean }
> {
  private ModalDeleteAdapter: ModalDeleteAdapter;
  constructor(props: ModalDeleteProps) {
    super(props);
    this.ModalDeleteAdapter = new ModalDeleteAdapter(this);
    this.state = {
      modalVisible: false,
    };
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  hideModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  render() {
    return (
      <Modal
        visible={this.state.modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          console.log('close');
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
