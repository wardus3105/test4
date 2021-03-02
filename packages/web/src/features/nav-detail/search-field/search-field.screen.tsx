/* 
    Created by huydz
*/

import React from "react";
// import SearchFieldAdapter from "./search-field.adapter";
import { SearchFieldProps } from "./search-field.props";
// import { SearchFieldStates } from "./search-field.states";
import './search-field.scss';

const SearchFieldScreen = (props: SearchFieldProps) => {

  return (
      <div className="searchfield-container" id="searchfield-container-index">
        {
          props.child
        }
      </div>
  );
}

export default SearchFieldScreen;


