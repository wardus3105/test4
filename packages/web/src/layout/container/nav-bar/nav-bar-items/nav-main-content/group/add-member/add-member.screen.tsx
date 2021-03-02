import React from 'react';
import CircleAvatarScreen from '../../../../../../../libraries/Features/circle-avtar/circle-avatar.screen';
import CustomButtonScreen from '../../../../../../../libraries/Features/custom-button/custom-button.screen';
import CustomInputScreen from '../../../../../../../libraries/Features/custom-input/custom-input.screen';
import { SrcSearchLoupe } from '../../../../../../../libraries/Icons/icon-src';
import AddMemberAdapter from './add-member.adapter';
import "./add-member.scss";

const styleCustomInput = {
    backgroundImage:`url('${ SrcSearchLoupe }')`,
    backgroundPosition:'3% 50%',
    padding:'12px 20px 12px 40px',
    borderRadius:'0.7rem',
    fontSize:'1rem',
}

function AddMemberScreen() {
    const {
        selectedUserList,
        hasFooter,
        setSelectedUserByCheckbox,
        setSelectedUser,
        removeSelectedUser
    } = AddMemberAdapter()

    return (
        <div className={ "addmember-container " + ( hasFooter ? "addmember-container--hasfooter" : "" ) }>
            <div className={ "addmember-selectedmember " + ( hasFooter ? " addmember-selectedmember--hasfooter" : "" ) } >
                <CustomInputScreen style={ styleCustomInput } hasClearText={ true } placeHolder="Nhập tên người cần tìm kiếm" class="" isMultiline={ false } isTextArea={ false }></CustomInputScreen>

                <div className="addmember-selectedmember-main">
                    <div className="bodycreategroup-main-body-selecteduserpanel" onClick={ () => { setSelectedUser(1) } }>
                        <CircleAvatarScreen 
                            src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                            isOnline={ true }
                            class="img-32"
                            hasCursor={ true }
                        ></CircleAvatarScreen>
                        <p>Trung Đức</p>
                        <input type="checkbox" name="1" className="bodycreategroup-main-body-checkbox" onChange={ setSelectedUserByCheckbox } checked={ selectedUserList.some((id: number) => id === 1) } ></input>
                    </div>
                    <div className="bodycreategroup-main-body-selecteduserpanel" onClick={ () => { setSelectedUser(1) } }>
                        <CircleAvatarScreen 
                            src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                            isOnline={ true }
                            class="img-32"
                            hasCursor={ true }
                        ></CircleAvatarScreen>
                        <p>Trung Đức</p>
                        <input type="checkbox" name="1" className="bodycreategroup-main-body-checkbox" onChange={ setSelectedUserByCheckbox } checked={ selectedUserList.some((id: number) => id === 1) } ></input>
                    </div>
                  <div className="bodycreategroup-main-body-selecteduserpanel" onClick={ () => { setSelectedUser(1) } }>
                        <CircleAvatarScreen 
                            src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                            isOnline={ true }
                            class="img-32"
                            hasCursor={ true }
                        ></CircleAvatarScreen>
                        <p>Trung Đức</p>
                        <input type="checkbox" name="1" className="bodycreategroup-main-body-checkbox" onChange={ setSelectedUserByCheckbox } checked={ selectedUserList.some((id: number) => id === 1) } ></input>
                    </div>
                  <div className="bodycreategroup-main-body-selecteduserpanel" onClick={ () => { setSelectedUser(1) } }>
                        <CircleAvatarScreen 
                            src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                            isOnline={ true }
                            class="img-32"
                            hasCursor={ true }
                        ></CircleAvatarScreen>
                        <p>Trung Đức</p>
                        <input type="checkbox" name="1" className="bodycreategroup-main-body-checkbox" onChange={ setSelectedUserByCheckbox } checked={ selectedUserList.some((id: number) => id === 1) } ></input>
                    </div>
                  <div className="bodycreategroup-main-body-selecteduserpanel" onClick={ () => { setSelectedUser(1) } }>
                        <CircleAvatarScreen 
                            src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                            isOnline={ true }
                            class="img-32"
                            hasCursor={ true }
                        ></CircleAvatarScreen>
                        <p>Trung Đức</p>
                        <input type="checkbox" name="1" className="bodycreategroup-main-body-checkbox" onChange={ setSelectedUserByCheckbox } checked={ selectedUserList.some((id: number) => id === 1) } ></input>
                    </div>
                  <div className="bodycreategroup-main-body-selecteduserpanel" onClick={ () => { setSelectedUser(1) } }>
                        <CircleAvatarScreen 
                            src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                            isOnline={ true }
                            class="img-32"
                            hasCursor={ true }
                        ></CircleAvatarScreen>
                        <p>Trung Đức</p>
                        <input type="checkbox" name="1" className="bodycreategroup-main-body-checkbox" onChange={ setSelectedUserByCheckbox } checked={ selectedUserList.some((id: number) => id === 1) } ></input>
                    </div>
                  <div className="bodycreategroup-main-body-selecteduserpanel" onClick={ () => { setSelectedUser(1) } }>
                        <CircleAvatarScreen 
                            src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                            isOnline={ true }
                            class="img-32"
                            hasCursor={ true }
                        ></CircleAvatarScreen>
                        <p>Trung Đức</p>
                        <input type="checkbox" name="1" className="bodycreategroup-main-body-checkbox" onChange={ setSelectedUserByCheckbox } checked={ selectedUserList.some((id: number) => id === 1) } ></input>
                    </div>
                  <div className="bodycreategroup-main-body-selecteduserpanel" onClick={ () => { setSelectedUser(1) } }>
                        <CircleAvatarScreen 
                            src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                            isOnline={ true }
                            class="img-32"
                            hasCursor={ true }
                        ></CircleAvatarScreen>
                        <p>Trung Đức</p>
                        <input type="checkbox" name="1" className="bodycreategroup-main-body-checkbox" onChange={ setSelectedUserByCheckbox } checked={ selectedUserList.some((id: number) => id === 1) } ></input>
                    </div>
                  <div className="bodycreategroup-main-body-selecteduserpanel" onClick={ () => { setSelectedUser(1) } }>
                        <CircleAvatarScreen 
                            src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                            isOnline={ true }
                            class="img-32"
                            hasCursor={ true }
                        ></CircleAvatarScreen>
                        <p>Trung Đức</p>
                        <input type="checkbox" name="1" className="bodycreategroup-main-body-checkbox" onChange={ setSelectedUserByCheckbox } checked={ selectedUserList.some((id: number) => id === 1) } ></input>
                    </div>
                  <div className="bodycreategroup-main-body-selecteduserpanel" onClick={ () => { setSelectedUser(1) } }>
                        <CircleAvatarScreen 
                            src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                            isOnline={ true }
                            class="img-32"
                            hasCursor={ true }
                        ></CircleAvatarScreen>
                        <p>Trung Đức</p>
                        <input type="checkbox" name="1" className="bodycreategroup-main-body-checkbox" onChange={ setSelectedUserByCheckbox } checked={ selectedUserList.some((id: number) => id === 1) } ></input>
                    </div>
                  <div className="bodycreategroup-main-body-selecteduserpanel" onClick={ () => { setSelectedUser(1) } }>
                        <CircleAvatarScreen 
                            src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                            isOnline={ true }
                            class="img-32"
                            hasCursor={ true }
                        ></CircleAvatarScreen>
                        <p>Trung Đức</p>
                        <input type="checkbox" name="1" className="bodycreategroup-main-body-checkbox" onChange={ setSelectedUserByCheckbox } checked={ selectedUserList.some((id: number) => id === 1) } ></input>
                    </div>
                  <div className="bodycreategroup-main-body-selecteduserpanel" onClick={ () => { setSelectedUser(1) } }>
                        <CircleAvatarScreen 
                            src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                            isOnline={ true }
                            class="img-32"
                            hasCursor={ true }
                        ></CircleAvatarScreen>
                        <p>Trung Đức</p>
                        <input type="checkbox" name="1" className="bodycreategroup-main-body-checkbox" onChange={ setSelectedUserByCheckbox } checked={ selectedUserList.some((id: number) => id === 1) } ></input>
                    </div>
                  <div className="bodycreategroup-main-body-selecteduserpanel" onClick={ () => { setSelectedUser(1) } }>
                        <CircleAvatarScreen 
                            src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                            isOnline={ true }
                            class="img-32"
                            hasCursor={ true }
                        ></CircleAvatarScreen>
                        <p>Trung Đức</p>
                        <input type="checkbox" name="1" className="bodycreategroup-main-body-checkbox" onChange={ setSelectedUserByCheckbox } checked={ selectedUserList.some((id: number) => id === 1) } ></input>
                    </div>
                  <div className="bodycreategroup-main-body-selecteduserpanel" onClick={ () => { setSelectedUser(1) } }>
                        <CircleAvatarScreen 
                            src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                            isOnline={ true }
                            class="img-32"
                            hasCursor={ true }
                        ></CircleAvatarScreen>
                        <p>Trung Đức</p>
                        <input type="checkbox" name="1" className="bodycreategroup-main-body-checkbox" onChange={ setSelectedUserByCheckbox } checked={ selectedUserList.some((id: number) => id === 1) } ></input>
                    </div>
                  <div className="bodycreategroup-main-body-selecteduserpanel" onClick={ () => { setSelectedUser(1) } }>
                        <CircleAvatarScreen 
                            src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                            isOnline={ true }
                            class="img-32"
                            hasCursor={ true }
                        ></CircleAvatarScreen>
                        <p>Trung Đức</p>
                        <input type="checkbox" name="1" className="bodycreategroup-main-body-checkbox" onChange={ setSelectedUserByCheckbox } checked={ selectedUserList.some((id: number) => id === 1) } ></input>
                    </div>

                </div>
            </div>
            {
                hasFooter && (
                    <div className="addmember-footer">
                        <div className="addmember-footer-selectedmember">
                            {
                                selectedUserList.map((id:number , index: number) => <CircleAvatarScreen src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg"
                                    isOnline={ false }
                                    canRomove={ true }
                                    class=""
                                    width="42px"
                                    height="42px"
                                    onRemove={ () =>{ removeSelectedUser(id)}}
                                    key={ index }
                                ></CircleAvatarScreen>)
                            }
                        </div>
                        <CustomButtonScreen text="Thêm" onClick={ null } class="primary"></CustomButtonScreen>
                    </div>
                )
            }
        </div>
    );
}

export default AddMemberScreen;
