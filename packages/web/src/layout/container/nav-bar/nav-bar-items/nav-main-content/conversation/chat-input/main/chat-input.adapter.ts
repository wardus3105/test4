import { ENUM_KIND_OF_ATTACHMENT } from './../../../../../../../../libraries/Enum/attachment';
import { ENUM_KIND_OF_STATUS_CODE } from '../../../../../../../../libraries/Enum/status-code';

import { useEffect } from "react";
import { ENUM_KIND_OF_MESSAGE } from "../../../../../../../../libraries/Enum/message";
import buildFileSelector from "../../../../../../../../libraries/Functions/build-file-selector";
import { IAttachment } from "../../main/conversation.props";
import ChatInputServices from "./chat-input.services";
import ChatInputStates from "./chat-input.states";
import useKeyDown from '../../../../../../../../libraries/Hooks/useKeyDown';
import trimChar from '../../../../../../../../libraries/Functions/trim-char';

function ChatInputAdapter(props: any) {
    const { respondedMess, setListMessage, hasUploadImages, setHasUploadImages, roomId, setRespondedMess, editedMess, setEditedMess } = props;

    const {
        pathFileList, setPathFileList,
        isMultilineText, setIsMultilineText,
        message, setMessage,
        isFocused, setIsFocused,
        file, setFile,
        isVisibleEmojiPicker, setVisibleEmojiPicker
    } = ChatInputStates()

    const pressEnterToSendChat = async (e: KeyboardEvent) => {
        if (e.keyCode === 13 && isFocused && !e.shiftKey) {
            sendChat()
        }
    }

    useKeyDown(pressEnterToSendChat);

    useEffect(() => {
        setHasUploadImages(false);
        setFile(null)
        setPathFileList([])

    }, [roomId])

    useEffect(() => {
        if (editedMess) {
            setMessage(editedMess.context)
            setVisibleEmojiPicker(false)
            setFile(null)
            setPathFileList([])
            setRespondedMess()
        }
    }, [editedMess, setMessage, setVisibleEmojiPicker, setPathFileList, setFile, setRespondedMess])

    useEffect(() => {
        if (editedMess) {
            setEditedMess((prev: any) => ({ ...prev, context: message }));
        } else {
            setEditedMess()
        }
    }, [message])

    const sendChat = async () => {
        const userId = localStorage.getItem('userId') || "";
        let messageSend: any = {
            message: '',
            messageType: '',
            messageStatus: "1",
            userId: userId,
            user: {
                userName: "Test 1",
                status: "1",
                id: userId
            },
            chatRoomId: roomId,
            createdAt: new Date(),
            attachments: []
        }
        if (message) {
            const mess = trimChar(message , "\n");
            messageSend.message = mess;
            messageSend.messageType = ENUM_KIND_OF_MESSAGE.TEXT;
            if (respondedMess) {

                const attachments = respondedMess.type === ENUM_KIND_OF_MESSAGE.ATTACHMENT ?
                                    [
                                        {
                                            name:respondedMess.context
                                        }
                                    ] : []
                messageSend = {
                    ...messageSend, parentId: respondedMess.messageId, parent: {
                        createdAt: new Date(),
                        id: respondedMess.messageId,
                        message: respondedMess.context,
                        messageStatus: "1",
                        messageType: respondedMess.type,
                        parentId: "",
                        status: "0",
                        user: { userName: respondedMess.userName },
                        attachments : attachments
                    }
                }
            }

            if (editedMess) {
                messageSend = { ...messageSend, id: editedMess.messageId }

                const response = await ChatInputServices().getInstance().editMessage(messageSend);
                if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                    setListMessage((prev: any) => prev.map((message: any) => {
                        if (message.id === editedMess.messageId) {
                            return { ...message, message: messageSend.message }
                        }
                        return message;
                    }));

                    setEditedMess()
                    setMessage("")
                }
            } else {
                const response = await ChatInputServices().getInstance().sendMessage(messageSend);
                if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                    const data = response.data.data;
                    messageSend = { ...messageSend, id: data.id };

                    setMessage("")
                    setRespondedMess()
                    setListMessage((prev: any) => [ messageSend , ...prev ]);
                }
            }
        }

        if (file) {
            let attachments: IAttachment[] = []
            const formData = new FormData();
            for (let index = 0; index < file.length; index++) {
                formData.append('fileContent', file[index]);
            }

            let response = await ChatInputServices().getInstance().sendFile(formData);

            if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                const pathFileList = response.data.data;

                for (let index = 0; index < pathFileList.length; index++) {
                    // const attachment = {
                    //     contentType: ENUM_KIND_OF_ATTACHMENT.IMAGE,
                    //     name: pathFileList[index].guid,
                    //     type: ENUM_KIND_OF_ATTACHMENT.IMAGE
                    // }
                    attachments.push({
                        contentType: ENUM_KIND_OF_ATTACHMENT.IMAGE,
                        name: pathFileList[index].guid,
                        type: ENUM_KIND_OF_ATTACHMENT.IMAGE
                    })
                }
                messageSend.messageType = ENUM_KIND_OF_MESSAGE.ATTACHMENT;
                messageSend.attachments = attachments;


                if (respondedMess) {
                    messageSend = {
                        ...messageSend, parentId: respondedMess.messageId, parent: {
                            createdAt: new Date(),
                            id: respondedMess.messageId,
                            message: respondedMess.context,
                            messageStatus: "1",
                            messageType: respondedMess.type,
                            parentId: "",
                            status: "0",
                            user: { userName: respondedMess.userName }
                        }
                    }
                }

                response = await ChatInputServices().getInstance().sendMessage(messageSend);
                if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                    const data = response.data.data;
                    messageSend = { ...messageSend, id: data.id };

                    setFile(null)
                    setPathFileList([])
                    setHasUploadImages(false)
                    setRespondedMess()

                    setListMessage((prev: any) => [ messageSend , ...prev ]);
                }
            }
        }
    }

    const cb = (pathFileListTemp: string[]) => {
        setPathFileList(pathFileListTemp);
        setHasUploadImages(true)
    }

    const fileSelector = buildFileSelector(true, cb, setFile)

    const handleFileSelect = (e: any) => {
        if (!editedMess) {
            e.preventDefault();
            fileSelector.click();
        }
    }

    const removePathFile = (pathFilez: string) => {
        const list = pathFileList.filter(item => item !== pathFilez);
        setPathFileList(list);
        if (list.length === 0) {
            setHasUploadImages(false)
        }
    }

    const showContextRespondedMess = () => {
        const { type, context } = respondedMess;
        switch (type) {
            case ENUM_KIND_OF_MESSAGE.TEXT:
                return context;
            case ENUM_KIND_OF_MESSAGE.ATTACHMENT:
                return "File";
            case ENUM_KIND_OF_MESSAGE.LINK:
                return "Link";
            default:
                return ""
        }
    }

    const classNameChatInput = () => {
        const containerClass = "chatinput-container";
        const extensionClass = "chatinput-extension";
        const hasResponseMessClass = "chatinput--hasresponseMess";
        const space = " ";
        let result = containerClass;

        if (hasUploadImages || respondedMess) {
            result += space + extensionClass + space + hasResponseMessClass
        } else {
            if (isMultilineText) {
                result += space + extensionClass
            }
        }
        return result;
    }

    const addEmoji = (event: any) => {
        let sym = event.unified.split('-')
        let codesArray: any = []
        sym.forEach((el: any) => codesArray.push('0x' + el))
        let emoji: string = String.fromCodePoint(...codesArray)
        setMessage((prev) => prev + emoji);
    }

    return {
        respondedMess,
        classNameChatInput,
        showContextRespondedMess,
        hasUploadImages,
        pathFileList,
        handleFileSelect,
        removePathFile,
        setIsMultilineText,
        message, setMessage, sendChat,
        setIsFocused, setListMessage,
        addEmoji,
        isVisibleEmojiPicker, setVisibleEmojiPicker,
        editedMess, setEditedMess
    }
}

export default ChatInputAdapter;
