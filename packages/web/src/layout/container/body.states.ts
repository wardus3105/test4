import { useState } from "react";
import { ENUM_KIND_OF_ICONPANEL } from "../../libraries/Enum/icon-panel";

function BodyStates(){
    const [activedIcon , setActivedIcon] = useState(ENUM_KIND_OF_ICONPANEL.MESSAGES);

    return {
        activedIcon , setActivedIcon
    }
}

export default BodyStates;