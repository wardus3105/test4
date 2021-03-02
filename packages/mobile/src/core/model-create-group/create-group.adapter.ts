/* 
    Created by longdq
*/

import { processRequestRespository } from 'core/common/networking/api-helper';
import EventBus, { EventBusName } from 'core/common/event-bus';
import { hideLoading, showLoading } from 'libraries/loading/loading-modal';
import NavigationService from 'routers/navigation-service';
import { User } from 'core/common/types/user';
import { itemDataCheck } from '../../features/create-group/view/components/search-list-user/item-list-user/item-list-user.component';
import CreateGroupContainer from '../../features/create-group/view/create-group.screen';
import CreateGroupServices from './create-group.services';

export class CreateGroupAdapter {
  CreateGroupContainer: CreateGroupContainer;
  constructor(container: CreateGroupContainer) {
    this.CreateGroupContainer = container;
  }

  onRefresh = () => {
    this.CreateGroupContainer.page = 1;
    this.CreateGroupContainer.setState({
      dataSearchUser: [],
    });
    this.searchUser();
  };

  onEndReached = () => {
    console.log('test_onEndReached');
    const { dataSearchUser } = this.CreateGroupContainer.state;
    const { loading } = this.CreateGroupContainer.state;
    let { page, ITEM_PAGE } = this.CreateGroupContainer;
    if (loading || dataSearchUser.length < page * ITEM_PAGE) return;
    this.CreateGroupContainer.page += 1;
    this.searchUser();
    //Call url with new page
  };

  setTxtSearch = (txt: string) => {
    this.CreateGroupContainer.setState(
      {
        txt: txt,
        dataSearchUser: [],
      },
      () => {
        this.searchUser();
      }
    );
  };

  searchUser = () => {
    const text = this.CreateGroupContainer.state.txt;
    const { page, ITEM_PAGE } = this.CreateGroupContainer;
    showLoading();
    this.CreateGroupContainer.setState({
      loading: true,
    });
    processRequestRespository(
      CreateGroupServices.getInstance().searchUser(text, ITEM_PAGE, page),
      this.searchUserSuccess
    );
  };
  searchUserSuccess = (res: User[]) => {
    this.CreateGroupContainer.setState({
      loading: false,
    });
    hideLoading();
    this.CreateGroupContainer.setState({
      dataSearchUser: [...this.CreateGroupContainer.state.dataSearchUser, ...res],
    });
  };

  // searchUser = (text: string) => {
  //   showLoading();
  //   processRequestRespository(
  //     CreateGroupServices.getInstance().searchUser(text),
  //     this.searchUserSuccess
  //   );
  // };
  // searchUserSuccess = (res: User[]) => {
  //   hideLoading();
  //   this.CreateGroupContainer.setState({
  //     dataSearchUser: res,
  //   });
  // };

  setSateDataCheck = (data: itemDataCheck[]) => {
    this.CreateGroupContainer.setState({
      dataUserCheck: data,
    });
  };

  addToDataCheck = (item: itemDataCheck) => {
    let data = this.CreateGroupContainer.state.dataUserCheck;
    let isAdd = true;
    if (data && data.length > 0) {
      const id = item && item.item && item.item.id;
      data.map((element: itemDataCheck) => {
        if (element && element.item && element.item.id === id) {
          isAdd = false;
        }
      });
      if (isAdd == true) {
        this.CreateGroupContainer.setState({
          dataUserCheck: [item, ...this.CreateGroupContainer.state.dataUserCheck],
        });
      } else {
        return;
      }
    } else {
      this.CreateGroupContainer.setState({
        dataUserCheck: [item, ...this.CreateGroupContainer.state.dataUserCheck],
      });
    }
  };

  removeUserCheck = (item: itemDataCheck) => {
    const data = this.CreateGroupContainer.state.dataUserCheck;
    const id = item && item.item && item.item.id;
    let newData = data.filter((e: itemDataCheck) => {
      return e && e.item && e.item.id !== id;
    });
    this.CreateGroupContainer.setState({
      dataUserCheck: [...newData],
    });
  };

  onCreateGr = () => {
    let listIdUser: string[] = [];
    const data = this.CreateGroupContainer.state.dataUserCheck;
    if (data && data.length > 0) {
      data.map((e: itemDataCheck) => {
        const id = e && e.item && e.item.id;
        listIdUser.push(id);
      });
      const nameGr = this.CreateGroupContainer.state.nameGr;
      if (!nameGr) {
        this.CreateGroupContainer.setState({
          emptyNameGr: true,
        });
        return;
      }
      const dataPost = {
        title: nameGr,
        members: listIdUser,
      };
      showLoading();
      processRequestRespository(
        CreateGroupServices.getInstance().onCreateGr(dataPost),
        this.createGrSuccess
      );
    }
  };

  onChangeText = (txt: string) => {
    if (txt) {
      this.CreateGroupContainer.setState({
        emptyNameGr: false,
      });
    }
    this.CreateGroupContainer.setState({
      nameGr: txt,
    });
  };

  createGrSuccess = (res: any) => {
    hideLoading();
    if (res) {
      NavigationService.popMany(2);
      EventBus.getInstance().post({
        type: EventBusName.RELOAD_LIST_CHAT,
        payload: 'RELOAD_LIST_CHAT',
      });
    }
  };
}
