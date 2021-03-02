
import buildFileSelector from "../../../../../../../../libraries/Functions/build-file-selector";
import { IHeaderCreateGroup } from "./header-create-group.props";
import HeaderCreateGroupStates from "./header-create-group.states";

function HeaderCreateGroupAdapter(props : IHeaderCreateGroup){

    const {
        hasHover , setHasHover
    } = HeaderCreateGroupStates()

    const { avatarTemp , setAvatarTemp , setAvatar } = props;
    
    function cb (pathFileListTemp: string[]){
        setHasHover(true);
        setAvatarTemp(pathFileListTemp)
    }

    const fileSelector = buildFileSelector(false , cb , setAvatar);

    const handleFileSelect = (e: any) => {
        e.preventDefault();
        fileSelector.click();
    }

    return {
        avatarTemp,
        hasHover,
        handleFileSelect
    }
}

export default HeaderCreateGroupAdapter;