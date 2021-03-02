import React, { useEffect } from 'react';
import LossNetworkModalState from './loss-network-modal.state';
import './loss-network-modal.scss';
import { IconDeleteDisabled, IconWifiOff } from '../../libraries/Icons/icon.screen';

function LossNetworkModalScreen() {
  
  const {
    isDisplayed , setIsDisplayed
  } = LossNetworkModalState()

  useEffect(() =>{
    window.addEventListener('offline', function(e) {
      setIsDisplayed(true)
    });

    return () =>{
      window.removeEventListener('offline', function(e) {
        setIsDisplayed(true)
      });
    }
  })

  useEffect(() =>{
    window.addEventListener('online', function(e) {
      setIsDisplayed(false)
    });

    return () =>{
      window.removeEventListener('online', function(e) {
        setIsDisplayed(false)
      });
    }
  })

  if(isDisplayed){
    return (
      <div className="lossnetworkmodal-container flex-center body-regular-error">
        <IconWifiOff></IconWifiOff>
        <span className="margin-left-12 margin-right-8">Không có kết nối internet</span>
        <a href="/">Làm mới trang</a>
        <span onClick={ () => { setIsDisplayed(false) } } className="cursor-pointer margin-left-12 flex-center">
          <IconDeleteDisabled></IconDeleteDisabled>
        </span>
      </div>
    );
  }

  return (
    <></>
  );
}

export default LossNetworkModalScreen;



