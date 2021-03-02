/* 
    Created by longdq
*/
import { CustomViewMessageComponent } from './custom-view-message.component';
import navigationService from 'routers/navigation-service';
import { ViewPhotoScreen } from 'routers/screen-name';
import { Attachment, IHyperMessage } from 'core/common/types/message';

export class CustomViewMessageAdapter {
  private CustomViewMessageComponent: CustomViewMessageComponent;

  constructor(Component: CustomViewMessageComponent) {
    this.CustomViewMessageComponent = Component;
  }

  goToPhotoDetail = (item: IHyperMessage) => {
    navigationService.navigate(ViewPhotoScreen, { message: item });
  };
}
