import { useEffect } from "react";
import useWindowSize  from "./useWindowSize";


export default function useScroll(page: number , setPage: any , totalPages: number , isUpdating: boolean , eleRef: any , isScrollInChat: boolean = false ) {
    const { width , height } = useWindowSize();

    const numItemsPerPage = parseInt((isScrollInChat ? process.env.REACT_APP_NUM_CHAT_ITEMS_PER_PAGE : process.env.REACT_APP_NUM_ITEMS_PER_PAGE) || "10");

    useEffect(() => {
        if(eleRef.current){
            const clientHeightItem = eleRef.current.children[0]?.clientHeight;
            const clientHeight = eleRef.current.clientHeight;

            if(clientHeight > ((page) *  clientHeightItem * numItemsPerPage + clientHeightItem * 2)){
                setPage((prev:number) => prev + 1);
            }
        }
    },[width , height , page , setPage , numItemsPerPage , eleRef])

    const handleScroll = (event: any) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

        if(isScrollInChat){
            setTimeout(() => {
                if (scrollTop === 0 && page < totalPages && !isUpdating ) {
                    setPage((prev:number) => prev + 1);
                }
            } , 1e3)

        } else{
            const scrollHeight2 = (scrollHeight / (page * numItemsPerPage + 2)) * (page * numItemsPerPage)
            if (scrollHeight2 <= (clientHeight + scrollTop) && page < totalPages && !isUpdating) {
                setPage((prev:number) => prev + 1);
            }
        }
    };

    return {
        handleScroll
    }
}