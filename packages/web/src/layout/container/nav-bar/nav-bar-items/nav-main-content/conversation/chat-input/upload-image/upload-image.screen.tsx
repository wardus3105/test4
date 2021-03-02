import React from 'react';
import { IconDeleteDisabled } from '../../../../../../../../libraries/Icons/icon.screen';
import './upload-image.scss';

function UploadImageScreen(props: any) {
  return (
    <div 
      className={"uploadimage-container " + props.class} 
      style={{ backgroundImage : `url(${ props.pathFile })` , width: props.width , height: props.height}}
    >
      <div 
        className="uploadimage-icon-delete-panel flex-center cursor-pointer"
        onClick={ () =>{ props.removePathFile(props.pathFile) }}
      >
          <IconDeleteDisabled className="img-16"></IconDeleteDisabled>
      </div>
    </div> 
  );
}

export default UploadImageScreen;
