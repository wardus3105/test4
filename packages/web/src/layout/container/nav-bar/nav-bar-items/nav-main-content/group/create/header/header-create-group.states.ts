import { useState } from "react";

function HeaderCreateGroupStates(){
    const [hasHover , setHasHover] = useState<boolean>(false);

    return {
        hasHover , setHasHover
    }
}

export default HeaderCreateGroupStates;