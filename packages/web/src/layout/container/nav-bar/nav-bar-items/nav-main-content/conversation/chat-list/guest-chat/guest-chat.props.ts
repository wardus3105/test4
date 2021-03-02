import { IUser } from "../main/chat-list.props";

export interface IGuestChat{
    roomId:string,
    user: IUser,
    type: string,
    context: string,
    children: React.ReactNode,
    setRespondedMess:any,
    setChatList?: any,
    message: any
}