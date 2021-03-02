import { useState } from "react";

function AddMemberStates(){
    const [selectedUserList , setSelectedUserList] = useState<number[]>([]);
    const [hasFooter , setHasFooter] = useState<boolean>(false);

    return {
        selectedUserList , setSelectedUserList,
        hasFooter , setHasFooter
    }
}

export default AddMemberStates;