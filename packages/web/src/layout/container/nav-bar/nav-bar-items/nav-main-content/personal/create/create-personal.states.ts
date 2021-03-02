import { useState } from "react";
import { ICompanyMember } from "../../../nav-company-members/company-member/company-member.props";

function CreatePersonalStates(){
    const [title , setTitle] = useState<string>("");
    const [avatarTemp , setAvatarTemp] = useState<string>("");
    const [avatar , setAvatar] = useState<any>(null);
    const [createBy , setCreateBy] = useState<string>("");
    const [userId , setUserId] = useState<any>([]);
    const [companyMemberList, setCompanyMemberList] = useState<ICompanyMember[]>([]);
    const [textSearch, setTextSearch] = useState("");


    return {
        title , setTitle,
        avatar , setAvatar,
        avatarTemp , setAvatarTemp,
        createBy , setCreateBy,
        userId , setUserId,
        companyMemberList, setCompanyMemberList,
        textSearch, setTextSearch
    }
}

export default CreatePersonalStates;