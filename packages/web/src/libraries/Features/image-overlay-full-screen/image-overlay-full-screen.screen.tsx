import React, { useEffect, useState } from 'react';
import getApiUrl from '../../Functions/get-api-url';
import useKeyDown from '../../Hooks/useKeyDown';
import { IconArrowLeft, IconArrowRight, IconDeleteDisabled, IconDownloadSaveUpload } from '../../Icons/icon.screen';
import { IMiniImage } from './image-overlay-full-screen.props';
import './image-overlay-full-screen.scss';

function ImageOverlayScreen(props: any) {
    const [amountOfMiniImages, setAmountOfMiniImages] = useState<number>(15);
    const [numPage, setNumPage] = useState<number>(1);
    const [mainImage, setMainImage] = useState<IMiniImage>({
        index: -1,
        author: "",
        srcImage: "",
        id: "",
        name: ""
    })

    const { miniImageList, mainMiniImage , close } = props;

    const closeImageOverlayByEscKey = (e: KeyboardEvent) => {
        if (e.keyCode === 27) {
            close()
        }
    }

    useKeyDown(closeImageOverlayByEscKey)

    useEffect(() => {
        setMainImage(mainMiniImage);
    }, [mainMiniImage])

    useEffect(() => {
        setAmountMiniImagesByScreen();
    }, [])

    useEffect(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 1024) {
            mainMiniImage.index > amountOfMiniImages && setNumPage(Math.floor(mainMiniImage.index / amountOfMiniImages) + 1)
        } else {
            mainMiniImage.index > amountOfMiniImages && setNumPage(Math.floor(mainMiniImage.index / amountOfMiniImages) + 1)
        }
    }, [setAmountOfMiniImages, amountOfMiniImages, setNumPage, mainMiniImage])

    useEffect(() => {
        window.addEventListener('resize', setAmountMiniImagesByScreen);

        return () => window.removeEventListener('resize', setAmountMiniImagesByScreen);
    }, [])

    const setAmountMiniImagesByScreen = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 1024) {
            setAmountOfMiniImages(5)
        } else {
            setAmountOfMiniImages(15)
        }
    }

    const setMiniImageByKeyBoardEvent = (e: KeyboardEvent) => {
        if (e.keyCode === 37) {
            setMiniImage(true)
        } else if (e.keyCode === 39) {
            setMiniImage(false)
        }
    }

    useKeyDown(setMiniImageByKeyBoardEvent)

    const setMiniImage = (isPrev: boolean) => {
        if (mainImage.index) {
            let tempindex = 0;
            if (isPrev) {
                tempindex = mainImage.index - 1;
                (tempindex > 0 && tempindex <= (numPage - 1) * amountOfMiniImages) && setNumPage(prev => prev - 1);
            } else {
                tempindex = mainImage.index + 1;
                tempindex > numPage * amountOfMiniImages && setNumPage(prev => prev + 1);
            }

            const tempMiniImage: IMiniImage = miniImageList.find((miniImage: IMiniImage) => miniImage.index === tempindex) || {
                index: -1,
                author: "",
                srcImage: "",
                name: "",
                id: ""
            };

            tempMiniImage.index !== -1 && setMainImage(tempMiniImage)
        }
    }

    return (
        <div className="imageoverlay-container">
            <h4 className="imageoverlay-nameauthor">
                {
                    mainImage.author && mainImage.author
                }
            </h4>

            <IconDeleteDisabled className="imageoverlay-cancel" onClick={ close }></IconDeleteDisabled>
            <IconDownloadSaveUpload className="imageoverlay-download"></IconDownloadSaveUpload>
            
            {
                mainImage.index > 1 && (
                    <div className="imageoverlay-leftarrow imageoverlay-arrow" onClick={() => { setMiniImage(true) }}>
                        {/* <img src={iconleftarrow} alt="" /> */}
                        <IconArrowLeft></IconArrowLeft>
                        <div></div>
                    </div>
                )
            }
            {
                mainImage.index < miniImageList[miniImageList.length - 1].index && (
                    <div className="imageoverlay-rightarrow imageoverlay-arrow" onClick={() => { setMiniImage(false) }}>
                        <IconArrowRight></IconArrowRight>
                        <div></div>
                    </div>
                )
            }

            <img alt="" className="imageoverlay-mainimage" src={mainImage.name && getApiUrl(mainImage.name)}></img>

            <div className="imageoverlay-miniimages">
                {
                    miniImageList.map((miniImage: IMiniImage, index: number) => (
                        (index + 1 > (numPage - 1) * amountOfMiniImages && index + 1 <= numPage * amountOfMiniImages) && <img alt="" src={ miniImage.name && getApiUrl(miniImage.name) } key={index} onClick={() => { setMainImage(miniImage) }} className={mainImage.index === miniImage.index ? "imageoverlay-miniimage--active" : ""}></img>
                    ))
                }
            </div>
        </div>
    );
}

export default ImageOverlayScreen;
