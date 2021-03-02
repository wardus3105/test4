import React from 'react';
import { IMiniImage } from '../../../../../../../../../libraries/Features/image-overlay-full-screen/image-overlay-full-screen.props';
import getApiUrl from '../../../../../../../../../libraries/Functions/get-api-url';
import ImageContextChatAdapter from './image-context-chat.adapter';
import { IImageContextChat } from './image-context-chat.props';
import './image-context-chat.scss';

function ImageContextChatScreen(props: IImageContextChat) {
    const list = ImageContextChatAdapter(props) || [];
    const showImages = () => {
        return list.map((image: any, index: number) => {
            let itemImage: IMiniImage;
            if (props.listImage?.length > 0) {
                props.listImage.map((item: any, index2: number) => {
                    if (image.name === item.name) {
                        itemImage = item;
                        itemImage.index = index2;
                    }
                })
            }
            const url = getApiUrl(image.name);
            return <img src={url} className="cursor-pointer" alt="" key={ index } onClick={() => { props.toggleOverlay(itemImage) }}  ></img>
        })
    }


    return (
        <div className={"imagechat-container " + (props.isCurrent ? "imagechat-current" : "")}>
            {
                showImages()
            }
        </div>
    )
}

export default ImageContextChatScreen;