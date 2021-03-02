import React, { useRef } from 'react';
import CustomInputScreen from '../../../../../../../../libraries/Features/custom-input/custom-input.screen';
import UploadImageScreen from '../upload-image/upload-image.screen';
import './chat-input.scss';
import ChatInputAdapter from './chat-input.adapter';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import useOutsideClick from '../../../../../../../../libraries/Hooks/useOutsideClick';
import { IconDeleteDisabled, IconGimFile, IconSendMessage, IconSmileCircle } from '../../../../../../../../libraries/Icons/icon.screen';


const styleCustomInput = {
    // backgroundImage:`url('${ iconSmileCircle }')`,
    backgroundPosition:'99% 50%',
    padding:'10px 35px 10px 10px',
    borderRadius:'8px',
    fontSize:'14px',
}

function ChatInputScreen(props: any){
    const ref: any = useRef<HTMLInputElement | null>(null)

    useOutsideClick(ref, () => {
        setVisibleEmojiPicker(false);
    });

    const {
        respondedMess,
        classNameChatInput,
        showContextRespondedMess,
        hasUploadImages,
        pathFileList,
        handleFileSelect,
        removePathFile,
        setIsMultilineText,
        message , setMessage,
        sendChat,
        setIsFocused,
        addEmoji,
        isVisibleEmojiPicker, setVisibleEmojiPicker,
        editedMess , setEditedMess
    } = ChatInputAdapter(props)
    
    return (
        <div className={ classNameChatInput() } id="chat-input">
            {
                respondedMess && (
                    <div className="chatinput-responseMess">
                        <div>
                            <span className="app-mainfont">
                                Trả lời 
                                <span className="chatinput-responseMess-username"> { respondedMess.userName ? respondedMess.userName : "chính bạn"  } </span>
                            </span>
                            <p className="chatinput-responseMess-context  text-overflow-ellipsis app-mainfont">
                                { showContextRespondedMess() }
                            </p>
                        </div>
                        <IconDeleteDisabled onClick={ () => { props.setRespondedMess() } } className="chatinput-responseMess-icon-cancel cursor-pointer"></IconDeleteDisabled>
                    </div>
                )
            }
            {
                hasUploadImages && (
                    <div className="chatinput-uploadimages">
                        {
                            pathFileList.map((pathFile: string , index: number) => <UploadImageScreen key={ index } pathFile={ pathFile } class="" removePathFile={ removePathFile }></UploadImageScreen>)
                        }
                    </div>
                )
            }
            <div className="chatinput-main">
                {
                    editedMess ? (
                        <IconDeleteDisabled onClick={ () => { setEditedMess() } } className="cursor-pointer icon-svg--hover" ></IconDeleteDisabled>
                    ) : (
                        <IconGimFile onClick={ handleFileSelect } className="cursor-pointer icon-svg--hover" ></IconGimFile>
                    )
                }

                <CustomInputScreen 
                    setValue={ setMessage } 
                    value={ message } 
                    placeHolder="Nhập nội dung bình luận" 
                    class="" 
                    style={ styleCustomInput } 
                    setIsMultiline={ setIsMultilineText } 
                    isMultiline={ true } 
                    isTextArea={ true }
                    setIsFocused={ setIsFocused }
                ></CustomInputScreen>
                
                <div ref={ref} className="icon-emoji">
                    <Picker 
                        onSelect={addEmoji} 
                        style={{display: isVisibleEmojiPicker ? 'block' : 'none'}} 
                        showPreview={false}
                        showSkinTones={false}
                        set={'facebook'}
                    />
                    <IconSmileCircle className="icon-svg--hover" onClick={() => setVisibleEmojiPicker(true)} />
                </div>
                
                <IconSendMessage onClick={ sendChat } className="cursor-pointer icon-svg--hover" ></IconSendMessage>
            </div>
        </div>
    )
}

export default ChatInputScreen;




