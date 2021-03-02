import { useState } from "react";

function GuidedTourStates(){
  const [isDisplayed , setIsDisplayed] = useState<boolean>(true);

  return {
    isDisplayed , setIsDisplayed
  }
}

export default GuidedTourStates;