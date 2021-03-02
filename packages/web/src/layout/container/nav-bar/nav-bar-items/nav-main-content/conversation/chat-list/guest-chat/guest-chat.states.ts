import { useState } from "react";

function GuestChatStates(){
    const [isVisibleReaction, setVisibleReaction] = useState<Boolean>(false);

    return {
        isVisibleReaction, setVisibleReaction
    }
}

export default GuestChatStates;