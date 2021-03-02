import { useState } from "react";

function LossNetworkModalState() {
  const [isDisplayed , setIsDisplayed] = useState<boolean>(false);

  return {
    isDisplayed , setIsDisplayed
  }
}

export default LossNetworkModalState;



