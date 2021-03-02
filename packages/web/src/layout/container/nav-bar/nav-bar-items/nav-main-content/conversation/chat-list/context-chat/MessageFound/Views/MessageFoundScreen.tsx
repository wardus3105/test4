import React, { useEffect, useState } from 'react';
import CircleAvatarScreen from '../../../../../../../../../../libraries/Features/circle-avtar/circle-avatar.screen';
import './MessageFoundScreen.css';

function MessageFoundScreen(props : any){
    const [messageList , setMessageList] = useState<string[]>([]);

    const { query } = props;
    const messages = "Em báo cáo công việc:\n-Họp cùng team mobile mô tả luồng và chi tiết các tính năng app cha..\n- Họp cùng team mobile mô tả luồng và chi tiết các tính năng app cha..\nNgày:em làm code";

    useEffect(() =>{
        let temp = messages.split("\n");
        setMessageList(temp);
    },[])

    const createMarkup = (html: any) => {
        return { __html: html }
      }

    return (
        <div className="messagefound-container">
            <CircleAvatarScreen
                src="https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg"
                width="60px" 
                height="60px"
                class=""
                isOnline={ false }
            ></CircleAvatarScreen>
            <div className="messagefound-right">
                <h4>Chi Chi</h4>
                {
                    messageList.map((message:string) =>{
                        const newResult = message.replace(
                            new RegExp(query, 'gi'),
                            match =>
                              `<mark>${match}</mark>`
                        )
                        return <p dangerouslySetInnerHTML={ createMarkup(newResult) }></p>
                    })
                }
            </div>
        </div>
    )
}

export default MessageFoundScreen;