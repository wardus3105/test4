import { useState } from "react";

function GetidModalStates(){
  const [getidModalIsDisplayed , setGetidModalIsDisplayed] = useState<boolean>(true);
  const [userid , setuserid] = useState<string>("");

  return {
    getidModalIsDisplayed , setGetidModalIsDisplayed,
    userid , setuserid
  }
}

export default GetidModalStates;