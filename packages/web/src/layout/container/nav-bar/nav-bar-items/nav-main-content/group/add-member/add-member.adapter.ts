import AddMemberStates from "./add-member.states";

function AddMemberAdapter(){

    const {
        selectedUserList , setSelectedUserList,
        hasFooter , setHasFooter
    } = AddMemberStates();

    const setSelectedUserByCheckbox = (e: any) =>{
            const { name , checked } = e.target;
            const idSelectedUser = parseInt(name);
        
            handleSelectedUser(checked , idSelectedUser)
    }
        
    const setSelectedUser = (idSelectedUser: number) =>{
        const checked = selectedUserList.some((id: number) => id === idSelectedUser);
    
        handleSelectedUser(!checked , idSelectedUser)
    }
    
    const handleSelectedUser = (checked: boolean , idSelectedUser: number) =>{
        if(checked){
            if(selectedUserList.length === 0){
                setHasFooter(true);
                setSelectedUserList([...selectedUserList , idSelectedUser]);
            }else{
                if(!selectedUserList.some((id: number) => id === idSelectedUser)){
                setSelectedUserList([...selectedUserList , idSelectedUser]);
                }
            }
        } else{
            if(selectedUserList.length === 1){
                setHasFooter(false);
                setSelectedUserList([]);
            }else{
                if(selectedUserList.some((id: number) => id === idSelectedUser)){
                setSelectedUserList(selectedUserList.filter((id: number) => id !== idSelectedUser));
                }
            }
        }
      }
    
    const removeSelectedUser = (idSelectedUser:number) =>{
        if(selectedUserList.length === 1){
            setHasFooter(false);
            setSelectedUserList([]);
        }else{
            if(selectedUserList.some((id: number) => id === idSelectedUser)){
                setSelectedUserList(selectedUserList.filter((id: number) => id !== idSelectedUser));
            }
        }
    }

    return {
        selectedUserList,
        hasFooter,
        setSelectedUserByCheckbox,
        setSelectedUser,
        removeSelectedUser
    }
}

export default AddMemberAdapter;