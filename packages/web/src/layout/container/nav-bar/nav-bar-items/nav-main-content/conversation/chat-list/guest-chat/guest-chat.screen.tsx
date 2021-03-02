import React, { useRef } from 'react';
import CircleAvatarScreen from '../../../../../../../../libraries/Features/circle-avtar/circle-avatar.screen';
import MainPopupScreen from '../../../../../../../../libraries/Features/popup/main-popup/main-popup.screen';
import DetailPopupScreen from '../../../../../../../../libraries/Features/popup/detail-popup/detail-popup.screen';
import './guest-chat.scss';
import GuestChatAdapter from './guest-chat.adapter';
import { IGuestChat } from './guest-chat.props';
import { Picker } from 'emoji-mart'
import { IconShareArrowLeftLine, IconSlidesSquare, IconSmileCircle } from '../../../../../../../../libraries/Icons/icon.screen';
import useOutsideClick from '../../../../../../../../libraries/Hooks/useOutsideClick';


function GuestChatScreen(props: IGuestChat) {
    const ref: any = useRef<HTMLInputElement | null>(null)

    const {
        isVisibleReaction, setVisibleReaction
    } = GuestChatAdapter(props)

    useOutsideClick(ref, () => {
        setVisibleReaction(false);
    });

    const { user, children } = props;

    const {
        redirectToDetailUser,
        setResponMess,
        copyText,
        addReaction
    } = GuestChatAdapter(props);


    const listEles = [
        {
            onClick: setResponMess,
            icon: <IconShareArrowLeftLine></IconShareArrowLeftLine>,
            text: "Trả lời"
        },
        {
            onClick: copyText,
            icon: <IconSlidesSquare></IconSlidesSquare>,
            text: "Sao chép"
        }
    ];

    const eleDetailPopup = (onClosePopup: any) => (<DetailPopupScreen
        listEles={listEles}
        onClosePopup={onClosePopup}
    ></DetailPopupScreen>);

    const customReactionEmojis: any = [
        {
            name: '+1',
            short_names: ['+1'],
            text: '',
            emoticons: [],
            keywords: ['thumbsup'],
        },
        {
            name: 'thumbsdown',
            short_names: ['thumbsdown'],
            text: '',
            emoticons: [],
            keywords: ['thumbsdown'],
        },
        {
            name: 'grinning',
            short_names: ['grinning'],
            text: '',
            emoticons: [],
            keywords: ['grinning'],
        },
        {
            name: 'heart',
            short_names: ['heart'],
            text: '',
            emoticons: [],
            keywords: ['laughing', 'satisfied'],
        },
        {
            name: 'sweat_smile',
            short_names: ['sweat_smile'],
            text: '',
            emoticons: [],
            keywords: ['sweat_smile'],
        },
        {
            name: 'cry',
            short_names: ['cry'],
            text: '',
            emoticons: [],
            keywords: ['cry'],
        },
        {
            name: 'rage',
            short_names: ['rage'],
            text: '',
            emoticons: [],
            keywords: ['rage'],
        },
    ]

    const reactionDetailPopup = (onClosePopup: any) => (
        <Picker
            onSelect={addReaction}
            // style={{display: isVisibleEmojiPicker ? 'block' : 'none'}} 
            showPreview={false}
            showSkinTones={false}
            set={'facebook'}
            include={['custom']}
            custom={customReactionEmojis}
            emojiSize={32}
            emojiTooltip={true}
        />
    );

    return (
        <div ref={ref} className="guestchat-container margin-4">
            <CircleAvatarScreen
                src={user.avatar}
                class="guestchat-left img-32"
                isOnline={false}
                onClick={redirectToDetailUser}
            ></CircleAvatarScreen>
            <div className="guestchat-right margin-left-8">
                <span className="subtitle-regular margin-left-12">
                    {user.userName}
                </span>
                <div className="guestchat-maincontext">

                    {children}

                    <MainPopupScreen

                        context={reactionDetailPopup}
                        offsetY={-100} offsetX={-20}
                        customStyle={'background-neutral-midnight padding-4'}
                    >
                        <div className="guestchat-icon cursor-pointer flex-center img-24"
                            style={{ opacity: isVisibleReaction ? 1 : 0 }}>
                            <IconSmileCircle className="icon-svg--hover" onClick={() => setVisibleReaction(true)} />
                        </div>
                    </MainPopupScreen>

                    <MainPopupScreen context={eleDetailPopup}>
                        <div className="guestchat-icon cursor-pointer flex-center img-24">
                            <div className="vertical3dots"></div>
                        </div>
                    </MainPopupScreen>

                </div>
            </div>
        </div>
    )
}

export default GuestChatScreen;
