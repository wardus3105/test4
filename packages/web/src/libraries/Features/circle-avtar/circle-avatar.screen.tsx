import React from 'react';
import './circle-avatar.scss';
import { ICircleAvatar } from './circle-avatar.props';
import { IconDeleteDisabled } from '../../Icons/icon.screen';

function CircleAvatarScreen(props : ICircleAvatar) {

  let { src , isOnline , notiIcon , onRemove , canRomove , onClick } = props;

  if(!src){
    src = "https://cdn.dribbble.com/users/2199928/screenshots/11532918/shot-cropped-1590177932366.png?compress=1&resize=400x300";
  }

  const styleInline = { 
    backgroundImage : `url(${src})` , 
    backgroundColor:"#d7e4e2",
    minWidth: props.width , 
    minHeight: props.height,
    cursor: props.hasCursor ? "pointer" : "initial"
  };

  return (
    <>
      <div 
        className={ "circleavatar-container " + props.class + (isOnline ? " isOnline" : "") } 
        style={ styleInline }
        onClick={ onClick && onClick }
      >
        { 
          canRomove && <div className="circleavatar-remove flex-center cursor-pointer" onClick={ onRemove }>
                                <IconDeleteDisabled></IconDeleteDisabled>
                              </div>  
        }
        { notiIcon && <div className="circleavatar-noti">{ notiIcon }</div> }
      </div> 
    </>
  );
}

export default CircleAvatarScreen;


