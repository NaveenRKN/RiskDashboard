import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInfoFileData } from "../store/redux/actions/risk";
import moment from "moment";
import PropTypes from "prop-types";

const Upload = (props) => {
  const [file, setFile] = useState(null);
  const { fileChangedHandler } = props;
  const { fileInfo, fileData } = useSelector((state) => state.UploadFileStore),
    dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfoFileData());
  }, []);
  useEffect(() => {
    if (fileInfo && fileInfo[0]?.importedDate)
      setFile(fileInfo[0]?.importedDate);
  }, [fileInfo]);
  
  useEffect(() => {
    if (fileData) { 
      if (fileData == "CSV data imported successfully.") { 
       
      } 
    }
  }, [fileData]);

  return (
    <div>
      {" "}
      <div style={{ marginTop: 10 }} className="mr-3 mb-2 nav-link">
        <a className="nav-link dropdown-toggle" href="#open-modal"  >
          <i
            className="material-icons nav-link"
            style={{ fontSize: "30px" }}
          >
            file_upload
          </i>
        </a>
      </div>
      <div id="open-modal" className="modal-window">
        <div>
          <label>File Upload</label>
          <a href="#" title="Close" className="modal-close">
            X
          </a>
          <div>
            <form className="my-form">
              <div id="drop-area" htmlFor="fileElem">
                <label htmlFor="fileElem">
                  <p style={{ textAlign: "center" }}>
                    <i
                      className="material-icons"
                      style={{ fontSize: "30px", color: "#6c7383" }}
                    >
                      file_upload
                    </i>
                  </p>
                  <p>
                    Drag and Drop Files Here (or) Click Icon to Upload a File
                  </p>
                  <input
                    type="file"
                    id="fileElem"
                    onChange={(event) => {
                      fileChangedHandler(event);
                    }}
                  />
                </label>
              </div>
            </form>
            <div style={{ margin: 10, fontSize: 16 }}>
              <div style={{ textAlign: "left", paddingBottom: 10 }}>
                <i className="material-icons" style={{ fontSize: 14 }}>
                  info_outline
                </i>
                Supported File Type .csv
              </div>
              <div style={{ textAlign: "left", paddingBottom: 10 }}>
                <i className="material-icons" style={{ fontSize: 14 }}>
                  info_outline
                </i>
                Last File Uploaded on{" "}
                <b>
                  {file ? moment(file).format("MMMM Do YYYY, h:mm:ss a") : ""}
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
Upload.propTypes = {
  fileChangedHandler: PropTypes.any,
  setFile: PropTypes.any,
};
