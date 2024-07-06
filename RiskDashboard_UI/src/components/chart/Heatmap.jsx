import React, { useEffect, useState } from "react";
import { HeatMapGrid } from "react-grid-heatmap";
import PropTypes from "prop-types";
import imgsrc from "./../../assets/images/color.png";
const xLabels = ["1", "2", "3", "4", "5"];
const yLabels = ["5", "4", "3", "2", "1"];


export const Heatmap = (props) => {
  const { riskDetailsHeat } = props;
  const [riskDetails, setRiskDetails] = useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ]);

  useEffect(() => {
    if (riskDetailsHeat) {
      setRiskDetails(riskDetailsHeat);
    }
  }, [riskDetailsHeat]);
  return (
    <>
      <div className="row">
        <div className="  rotated" style={{ marginLeft: 20, marginRight: 10 }}>
          Impact{" "}
        </div>
        <div
          className="  "
          style={{
            width: "80%",
            fontFamily: "sans-serif",
            paddingRight: 10,
          }}
        >
          <HeatMapGrid
            data={riskDetails}
            xLabels={xLabels}
            yLabels={yLabels}
            // Reder cell with tooltip
            cellRender={(x, y, value) => (
              <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
            )}
            xLabelsStyle={(index) => ({
              // color: index % 2 ? "transparent" : "#777",
              fontSize: "1.25rem",
            })}
            yLabelsStyle={() => ({
              content: "Probability",
              fontSize: "1.25rem",
              textTransform: "uppercase",
              color: "#777",
            })}
            cellStyle={(_x, _y, ratio) => ({
              // background: `${(_x + _y)>4?"yellow":"red"}`,
              background: `${
                (_x > 0 && _y == 0) ||
                (_y == 1 && _x > 1) ||
                (_y == 2 && _x > 2) ||
                (_y == 3 && _x > 3) ||
                (_y == 1 && _x == 1) ||
                (_y == 2 && _x == 2) ||
                (_y == 3 && _x == 3) ||
                (_y == 4 && _x == 4)
                  ? "#11b684"
                  : (_x == _y && _x != 4) ||
                      (_y == 2 && _x == 1) ||
                      (_y == 2 && _x == 3) ||
                      (_y == 1 && _x == 0) ||
                      (_y == 3 && _x == 1) ||
                      (_y == 3 && _x == 2) ||
                      (_y == 4 && _x == 3)
                    ? "#f9cd13"
                    : "#f92d49"
              }`,
              fontSize: "0.9rem",

              color: "white",
            })}
            cellHeight="3.5rem"
            xLabelsPos="bottom"
            // onClick={(ratio) => alert(`Clicked (${ratio} )`)}
            // yLabelsPos="right"
            // square
          />
          <div style={{ textAlign: "center" }}> Probability</div>
        </div>
      </div>
    </>
  );
};
Heatmap.propTypes = {
  riskDetailsHeat: PropTypes.any,
};

