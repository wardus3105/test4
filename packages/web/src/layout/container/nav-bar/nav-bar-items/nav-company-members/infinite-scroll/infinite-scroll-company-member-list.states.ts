import { useState } from "react";
import { ICompanyMember } from "../company-member/company-member.props";

function InfiniteScrollCompanyMemberListStates(){
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [companyMemberList, setCompanyMemberList] = useState<ICompanyMember[]>([]);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    return {
        page, setPage,
        companyMemberList, setCompanyMemberList,
        isUpdating, setIsUpdating,
        totalPages, setTotalPages
    }
}

export default InfiniteScrollCompanyMemberListStates;
