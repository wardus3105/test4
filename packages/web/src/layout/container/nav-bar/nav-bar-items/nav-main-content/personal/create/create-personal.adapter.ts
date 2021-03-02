import { useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../libraries/Enum/status-code";
import CreatePersonalService from "./create-personal.services";
import CreatePersonalStates from "./create-personal.states";

const WAIT_INTERVAL = 1000;

function CreatePersonalAdapter(){
    const history = useHistory();

    const {
        companyMemberList, setCompanyMemberList, textSearch, setTextSearch
    } = CreatePersonalStates();

    const getData = async () => {
        const response = await CreatePersonalService().getInstance().getCompanyMemberList(1);
        if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
            setCompanyMemberList((prev)=>[...prev, ...response.data.data]);
        }
    };

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if (textSearch !== "") {
            verify(textSearch);
        }
    }, [textSearch]);

    const verify = useCallback(
        debounce(async (textSearch: any) => {
            const response = await CreatePersonalService().getInstance().getCompanyMemberListSearch(textSearch);
            if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
                setCompanyMemberList([...response.data.data.user]);
            }
        }, WAIT_INTERVAL
    ), []);

    const changeSearch = async (event: any) => {
        setTextSearch(event.target.value)
    }

    const createChatRoom = async (memberId: string) => {
        history.push("/g/" + memberId);
    }

    return { createChatRoom, companyMemberList, changeSearch };
}

const debounce = (func?: any, wait?: any, immediate?: any) => {
    var timeout: any;
  
    return (...args: any) => {
        var context = this;
  
        var later = () => {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
    
        var callNow = immediate && !timeout;
    
        clearTimeout(timeout);
    
        timeout = setTimeout(later, wait);
    
        if (callNow) func.apply(context, args);
    };
}

export default CreatePersonalAdapter;
