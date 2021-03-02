import { useState } from "react";

function PageNotFoundModalState() {
  const [isDisplayed , setIsDisplayed] = useState<boolean>(false);

  return {
    isDisplayed , setIsDisplayed
  }
}

export default PageNotFoundModalState;



