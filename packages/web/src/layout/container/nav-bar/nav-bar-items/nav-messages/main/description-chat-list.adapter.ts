import { useEffect , useRef , ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DescriptionChatListServices from './description-chat-list.services';
import { ENUM_KIND_OF_STATUS_CODE } from '../../../../../../libraries/Enum/status-code';
import useEventListener from '../../../../../../libraries/Hooks/useEventListener';
import { IDescriptionChat } from '../description-chat/description-chat.props';
import { URL_PATHS } from '../../../../../../helpers/networking/url-paths';


function DescriptionChatListAdapter() {
    const [query , setQuery] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [totalPages , setTotalPages] = useState<number>(0);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [hasSearch, setHasSearch] = useState<boolean>(false);
    const [descriptionChatList, setDescriptionChatList] = useState<IDescriptionChat[]>([]);
    const [searchDescriptionChatList, setSearchDescriptionChatList] = useState<IDescriptionChat[]>([]);
    const [activedDescriptionChat , setActivedDescriptionChat] = useState<string>("");

    const history = useHistory();
    const typingTimeoutRef = useRef<any>(null);
    
    useEffect(() => {
        const getData = async () => {
            if(query){
                const url = process.env.REACT_APP_IP_ADDRESS_URL + "/" + URL_PATHS.GET_COMPANYMEMBERLIST_BYQUERY;

                let formData = new FormData();
                formData.append('text', query);
                
                const response = await DescriptionChatListServices().getInstance().getDescriptionChatListByQuery(formData , url);
                if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                    setSearchDescriptionChatList(response.data.data);
                }
            } else{
                setSearchDescriptionChatList([]) 
            }
        }

        getData();
    }, [ query , setSearchDescriptionChatList ]);

    const onClick = (event: any) => {
        if(hasSearch){
            const id = event.target.id
            if(id !== "descriptionchatlist-input-index" && id !== "searchfield-container-index"){
                setHasSearch(false);
            }
        }
    }
    useEventListener('click', onClick);

    useEffect(() => {
        const getData = async () => {
            setIsUpdating(true);

            const url = process.env.REACT_APP_IP_ADDRESS_URL + "/" + URL_PATHS.GET_CONVERSATIONLIST;
            const pageSize = process.env.REACT_APP_NUM_CHAT_ITEMS_PER_PAGE;

            const response = await DescriptionChatListServices().getInstance().getDescriptionChatList(url , page , pageSize );
            if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                setTotalPages(response.data.totalPages)
                setDescriptionChatList((prev) => [...prev, ...response.data.data]);
            }

            setIsUpdating(false)
        }

        getData();
    },[page , setDescriptionChatList , setTotalPages , setIsUpdating]);

    useEffect(() => {
        const setDescriptionChatIsAcTiveByPath = () =>{
            const currentPathName = history.location.pathname;
            const arrPath = currentPathName.split("/");
            if(arrPath){
                let id = arrPath[2];
                if(arrPath.length === 4 && arrPath[2] === "detail"){
                    id = arrPath[3];
                }
                setActivedDescriptionChat(id);
            }
        }

        setDescriptionChatIsAcTiveByPath();
    },[setActivedDescriptionChat , history.location.pathname])

    useEffect(() => {
        if(!hasSearch){
            setQuery("");
        }
    },[hasSearch , setQuery])

    
    const onChange = (e: ChangeEvent<HTMLInputElement>) =>{
        if(typingTimeoutRef.current){
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() =>{
            setQuery(e.target.value);
        },1e3);
    }

    const redirectToChatDetail = (id:string) => {
        const kind = "g";
        history.push(`/${kind}/${id}`);
        setActivedDescriptionChat(id);
    };

    return {
        onChange,
        activedDescriptionChat ,
        descriptionChatList,
        totalPages,
        hasSearch, setHasSearch,
        query , setQuery,
        searchDescriptionChatList,
        page , setPage ,
        isUpdating,
        redirectToChatDetail
    }
}


export default DescriptionChatListAdapter;
