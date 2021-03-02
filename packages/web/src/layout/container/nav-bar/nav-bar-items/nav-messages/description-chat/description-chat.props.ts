export interface IDescriptionChatComp{
    descriptionChat: IDescriptionChat,
    activedDescriptionChat:any,
    onClick:any
}

export interface IDescriptionChat{
    id: string,
    avatar: string,
    title: string,
    slogan: string,
    description: string
    status: string,
    type: string,
    createdBy: string,
    createdAt: string,
    updated_at: string,
    lastMessage: string
}

interface IChat{
    message: string,
    messageType: string,
    messageStatus: string
    userId: string,
    createdAt: string,
    user: IUser
}

interface IUser{
    userName:string,
    avatar: string,
    status: string
}
