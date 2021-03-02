import React from 'react';
import { IconDownloadSaveUpload, IconGimFile, IconLink, IconShareArrowSquare } from '../../../../../../../../../libraries/Icons/icon.screen';
import { IFileChat } from './file-context-chat.props';
import './file-context-chat.scss';

function FileContextChatScreen(props : IFileChat){

    const redirectWeb = (link: string) =>{
        window.open(
            link,
            '_blank' // <- This is what makes it open in a new window.
          );
    }

    // useEffect(() =>{
    //     (() => {
    //         getLinkPreview('https://www.youtube.com/watch?v=MejbOFk7H6c')
    //         .then((data) => console.debug(data));
    //     })();
    // })

    return (
        <div className="filechat-container">
            {
                props.isFile ? (
                    <IconGimFile className="filechat-container-image cursor-pointer icon-svg--hover"></IconGimFile>
                ) : (
                    <IconLink className="filechat-container-image cursor-pointer icon-svg--hover"></IconLink>
                )
            }
            <div className="filechat-maincontext">
                <div className="filechat-context">
                    <h5 className="width-200 text-overflow-ellipsis">
                        <a href={ props.context } target="_blank" rel="noreferrer">
                            { props.context }
                        </a>
                    </h5>
                    <div className="app-mainfont">
                        <h5>{ props.fileSize}</h5>
                    </div>
                </div>
                <div className="filechat-iconbutton">
                    {
                        props.isFile ? (
                            <IconDownloadSaveUpload className="cursor-pointer" onClick={ () =>{ redirectWeb(props.context)} }></IconDownloadSaveUpload>
                        ) : (
                            <IconShareArrowSquare className="cursor-pointer" onClick={ () =>{ redirectWeb(props.context)} }></IconShareArrowSquare>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

export default FileContextChatScreen;