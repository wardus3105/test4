import { useCallback, useEffect } from "react";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../libraries/Enum/status-code";
import debounce from "../../../../../../libraries/Functions/debounce";
import CreateGroupService from "../../nav-main-content/group/create/main/create-group.services";

import { IInfiniteScrollCompanyMemberList } from "./infinite-scroll-company-member-list.props";
import CompanyMemberListServices from "./infinite-scroll-company-member-list.services";
import InfiniteScrollCompanyMemberListStates from "./infinite-scroll-company-member-list.states";

const WAIT_INTERVAL = 1000;

function InfiniteScrollCompanyMemberListAdapter(props: IInfiniteScrollCompanyMemberList){

    const {
        page, setPage,
        companyMemberList, setCompanyMemberList,
        isUpdating, setIsUpdating,
        totalPages, setTotalPages
    } = InfiniteScrollCompanyMemberListStates();

    const { setCompanyMemList, textSearch } = props;
    
    useEffect(() => {
        const getData = async () => {
            setIsUpdating(true);

            const response = await CompanyMemberListServices().getInstance().getCompanyMemberList(page);
            if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
                setTotalPages(response.data.totalPages);
                setCompanyMemberList((prev) => [...prev, ...response.data.data]);
                if(setCompanyMemList){
                    setCompanyMemList((prev: any) => [...prev, ...response.data.data]);
                }
            }

            setIsUpdating(false);
        };
        getData();
    }, [page , setCompanyMemberList , setIsUpdating , setTotalPages , setCompanyMemList ]); 
 
    useEffect(() => {
        if (textSearch) {
            verify(textSearch);
        }
    }, [textSearch]);
 
    const verify = useCallback(
        debounce(async (textSearch: any) => {
            const response = await CreateGroupService().getInstance().getCompanyMemberListSearch(textSearch);
            if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
                setCompanyMemberList([...response.data.data.user]);
            }
         }, WAIT_INTERVAL
    ), []);
  
    return {
        companyMemberList,
        totalPages,
        page, setPage ,
        isUpdating
    }
}


export default InfiniteScrollCompanyMemberListAdapter;