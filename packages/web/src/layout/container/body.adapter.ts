import useWindowSize from "../../libraries/Hooks/useWindowSize";
import BodyStates from "./body.states";

function BodyAdapter(){
    const { activedIcon , setActivedIcon } = BodyStates()
    const { width ,  height } = useWindowSize();
  
    const eleHeader: any = document.querySelector('.header-container');
    const heightHeader = eleHeader ? eleHeader.offsetHeight : 50;

    const styleInlineBody = {
      height: height- heightHeader
    }

    const styleInlineBodyRight={
      height : width < 768 ? height - 100 : ""
    }

    return {
        activedIcon , setActivedIcon,
        styleInlineBody,
        styleInlineBodyRight
    }
}

export default BodyAdapter;