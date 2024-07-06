import React from "react";
import PropTypes from "prop-types";

const SideNavBar = (props) => {
  const { handleSideNavBarChange, activeTab } = props;
  return (
    <div>
      <ul className="nav">
        <li
          className={`nav-item ${activeTab == "dashBoard" ? "active" : ""}`}
          onClick={(e) => {
            handleSideNavBarChange("dashBoard");
          }}
        >
          <a className="nav-link">
            <i
              className="material-icons iconsize-sm "
              style={{ paddingRight: 10 }}
            >
              dashboard
            </i>

            <span className="menu-title"> Dashboard</span>
          </a>
        </li>
        <li
          className={`nav-item ${activeTab == "isms" ? "active" : ""}`}
          onClick={(e) => {
            handleSideNavBarChange("isms");
          }}
        >
          <a className="nav-link">
            <i className="material-icons" style={{ paddingRight: 10 }}>
              verified_user
            </i>
            <span className="menu-title"> ISMS</span>
          </a>
        </li>
        <li
          className={`nav-item ${activeTab == "privacy" ? "active" : ""}`}
          onClick={(e) => {
            handleSideNavBarChange("privacy");
          }}
        >
          <a className="nav-link">
            <i
              className="material-icons iconsize-sm "
              style={{ paddingRight: 10 }}
            >
              remove_red_eye
            </i>

            <span className="menu-title"> Privacy</span>
          </a>
        </li>
        <li
          className={`nav-item ${activeTab == "qms" ? "active" : ""}`}
          onClick={(e) => {
            handleSideNavBarChange("qms");
          }}
        >
          <a className="nav-link">
            <i
              className="material-icons iconsize-sm "
              style={{ paddingRight: 10 }}
            >
              card_membership
            </i>
            <span className="menu-title"> QMS </span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideNavBar;
SideNavBar.propTypes = {
  handleSideNavBarChange: PropTypes.any,
  activeTab: PropTypes.any,
};