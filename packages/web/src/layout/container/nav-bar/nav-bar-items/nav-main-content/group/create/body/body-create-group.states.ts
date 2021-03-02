import { useState } from "react";
import { ICompanyMember } from "../../../../nav-company-members/company-member/company-member.props";


function BodyCreateGroupStates(){

    const [hasFooter , setHasFooter] = useState<boolean>(false);
    const [companyMemList , setCompanyMemList] = useState<ICompanyMember[]>([]);


    return {
        hasFooter , setHasFooter,
        companyMemList , setCompanyMemList
    }
}

export default BodyCreateGroupStates;