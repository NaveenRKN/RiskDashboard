import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import {
  getRiskAction,
  sendMailData,
  sendMailDataClear,
} from "../../../store/redux/actions/risk";
import { connect } from "react-redux";
import RiskSummary from "../../../components/RiskSummary";
import ListGrid2 from "./ListGrid2";
import ListGrid from "./ListGrid";
import { StackedBarChart } from "../../../components/chart/StackedBarChart";
import { Barchart } from "../../../components/chart/Barchart";
import { LineChart } from "../../../components/chart/LineChart";
import { RadialBar } from "../../../components/chart/RadialBar";
import { Heatmap } from "../../../components/chart/Heatmap";
import { Columnchart } from "../../../components/chart/Columnchart";
import { Circularchart } from "../../../components/chart/Circularchart";
import SideNavBar from "../../../components/SideNavBar";
import ImgBg from "./../../../assets/images/card.png";
import ImgColor from "./../../../assets/images/color.png";
import Setting from "../../../components/Setting";
import ToDoList from "../../../components/ToDoList";
import Header from "./../../../components/Header";
import swal from "sweetalert";
import PropTypes from "prop-types";

const Home = (props) => {
  const dispatch = useDispatch();
  const [selectPoint, setSelectPoint] = useState(null),
    [selectChart, setSelectChart] = useState(null),
    [userName, setUserName] = useState(""),
    [gridClearFlag, setGridClearFlag] = useState(false),
    [pageLoading, setPageLoading] = useState(true),
    [selectTable, setSelectTable] = useState("Open"),
    [riskType, setRiskType] = useState(null),
    [selectChartName, setSelectChartName] = useState(null),
    [selectLabel, setSelectLabel] = useState(null),
    [catageryLabel, setCatageryLabel] = useState(null),
    [selectKey, setSelectKey] = useState(null),
    [listData, setListData] = useState([]),
    [filterRiskData, setFilterRiskData] = useState([]),
    { riskData, loading, emailSend } = useSelector((state) => state.RiskStore),
    [CircularchartData, setCircularChartData] = useState([]),
    [radioChartData, setRadioChartData] = useState([]),
    [radioChartDataList, setRadioChartDataList] = useState({}),
    [pieChartData, setPieChartData] = useState([]),
    [barChartData, setBarChartData] = useState([]),
    [selectMail, setSelectMail] = useState([]),
    [stackedChartData, setStackedChartData] = useState({
      highRiskData: [],
      mediumRiskData: [],
      lowRiskData: [],
    }),
    [riskDetailsHeat, setRiskDetailsHeat] = useState([[], [], [], [], []]),
    [riskDetailsBar, setRiskDetailsBar] = useState([[], [], [], [], []]),
    [riskDetailsBarList, setRiskDetailsBarList] = useState([
      [],
      [],
      [],
      [],
      [],
    ]),
    [riskList, setRiskList] = useState({
      ismsRisk: [],
      qmsRisk: [],
      privacyRisk: [],
    }),
    [activeTab, setActiveTab] = useState("dashBoard"),
    [yearRange, setYearRange] = useState({ startYear: "", endYear: "" }),
    [riskDetailsLine, setRiskDetailsLine] = useState({
      HightCount: [],
      MediumCount: [],
      LowCount: [],
    }),
    [riskDetails, setRiskDetails] = useState({
      totalRisk: 0,
      openRisk: 0,
      closedRisk: 0,
      awaitingApproval: 0,
      inProgress: 0,
    }),
    [loader, setLoader] = useState(true);

  const navTabs = ["dashBoard", "isms", "privacy", "qms"];
  const { ...rest } = props;
  const [open, setOpen] = useState(true);
  const [menuStatus, setMenuStatus] = useState(true);
  const [sliderSkins, setSliderSkins] = useState(true);
  const [peopleShow, setPeopleShow] = useState(false);
  const [toDoShow, setToDoShow] = useState(false);
  const [headerSkins, setHeaderSkins] = useState("");
  const [navItemActive, setNavItemActive] = useState(true);
  const [menuSettings, setMenuSettings] = useState(true);
  const [currentRoute, setCurrentRoute] = useState("Main Dashboard");
  const { fileData } = useSelector((state) => state.UploadFileStore);

  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
    let text = localStorage.getItem("username");
    if (text) {
      const methodOne = text.split(".");
      if (methodOne) console.log(methodOne[0]);
      setUserName(methodOne[0]);
    }
  }, []);

  const getSetMenu = () => {
    setMenuStatus(!menuStatus);
    if (menuStatus) {
      document.body.classList.add("sidebar-icon-only");
    } else {
      document.body.classList.remove("sidebar-icon-only");
    }
  };
  const getSliderSkins = () => {
    setSliderSkins(!sliderSkins);
    if (sliderSkins) {
      document.body.classList.add("sidebar-dark");
    } else {
      document.body.classList.remove("sidebar-dark");
    }
  };

  const getSetMenuMobile = () => {
    setMenuStatus(!menuStatus);
  };

  const getSetSettingMenu = () => {
    setMenuSettings(!menuSettings);
  };
  const getDropDownUser = () => {
    setPeopleShow(!peopleShow);
    setToDoShow(false);
  };
  const getDropDownToDo = () => {
    setToDoShow(!toDoShow);
    setPeopleShow(false);
  };

  const getHeadersSkins = (param) => {
    if (param) setHeaderSkins(param);
  };

  useEffect(() => {
    if (riskData != null) {
      setChart(riskData);
      setListData(riskData);
      setFilterRiskData(riskData);
      setRiskInformation(riskData);
      setFilterType();
    } else if (riskData == []) {
      setChart(riskData);
      setFilterType();
    }
  }, [riskData]);

  useEffect(() => {
    if (emailSend) {
      // swal("Email send successfully", { icon: "info" });
    }
  }, [emailSend]);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    window.scrollTo(0, 0);
    const d = new Date();
    let startYear = {
      year: d.getFullYear() - 5,
      month: "01",
      date: d.getDate(),
    };
    let endYear = {
      year: d.getFullYear(),
      month: d.getMonth(),
      date: d.getDate(),
    };
    setYearRange({
      ...yearRange,
      startYear: startYear,
      endYear: endYear,
    });
    getRiskList(startYear, endYear, null);
  };

  const onChange = (data) => {
    let start = data[0];
    let end = data[1];
    let startYear = {
      year: start.getFullYear(),
      month: start.getMonth() + 1,
      date: start.getDate(),
    };
    let endYear = {
      year: end.getFullYear(),
      month: end.getMonth() + 1,
      date: end.getDate(),
    };
    setYearRange({
      ...yearRange,
      startYear: startYear,
      endYear: endYear,
    });
    getRiskList(startYear, endYear, riskType);
  };

  const getRiskList = (startYear, endYear, riskType) => {
      let data = {
        startYear: startYear,
        endYear: endYear,
        riskType: riskType,
      };
      dispatch(getRiskAction(data));
    },
    setRiskInformation = (data) => {
      let openRisk = filterData(data, "status", "Open", null);
      let closedRisk = filterData(data, "status", "Closed", null);
      let wipRisk = filterData(data, "status", "WIP", null);
      let OccurredRisk = filterData(data, "status", "Occurred", null);
      let awaitingApproval =data && data.filter((obj) => {
        return (obj.riskStatus === "submitted" || obj.riskStatus === "resubmitted") && obj.status != "Closed" ;
      });
      console.log(awaitingApproval)
      setRiskDetails({
        ...riskDetails,
        totalRisk: data.length,
        openRisk: openRisk.length,
        closedRisk: closedRisk.length,
        inProgress: wipRisk.length,
        Occurred: OccurredRisk.length,
        awaitingApproval: awaitingApproval.length,
        totalRiskList: data,
        openRiskList: openRisk,
        closedRiskList: closedRisk,
        inProgressList: wipRisk,
        OccurredList: OccurredRisk,
        awaitingApprovalList: awaitingApproval,
      });
    },
    setFilterType = () => {
      if (riskData) {
        let qms = [
          "Operational",
          "Compliance",
          "Business",
          "External",
          "Management Risk",
          "Resource",
          "Technical",
        ];
        let privacy = ["Privacy", "Privact HIPAA"];
        let qmsRisk, ismsRisk, privacyRisk;
        qmsRisk = riskData?.filter((risk) => {
          return qms.includes(risk.type);
        });
        ismsRisk = riskData?.filter((risk) => {
          return risk.type == "Information Security";
        });
        privacyRisk = riskData?.filter((risk) => {
          return privacy.includes(risk.type);
        });
        setRiskList({
          ...riskList,
          qmsRisk: qmsRisk,
          ismsRisk: ismsRisk,
          privacyRisk: privacyRisk,
        });
      } else {
        setRiskList({});
      }
    },
    setChart = (listData) => {
      setCircularChart(listData);
      setRadioChart(listData);
      setPieChart(listData);
      setBarChart(listData);
    },
    filterData = (listData, filterType, filterFlag, filterData) => {
      let filteredData;
      if (filterType == "status" && filterFlag == "Closed") {
        if (filterData == null) {
          filteredData =
            listData &&
            listData.filter((obj) => {
              return obj[filterType] === filterFlag && obj["riskRating"] != "";
            });
        } else {
          filteredData =
            filterData &&
            filterData.filter((obj) => {
              return obj[filterType] === filterFlag && obj["riskRating"] != "";
            });
        }
      } else {
        if (filterData == null) {
          filteredData =
            listData &&
            listData.filter((obj) => {
              return (
                obj[filterType] === filterFlag &&
                obj["status"] != "Closed" &&
                obj["riskRating"] != ""
              );
            });
        } else {
          filteredData =
            filterData &&
            filterData.filter((obj) => {
              return (
                obj[filterType] === filterFlag &&
                obj["status"] != "Closed" &&
                obj["riskRating"] != ""
              );
            });
        }
      }
      return filteredData;
    },
    setCircularChart = (data) => {
      let circularRiskArray = [];
      const HighRisk = filterData(data, "riskRating", "High", null);
      circularRiskArray.push(HighRisk.length);
      const mediumRisk = filterData(data, "riskRating", "Medium", null);
      circularRiskArray.push(mediumRisk.length);
      const lowRisk = filterData(data, "riskRating", "Low", null);
      circularRiskArray.push(lowRisk.length);
      setCircularChartData(circularRiskArray);
    },
    setRadioChart = (riskData) => {
      if (riskData) {
        let data = riskData?.filter((risk) => {
          return new Date(risk.targetClosuerDate) <= new Date();
        });
        let circularRiskArray = [];
        let circularRiskArrayList = {};
        const Open = filterData(data, "status", "Open", null);
        circularRiskArray.push(Open.length);
        circularRiskArrayList.Open = Open;
        const WIP = filterData(data, "status", "WIP", null);
        circularRiskArray.push(WIP.length);
        circularRiskArrayList.WIP = WIP;
        const Occurred = filterData(data, "status", "Occurred", null);
        circularRiskArray.push(Occurred.length);
        circularRiskArrayList.Occurred = Occurred;
        setRadioChartData(circularRiskArray);
        setRadioChartDataList(circularRiskArrayList);
      } else {
        setRadioChartData([]);
        setRadioChartDataList({});
      }
    },
    setPieChart = (data) => {
      let pieRiskArray = [];
      const wipRisk = filterData(data, "status", "WIP", null);
      pieRiskArray.push(wipRisk.length);
      const openRisk = filterData(data, "status", "Open", null);
      pieRiskArray.push(openRisk.length);
      const occuredRisk = filterData(data, "status", "Occurred", null);
      pieRiskArray.push(occuredRisk.length);
      const closedRisk = filterData(data, "status", "Closed", null);
      pieRiskArray.push(closedRisk.length);
      setPieChartData(pieRiskArray);
    },
    setBarChart = (data) => {
      let barRiskArray = [];
      let highRiskArray = [];
      let mediumRiskArray = [];
      let lowRiskArray = [];
      let category = [
        "Operational",
        "Compliance",
        "Business",
        "External",
        "Information Security",
        "Management Risk",
        "Privacy",
        "Privact HIPAA",
        "Resource",
        "Technical",
      ];
      category.map((type) => {
        let filterValue = filterData(data, "type", type, null);
        let highRiskValue = filterData(data, "riskRating", "High", filterValue);
        let mediumRiskValue = filterData(
          data,
          "riskRating",
          "Medium",
          filterValue
        );
        let lowRiskValue = filterData(data, "riskRating", "Low", filterValue);
        highRiskArray.push(highRiskValue.length);
        mediumRiskArray.push(mediumRiskValue.length);
        lowRiskArray.push(lowRiskValue.length);
        barRiskArray.push(filterValue.length);
      });
      setStackedChartData({
        ...stackedChartData,
        highRiskData: highRiskArray,
        mediumRiskData: mediumRiskArray,
        lowRiskData: lowRiskArray,
      });
      setBarChartData(barRiskArray);
    },
    handleSideNavBarChange = (name) => {
      setActiveTab(name);
      setPageLoading(true);
      switch (name) {
        case "dashBoard":
          getRiskList(yearRange.startYear, yearRange.endYear, null);
          setRiskType(null);
          break;
        case "qms":
          getRiskList(yearRange.startYear, yearRange.endYear, 3);
          setRiskType(3);
          break;
        case "isms":
          getRiskList(yearRange.startYear, yearRange.endYear, 1);
          setRiskType(1);
          break;
        case "privacy":
          getRiskList(yearRange.startYear, yearRange.endYear, 2);
          setRiskType(2);
          break;
        default:
          break;
      }
      setTimeout(() => {
        setPageLoading(false);
      }, 2000);
    },
    setFilterRiskDataFunction = (data, chart, key) => {
      setSelectPoint(data);
      setSelectChart(chart);
      setSelectKey(key);
      window.scrollTo(0, 999999);
    };
  const riskSummaryChild = (selectPoint) => {
    let chartName = ["WIP", "Open", "Awaiting Approval", "Occurred"];
    let filterList;
    if (selectPoint == 2) {
      filterList =
        riskData &&
        riskData.filter((obj) => {
          return (
            (obj.riskStatus === "submitted" ||
              obj.riskStatus === "resubmitted") &&
            obj.status != "Closed"
          );
        });
    } else {
      filterList = filterData(riskData, "status", chartName[selectPoint], null);
    }
    setListData(filterList);
    setFilterRiskData(filterList);
    setSelectLabel(chartName[selectPoint]);
    setSelectChart("tiles");
    window.scrollTo(0, 999999);
  };
  const clearFilter = () => {
    window.scrollTo(0, 0);
    getList();
    setSelectLabel("");
  };
  const tableChange = (data) => {
    setSelectTable(data);
  };
  const selectedRow = (data) => {
    setSelectMail(data);
  };
  const sendMail = () => {
    if (selectMail.length > 0) {
      dispatch(sendMailData(selectMail));
      setPageLoading(true);
      setSelectMail([])
      setTimeout(() => {
        swal("Email successfully sent", { icon: "success" }); 
        setGridClearFlag(true);
        getList();
        setPageLoading(false); 
      }, 3000);
    } else {
      swal(
        "Please select at least one risk to send a mail notification to the owner.",
        { icon: "info" }
      );
    }
  };
  useEffect(() => {
    if (selectPoint != null) {
      if (selectChart == "donut") {
        let chartName = ["WIP", "Open", "Occurred", "Occurred"];
        let filterList = filterData(
          riskData,
          "status",
          chartName[selectPoint],
          null
        );
        setListData(filterList);
        setFilterRiskData(filterList);
        setSelectLabel(chartName[selectPoint]);
      } else if (selectChart == "pie") {
        let chartName = ["High", "Medium", "Low"];
        let filterList = filterData(
          riskData,
          "riskRating",
          chartName[selectPoint],
          null
        );
        setListData(filterList);
        setFilterRiskData(filterList);
        setSelectLabel(chartName[selectPoint]);
      } else if (selectChart == "barChart") {
        let chartName = [
          "Operational",
          "Compliance",
          "Business",
          "External",
          "Information Security",
          "Management Risk",
          "Privacy",
          "Privact HIPAA",
          "Resource",
          "Technical",
        ];
        setSelectLabel(chartName[selectPoint]);
        let filterList = filterData(
          riskData,
          "type",
          chartName[selectPoint],
          null
        );
        setFilterRiskData(filterList);
        setListData(filterList);
      } else if (selectChart == "barcolumn") {
        let filterList = riskDetailsBarList[selectPoint];
        setListData(filterList);
      } else if (selectChart == "bar") {
        let chartName = ["High", "Medium", "Low"];
        let catagery = [
          "Operational",
          "Compliance",
          "Business",
          "External",
          "Information Security",
          "Management Risk",
          "Privacy",
          "Privact HIPAA",
          "Resource",
          "Technical",
        ];
        let filterList = filterData(
          riskData,
          "type",
          catagery[selectPoint],
          null
        );
        let shorting = filterData(
          riskData,
          "riskRating",
          chartName[selectKey],
          filterList
        );
        setListData(shorting);
        setFilterRiskData(filterList);
        setSelectLabel(chartName[selectKey]);
        setCatageryLabel(catagery[selectPoint]);
      }
    }
  }, [selectPoint, selectKey, selectChartName, selectLabel, selectChart]);
  useEffect(() => {
    if (riskData) {
      const findMonth = (datestring) => {
        let date = new Date(datestring);
        return date.getMonth();
      };
      const makeDateArray = (orders) => {
        let monthFreq = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (const order of orders) {
          const month = parseInt(findMonth(order.identifiedDate));
          monthFreq[month] = monthFreq[month] + 1;
        }
        return monthFreq;
      };
      var High = riskData?.filter(
        (item) =>
          item.riskRating === "High" &&
          new Date(item.identifiedDate).getFullYear() ==
            new Date().getFullYear()
      );
      var Medium = riskData?.filter(
        (item) =>
          item.riskRating === "Medium" &&
          new Date(item.identifiedDate).getFullYear() ==
            new Date().getFullYear()
      );
      var Low = riskData?.filter(
        (item) =>
          item.riskRating === "Low" &&
          new Date(item.identifiedDate).getFullYear() ==
            new Date().getFullYear()
      );
      let HightCount = makeDateArray(High);
      let MediumCount = makeDateArray(Medium);
      let LowCount = makeDateArray(Low);
      setRiskDetailsLine({
        HightCount: HightCount,
        MediumCount: MediumCount,
        LowCount: LowCount,
      });
    } else {
      setRiskDetailsLine({
        HightCount: [],
        MediumCount: [],
        LowCount: [],
      });
    }
  }, [riskData]);
  useEffect(() => {
    if (riskData) {
      const findMonth = (datestring) => {
        let date = datestring;
        return date;
      };
      const makeDateArray = (orders) => {
        let monthFreq = [0, 0, 0, 0, 0, 0];
        for (const order of orders) {
          const month = parseInt(findMonth(order.analysisImpact));
          monthFreq[month] = monthFreq[month] + 1;
        }
        return monthFreq;
      };
      var One = riskData?.filter((item) => item.analysisProbability === 1);
      var Two = riskData?.filter((item) => item.analysisProbability === 2);
      var Three = riskData?.filter((item) => item.analysisProbability === 3);
      var Foure = riskData?.filter((item) => item.analysisProbability === 4);
      var Five = riskData?.filter((item) => item.analysisProbability === 5);
      let OneCount = makeDateArray(One);
      let TwoCount = makeDateArray(Two);
      let ThreeCount = makeDateArray(Three);
      let FoureCount = makeDateArray(Foure);
      let FiveCount = makeDateArray(Five);
      if (OneCount.length) {
        delete OneCount[0];
      }
      if (TwoCount.length) {
        delete TwoCount[0];
      }
      if (ThreeCount.length) {
        delete ThreeCount[0];
      }
      if (FoureCount.length) {
        delete FoureCount[0];
      }
      if (FiveCount.length) {
        delete FiveCount[0];
      }
      setRiskDetailsHeat([
        FiveCount,
        FoureCount,
        ThreeCount,
        TwoCount,
        OneCount,
      ]);
    } else {
      setRiskDetailsHeat([[], [], [], [], []]);
    }
  }, [riskData]);
  useEffect(() => {
    if (riskData) {
      var Two = riskData?.filter(
        (item) => item.ageInMonths > 0 && item.ageInMonths <= 6
      );
      var Three = riskData?.filter(
        (item) => item.ageInMonths > 6 && item.ageInMonths <= 12
      );
      var Foure = riskData?.filter(
        (item) => item.ageInMonths > 12 && item.ageInMonths <= 18
      );
      var Five = riskData?.filter(
        (item) => item.ageInMonths > 18 && item.ageInMonths <= 24
      );
      var six = riskData?.filter((item) => item.ageInMonths > 64);
      let TwoCount = Two.length;
      let ThreeCount = Three.length;
      let FoureCount = Foure.length;
      let FiveCount = Five.length;
      let sixCount = six.length;
      setRiskDetailsBarList([Two, Three, Foure, Five, six]);
      setRiskDetailsBar([
        TwoCount,
        ThreeCount,
        FoureCount,
        FiveCount,
        sixCount,
      ]);
    } else {
      setRiskDetailsBar([[], [], [], [], []]);
      setRiskDetailsBarList([[], [], [], [], []]);
    }
  }, [riskData]);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setPageLoading(loading);
      }, 2000);
    } else {
      setPageLoading(loading);
    }
  }, [loading]);
  useEffect(() => {
    if (fileData) { 
      if (fileData == "CSV data imported successfully.") { 
        getList();  
      } 
    }
  }, [fileData]);
  return (
    <>
      {pageLoading && (
        <div className="fullloader" style={pageLoading ? { zIndex: 1000 } : {}}>
          <div className="risk-loader"></div>
        </div>
      )}
      <div className="container-scroller">
        <Header
          headerSkins={headerSkins}
          peopleShow={peopleShow}
          getDropDownUser={getDropDownUser}
          getSetMenuMobile={getSetMenuMobile}
          getSetMenu={getSetMenu}
          onChange={onChange}
          getDropDownToDo={getDropDownToDo}
          yearRange={yearRange}
          riskDetails={riskDetails}
        />

        <div className="container-fluid page-body-wrapper">
          <Setting
            getSetSettingMenu={getSetSettingMenu}
            getSliderSkins={getSliderSkins}
            getHeadersSkins={getHeadersSkins}
            sliderSkins={sliderSkins}
            menuSettings={menuSettings}
          />
          <ToDoList toDoShow={toDoShow} getDropDownToDo={getDropDownToDo} />
          <nav
            className={
              menuStatus
                ? "sidebar sidebar-offcanvas active"
                : "sidebar sidebar-offcanvas"
            }
            id="sidebar"
          >
            <SideNavBar
              handleSideNavBarChange={handleSideNavBarChange}
              activeTab={activeTab}
              menuStatus={menuStatus}
            />
          </nav>
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-md-12 grid-margin">
                  <div className="row">
                    <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                      <h3 className="text-primary font-weight-bold">
                        Welcome, {userName}!
                      </h3>
                      <h6 className="font-weight-normal mb-0">
                        {" "}
                        <span className="text-primary"></span>
                      </h6>
                    </div>
                    <div className="col-12 col-xl-4">
                      <div className="justify-content-end d-flex">
                        <div className="dropdown flex-md-grow-1 flex-xl-grow-0"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 grid-margin stretch-card">
                  <div className="card tale-bg">
                    <div className="card-people mt-auto">
                      <img src={ImgBg} width={"100%"} />
                      <div className="weather-info">
                        <div className="d-flex">
                          <div>
                            <h2 className="mb-0 font-weight-normal"> </h2>
                          </div>
                          <div className="ml-2">
                            <h4 className="location font-weight-normal"> </h4>
                            <h6 className="font-weight-normal"></h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <RiskSummary
                    riskDetails={riskDetails}
                    riskSummaryChild={riskSummaryChild}
                  />
                </div>
              </div>
              <div className="row">
                {/* <div className="col-md-6 grid-margin stretch-card">
                  <div className="card position-relative">
                    <div className="card-people ">
                      <h3 style={{ textAlign: "center" }}> Risk By Status </h3>
                      <div style={{ textAlign: "center" }}>
                        <PieChart data={pieChartData} riskList={listData} setFilterRiskDataFunction={setFilterRiskDataFunction} />
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="col-md-6 grid-margin stretch-card">
                  <div className="card position-relative">
                    <div className="card-people ">
                      <h3 style={{ textAlign: "center" }}>
                        {" "}
                        Risk Status By Rating{" "}
                      </h3>
                      <div style={{ textAlign: "center" }}>
                        <Circularchart
                          data={CircularchartData}
                          setFilterRiskDataFunction={setFilterRiskDataFunction}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 grid-margin stretch-card">
                  <div className="card position-relative">
                    <div className="card-people ">
                      <h3 style={{ textAlign: "center" }}>
                        {" "}
                        Age of open risk from creation month{" "}
                      </h3>
                      <div style={{ textAlign: "center" }}>
                        <Columnchart
                          data={riskDetailsBar}
                          setFilterRiskDataFunction={setFilterRiskDataFunction}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {activeTab == "dashBoard" && (
                  <>
                    <div className="col-md-6 grid-margin stretch-card">
                      <div className="card position-relative">
                        <div className="card-people ">
                          <h3 style={{ textAlign: "center" }}>
                            {" "}
                            Risk Rating Category Wise
                          </h3>
                          <div style={{ textAlign: "center" }}>
                            <StackedBarChart
                              data={stackedChartData}
                              setFilterRiskDataFunction={
                                setFilterRiskDataFunction
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 grid-margin stretch-card">
                      <div className="card position-relative">
                        <div className="card-people ">
                          <h3 style={{ textAlign: "center" }}>
                            {" "}
                            No Of Risk In Category Wise{" "}
                          </h3>
                          <div style={{ textAlign: "center" }}>
                            <Barchart
                              data={barChartData}
                              setFilterRiskDataFunction={
                                setFilterRiskDataFunction
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="col-md-6 grid-margin stretch-card">
                  <div className="card position-relative">
                    <div className="card-people ">
                      <h3 style={{ textAlign: "center" }}>
                        {" "}
                        Risk count on a month basis ({yearRange.endYear.year})
                      </h3>
                      <div style={{ textAlign: "center" }}>
                        <LineChart
                          riskDetailsLine={riskDetailsLine}
                          yearRange={yearRange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 grid-margin stretch-card">
                  <div className="card position-relative">
                    <div className="card-people ">
                      <h3 style={{ textAlign: "center" }}> Risk Heat Map </h3>
                      <div style={{ textAlign: "center" }}>
                        <Heatmap riskDetailsHeat={riskDetailsHeat} />
                        <img src={ImgColor} alt="color" />
                        <div style={{ textAlign: "center", paddingBottom: 10 }}>
                          <i
                            className="material-icons"
                            style={{ fontSize: 14 }}
                          >
                            info_outline
                          </i>{" "}
                          Counts are based on the project risk.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="card position-relative">
                    <div className="card-people ">
                      <div className="row">
                        <div className="col-md-10">
                          <h3 style={{ textAlign: "center" }}>
                            {" "}
                            Risk which are not closed on target closure date{" "}
                          </h3>
                          <h6
                            style={{ textAlign: "center", padding: 10 }}
                            className="font-weight-normal mb-0"
                          >
                            {" "}
                            {selectTable && (
                              <>
                                {" "}
                                The status selected for the Target Closure Date{" "}
                              </>
                            )}
                            <span className="text-primary">{selectTable}</span>
                          </h6>
                        </div>
                        <div className="col-md-2" style={{ paddingTop: 50 }}>
                          { radioChartData.length>0 && 
                          <button
                            type="button"
                            className="btn btn-inverse-info btn-fw"
                            onClick={sendMail}
                          >
                            {" "}
                            Send Mail{" "}
                            <i
                              className="  btn-icon-append material-icons"
                              data-toggle="tooltip"
                              title="Send Mail"
                              style={{ fontSize: 13 }}
                            >
                              send
                            </i>{" "}
                          </button>}
                        </div>
                      </div>
                      <div style={{ textAlign: "center", paddingTop: 10 }}>
                        <div className="row">
                          <div className="col-md-4">
                            <RadialBar
                              data={radioChartData}
                              list={radioChartDataList}
                              tableChange={tableChange}
                            />
                          </div>
                          <div className="col-md-8">
                            <>
                              <ListGrid
                                data={
                                  "Open" == selectTable || !selectTable
                                    ? radioChartDataList.Open
                                    : selectTable == "WIP"
                                      ? radioChartDataList.WIP
                                      : selectTable == "Occurred"
                                        ? radioChartDataList.Occurred
                                        : []
                                }
                                gridClearFlag={gridClearFlag}
                                selectedRow={selectedRow}
                                flag={false}
                              />
                            </>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* {selectLabel == "WIP" && */}
              <>
                <div id="open-grid-modal" className="modal-window">
                  <div>
                    <a href="#" title="Close" className="modal-close">
                      X
                    </a>
                    <div className="row">
                      <div className="col-md-9">
                        <h3 style={{ textAlign: "center" }}>
                          {" "}
                          Awaiting Approval Risk List{" "}
                        </h3>
                      </div>
                      <div className="col-md-2 mb-2" style={{ paddingTop: 25 }}>
                        <button
                          type="button"
                          className="btn btn-inverse-info btn-fw"
                          onClick={sendMail}
                        >
                          {" "}
                          Send Mail{" "}
                          <i
                            className="  btn-icon-append material-icons"
                            data-toggle="tooltip"
                            title="Send Mail"
                            style={{ fontSize: 13 }}
                          >
                            send
                          </i>{" "}
                        </button>
                      </div>
                    </div>
                    {/* <h6></h6> */}
                    <ListGrid
                      data={riskDetails.awaitingApprovalList}
                      selectedRow={selectedRow}
                      flag={true}
                      gridClearFlag={gridClearFlag}
                    />
                  </div>
                </div>
              </>
              {/* } */}
              <div className="row">
                <div className="col-md-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body" style={{ padding: 0 }}>
                      <div className="row">
                        <div className="col-12">
                          <div className="table-responsive">
                            {/* <h3 className="ml-3">Risk List</h3> */}
                            {selectChart != null && (
                              <div className="row">
                                <div className="col-md-8">
                                  <h3 style={{ textAlign: "center" }}>
                                    {" "}
                                    {selectChart == "donut"
                                      ? "Risk By Status"
                                      : selectChart == "pie"
                                        ? "Risk Status By Rating"
                                        : selectChart == "barChart"
                                          ? "No Of Risk In Category Wise"
                                          : selectChart == "bar"
                                            ? "Risk Rating Category Wise"
                                            : selectChart == "bar3"
                                              ? "Age of Open Risk from Creation Date"
                                              : selectChart == "barcolumn"
                                                ? "Risk Status By Month-wise"
                                                : selectChart == "tiles"
                                                  ? `Risk Status ${
                                                      selectLabel == "WIP"
                                                        ? "Work In Progress"
                                                        : selectLabel
                                                    }`
                                                  : ""}{" "}
                                  </h3>
                                  {selectChart == "bar" && (
                                    <h6
                                      style={{
                                        textAlign: "center",
                                        padding: 10,
                                      }}
                                      className="font-weight-normal mb-0"
                                    >
                                      {" "}
                                      Selected Catagery{" "}
                                      <span className="text-primary">
                                        {catageryLabel}
                                      </span>
                                    </h6>
                                  )}
                                  {selectLabel && (
                                    <h6
                                      style={{ textAlign: "center" }}
                                      className="font-weight-normal mb-0"
                                    >
                                      {" "}
                                      Selected status{" "}
                                      <span className="text-primary">
                                        {selectLabel == "WIP"
                                          ? "Work In Progress"
                                          : selectLabel}
                                      </span>
                                    </h6>
                                  )}
                                </div>
                                <div
                                  className="col-md-4"
                                  style={{ paddingTop: 40 }}
                                >
                                  <div className="row">
                                    <div className="">
                                      <a
                                        href="#open-grid-modal"
                                        className="btn btn-inverse-info btn-fw mb-2 mr-2"
                                      >
                                        Remainder Mail For Approval
                                      </a>
                                    </div>
                                    <button
                                      type="button"
                                      className="btn btn-inverse-info btn-fw mb-2"
                                      onClick={clearFilter}
                                    >
                                      {" "}
                                      Reset
                                      {/* <i
                                      className="material-icons"
                                      data-toggle="tooltip"
                                      title="Refresh List"
                                      style={{ fontSize: 14 }}
                                    >
                                      refresh
                                    </i>{" "} */}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                            {selectChart == null && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "end",
                                }}
                                className="mt-3 mr-2"
                              >
                                {listData.length>0 &&  
                                <a
                                  href="#open-grid-modal"
                                  className="btn btn-inverse-info btn-fw mb-2 mr-2"
                                >
                                  Remainder Mail For Approval
                                </a>
                                }
                              </div>
                            )}
                            {/* <br></br> */}
                            <div className="p-3">
                              <ListGrid2
                                data={listData}
                                setFilterRiskDataFunction={
                                  setFilterRiskDataFunction
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="footer">
              <p style={{ textAlign: "center", color: "#fff" }}>
                © Aspire Systems 1996-2023
              </p>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  // count: state.counter.count,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

Home.propTypes = {
  data: PropTypes.any,
  setFilterRiskDataFunction: PropTypes.any,
};
