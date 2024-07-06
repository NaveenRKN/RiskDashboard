import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Upload from "./Upload";
import { useNavigate } from "react-router-dom";
import DateRangePicker from "rsuite/DateRangePicker";
import {
  uploadRiskFile,
  uploadRiskFileClear,
} from "../store/redux/actions/risk";
import { useDispatch } from "react-redux";
import "rsuite/dist/rsuite-no-reset.min.css";
import logo from "./../assets/images/risk-loader.png";
import swal from "sweetalert";
import PropTypes from "prop-types";

const Header = (props) => {
  let startDate = new Date();
  let enddate = new Date(startDate);
  let [pageLoading, setPageLoading] = useState(false);
  enddate.setMonth(enddate.getMonth() - 10);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [start, setEnd] = useState(new Date(enddate));
  const [end, setStart] = useState(new Date(startDate));
  const { fileData } = useSelector((state) => state.UploadFileStore);
  const {
    headerSkins,
    peopleShow,
    getDropDownUser,
    getSetMenuMobile,
    getSetMenu,
    onChange,
    getDropDownToDo,
    riskDetails,
  } = props;
  const logout = () => {
    localStorage.removeItem("aceessToken");
    localStorage.removeItem("refreshToken");
    navigate("/auth", { replace: true });
  };
  const onChanges = (e) => {
    if (!e) {
      setStart(enddate);
      setEnd(startDate);
      onChange([new Date(enddate), new Date(startDate)]);
    } else {
      onChange(e);
      setStart(e[0]);
      setEnd(e[1]);
    }
  };

  const fileChangedHandler = (event) => {
    setUploadedFile(event.target.files);
  };
  const setUploadedFile = (files) => {
    let formData = new FormData();
    let file = files[0];
    if (
      file != null &&
      (file.type ==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    ) {
      var blob = new Blob([file], {
        type: "application/octet-stream",
      });
      formData.append("file", blob);
    } else {
      formData.append("file", file);
    }
    dispatch(uploadRiskFile(formData));
    setPageLoading(true);
    setTimeout(() => {
      setPageLoading(false);
    }, 20000);
  };
  useEffect(() => {
    let access = localStorage.getItem("aceessToken");
    let refresh = localStorage.getItem("refreshToken");
    if (!refresh && !access) {
      navigate("/auth/sign-in", { replace: true });
    }
  }, []);

  useEffect(() => {
    if (fileData) {
      let icons = "";
      if (fileData == "CSV data imported successfully.") icons = "success";
      else icons = "info";
      swal(fileData, { icon: icons });
      setTimeout(() => {
        setPageLoading(false);
        dispatch(uploadRiskFileClear());
      }, 100);
    }
  }, [fileData]);
  return (
    <nav
      className={`navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row ${headerSkins}`}
      style={{ zIndex: 10 }}
    >
      {pageLoading && (
        <div className="fullloader" style={pageLoading ? { zIndex: 1000 } : {}}>
          <div className="risk-loader"></div>
        </div>
      )}

      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a className="navbar-brand brand-logo mr-3 ml-2">
          <img src={logo} alt="logo" style={{ paddingRight: 5 }} />
          Risk Management
        </a>
        <a className="navbar-brand brand-logo-mini">
          <img src={logo} alt="logo" style={{ paddingRight: 5 }} />
        </a>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
        <button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
          onClick={getSetMenu}
        >
          <span className="material-icons iconsize-sm ">menu</span>
        </button>
        <ul className="navbar-nav mr-lg-2">
          <li className="nav-item nav-search d-none d-lg-block">
            <div className="mt-4 mb-4 ml-3">
              <DateRangePicker
                appearance="default"
                shouldDisableDate={(date) => {
                  const minDate = new Date();
                  const maxDate = new Date("2021");
                  return date < maxDate || date > minDate;
                }}
                format="MM-dd-yyyy"
                character=" | "
                placeholder="Select Risk Created Range "
                onChange={onChanges}
              />
            </div>
          </li>
          <li className="nav-item nav-search d-none d-lg-block">
            <p className="text-primary ">
              <a
                className="nav-link"
                style={{ marginTop: 10, fontSize: 15 }}
              >
                Total Risks {riskDetails.totalRisk}{" "}
              </a>
            </p>
          </li>
          <li
            className="nav-item nav-search d-none d-lg-block "
            style={{ paddingBottom: 5, fontSize: 15 }}
          >
              <a
                className="nav-link"
                style={{ marginTop: 8, fontSize: 15 }}
              >
            Closed Risks {riskDetails.closedRisk}
            </a>
          </li>
        </ul>
        <ul className="navbar-nav navbar-nav-right">
          <li className={`nav-item nav-profile dropdown `}>
            <a
              className="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              id="profileDropdown"
            >
              <Upload fileChangedHandler={fileChangedHandler} />
            </a>
          </li>
          <li
            className={`nav-item nav-profile dropdown ${
              peopleShow ? "show" : ""
            }`}
            onClick={getDropDownUser}
          >
            <a
              className="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              id="profileDropdown"
            >
              <i className="material-icons" style={{ fontSize: "30px" }}>
                person
              </i>
            </a>
            <div
              className={`dropdown-menu dropdown-menu-right navbar-dropdown ${
                peopleShow ? "show" : ""
              }`}
              aria-labelledby="profileDropdown"
              onClick={logout}
            >
              <a className="dropdown-item">
                <i
                  className="material-icons iconsize-sm "
                  style={{ paddingRight: 10 }}
                >
                  power_settings_new
                </i>
                Logout
              </a>
            </div>
          </li>
          <li
            className={`nav-item nav-profile dropdown ${
              peopleShow ? "show" : ""
            }`}
            onClick={getDropDownToDo}
            data-toggle="tooltip"
            title={`${peopleShow ? "Todo modal" : "Todo modal"}`}
          >
            <a
              className="nav-link dropdown-toggle"
              href="#"
              data-toggle="dropdown"
              id="profileDropdown"
            >
              {" "}
              <i className="material-icons" style={{ fontSize: "20px" }}>
                hdr_strong
              </i>
            </a>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="offcanvas"
          onClick={getSetMenuMobile}
        >
          <span className="material-icons iconsize-sm ">menu</span>
        </button>
      </div>
    </nav>
  );
};

export default Header;
Header.propTypes = {
  data: PropTypes.any,
  headerSkins: PropTypes.any,
  peopleShow: PropTypes.any,
  getDropDownUser: PropTypes.any,
  getSetMenuMobile: PropTypes.any,
  getSetMenu: PropTypes.any,
  onChange: PropTypes.any,
  getDropDownToDo: PropTypes.any,
  riskDetails: PropTypes.any,
};
