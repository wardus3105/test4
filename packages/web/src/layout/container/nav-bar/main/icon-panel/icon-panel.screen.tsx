import React from 'react';
import { IconPanelModel } from './icon-panel.props';
import TooltipScreen from '../../../../../libraries/Features/tooltip/tooltip.screen';
import './icon-panel.scss';

function IconPanelScreen(props : IconPanelModel) {

  return (
    <TooltipScreen context={ props.contextToolTip }>
      <div 
        className={ "navbar-iconpanel-container cursor-pointer flex-center " +  
                    (props.isActive ? "navbar-iconpanel-container--active " : "") + 
                    (props.hasNotification ? "hasNotification " : "") +
                    (props.className ? props.className : "") 
                  }
        onClick={ props.onClick }
      >
        <div className="flex-center navbar-iconpanel-icon">
          { props.eleIcon }
        </div>
      </div>
    </TooltipScreen>

  );
}

export default IconPanelScreen;
