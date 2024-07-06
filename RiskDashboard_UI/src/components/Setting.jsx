import React from "react";
import PropTypes from "prop-types";
const Setting = (props) => {
  const {
    getSetSettingMenu,
    getSliderSkins,
    getHeadersSkins,
    sliderSkins,
    menuSettings,
  } = props;

  return (
    <div>
      <div className="theme-setting-wrapper">
        <div
           data-testid="settings-trigger"
          id="settings-trigger"
          onClick={getSetSettingMenu}
          style={{ cursor: "pointer" }}
        >
          <i className="material-icons">settings</i>
        </div>
        <div
          id="theme-settings"
          data-testid="theme-settings"
          className={menuSettings ? "settings-panel" : "settings-panel open"}
          style={{ cursor: "pointer" }}
        >
          <div className="row"  style={{padding:10 }}>
            <div className="col-md-6">
              SIDEBAR SKINS
            </div>
            <div className="col-md-6" style={{textAlign:'right'}}>
              <i className="material-icons" onClick={getSetSettingMenu}
              data-testid="close-button">
              close
            </i>
            </div>
         </div>
          
          
          <div
            className={
              sliderSkins == true
                ? "sidebar-bg-options sidebar-bg-options selected"
                : "sidebar-bg-options "
            }
            data-testid="sidebar-light-theme"
            id="sidebar-light-theme"
            onClick={getSliderSkins}
          >
            <div className="img-ss rounded-circle bg-light border mr-3"></div>
            Light
          </div>
          <div
            className={
              sliderSkins == false
                ? "sidebar-bg-options sidebar-bg-options selected"
                : "sidebar-bg-options "
            }
            data-testid="sidebar-dark-theme"
            id="sidebar-dark-theme"
            onClick={getSliderSkins}
          >
            <div className="img-ss rounded-circle bg-dark border mr-3"></div>
            Dark
          </div>
          <p className="settings-heading mt-2">HEADER SKINS</p>
          <div className="color-tiles mx-0 px-4">
            <div
              className="tiles success"
              onClick={() => getHeadersSkins("navbar-success")}
            ></div>
            <div
              className="tiles warning"
              onClick={() => getHeadersSkins("navbar-warning")}
            ></div>
            <div
              className="tiles danger"
              onClick={() => getHeadersSkins("navbar-danger")}
            ></div>
            <div
              className="tiles info"
              onClick={() => getHeadersSkins("navbar-info")}
            ></div>
            <div
              className="tiles dark"
              onClick={() => getHeadersSkins("navbar-dark")}
            ></div>
            <div
              className="tiles default"
              onClick={() => getHeadersSkins("navbar-default")}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
Setting.propTypes = {
  data: PropTypes.any,
  getSetSettingMenu: PropTypes.any,
  getSliderSkins: PropTypes.any,
  getHeadersSkins: PropTypes.any,
  sliderSkins: PropTypes.any,
  menuSettings: PropTypes.any,
};
