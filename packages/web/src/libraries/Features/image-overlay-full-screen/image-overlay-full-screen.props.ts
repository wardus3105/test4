export interface IImageOverlay {
    close:any,
    miniImageList: IMiniImage[],
    mainMiniImage: IMiniImage
}

export interface IMiniImage{
    index:number,
    author: string,
    srcImage: string,
    id?:string,
    name?:string

}