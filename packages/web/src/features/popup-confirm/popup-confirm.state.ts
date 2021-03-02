import { useState } from "react";

function PopupConfirmStates(){
  const [popupConfirmIsDisplayed , setPopupConfirmIsDisplayed] = useState<boolean>(false);
  return {
    popupConfirmIsDisplayed , setPopupConfirmIsDisplayed
  }
}

export default PopupConfirmStates;