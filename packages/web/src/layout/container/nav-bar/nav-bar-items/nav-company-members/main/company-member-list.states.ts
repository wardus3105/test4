import { useState } from "react";
import { ICompanyMember } from "../company-member/company-member.props";

function CompanyMemberListStates(){
    const [query , setQuery] = useState<string>("");
    const [searchCompanyMemberList, setSearchCompanyMemberList] = useState<ICompanyMember[]>([]);
    const [hasSearch, setHasSearch] = useState<boolean>(false);

    return {
        query , setQuery,
        searchCompanyMemberList, setSearchCompanyMemberList,
        hasSearch, setHasSearch,
    }
}

export default CompanyMemberListStates;
