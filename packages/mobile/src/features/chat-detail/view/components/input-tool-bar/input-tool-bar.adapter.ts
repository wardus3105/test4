import ChatDetailServices from 'core/model-chat-detail/chat-detail.services';
import { HyperUtils } from 'core/common/hyper-utils';
import { processRequestRespository } from 'core/common/networking/api-helper';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
/* 
    Created by longdq
*/
import { InputToolBarComponent } from './input-tool-bar.component';

export class InputToolBarAdapter {
  private InputToolBarComponent: InputToolBarComponent;

  constructor(Component: InputToolBarComponent) {
    this.InputToolBarComponent = Component;
  }

  onChooseFile = async () => {
    console.log('test_choose_file');
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.audio,
          DocumentPicker.types.csv,
          DocumentPicker.types.zip,
          DocumentPicker.types.pdf,
          DocumentPicker.types.plainText,
          DocumentPicker.types.images,
        ],
      });
      console.log(res, 'res cua file');
      this.uploadFile([res]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('test_send_file_cancel: ' + err);
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        console.log('test_send_file_ex: ' + err);
        throw err;
      }
    }
  };

  onChooseImage = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    }).then((photos) => {
      console.log(photos, 'photos ==============');
      if (HyperUtils.isNotEmpty(photos)) {
        // for (let i = 0; i < photos.length; i++) {
        //   this.uploadFile(photos[i]);
        // }
        this.uploadFile(photos);
      }
    });
  };

  uploadFile = (files: any) => {
    const { roomId } = this.InputToolBarComponent.props;
    let formData = new FormData();
    formData.append('chatId', roomId);
    formData.append('fileId', HyperUtils.genRandomID(16));
    // formData.append('files', files);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', {
        uri: files[i].path === undefined ? files[i].uri : files[i].path,
        type: files[i].mime === undefined ? files[i].type : files[i].mime,
        name: files[i].uri || 'hyperlogy',
      });
    }

    // if (replyData && replyData.itemMessage && replyData.itemMessage._id) {
    // formData.append('replyId', replyData.itemMessage._id);
    // }
    console.log('test_form_data: ', formData);
    processRequestRespository(ChatDetailServices.getInstance().uploadFile(formData));
  };
}
