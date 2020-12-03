import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography
} from "@material-ui/core";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "../styles/ViewOne.scss";

import { threshholdText, madiText } from "../static";

import { data } from "../data";

const marks = [
  { value: 0, label: "0" },
  { value: 0.1, label: "0.1" },
  { value: 0.2, label: "0.2" },
  { value: 0.3, label: "0.3" },
  { value: 0.4, label: "0.4" },
  { value: 0.5, label: "0.5" },
  { value: 0.6, label: "0.6" },
  { value: 0.7, label: "0.7" },
  { value: 0.8, label: "0.8" },
  { value: 0.9, label: "0.9" },
  { value: 1, label: "1" }
];

export default function ViewOne() {
  const [currentVariable, setVariable] = React.useState(1);
  const [currentData, setCurrentData] = React.useState(null);
  const [currentPoint, setPoint] = React.useState(null);
  const [threshold, setThreshold] = React.useState(0.5);

  React.useEffect(() => {
    let chartData = [];
    data.forEach((point, index) => {
      if (1 - point["class_prob"] >= 0.5) {
        chartData.push({
          id: index,
          x: point[`V${currentVariable}_value`],
          y: 1 - point["class_prob"]
        });
      }
    });
    setCurrentData(chartData);
  }, []);

  React.useEffect(() => {
    let timeout = setTimeout(() => {
      let chartData = [];
      data.forEach((point, index) => {
        if (1 - point["class_prob"] >= threshold) {
          chartData.push({
            id: index,
            x: point[`V${currentVariable}_value`],
            y: 1 - point["class_prob"]
          });
        }
      });
      setCurrentData(chartData);
    }, 200);
    return () => clearTimeout(timeout);
  }, [currentVariable, threshold]);

  const changeFilter = event => {
    setVariable(event.target.value);
  };

  const changeThreshold = (event, newValue) => {
    setThreshold(newValue);
  };

  const changePoint = event => {
    setPoint(event.point.id);
  };

  const getPointDetails = () => {
    if (currentPoint) {
      let p = data[currentPoint];
      let bd = {};
      let others = 100;
      Object.keys(p).forEach(key => {
        if (key.indexOf("attr") > -1) {
          if (p[key] > 0.05) {
            let percentage = parseInt(p[key] * 1000) / 10;
            bd[key.slice(0, key.indexOf("_"))] = `${percentage}%`;
            others -= percentage;
          }
        }
      });
      bd["Others"] = `${parseInt(others * 10) / 10}%`;
      console.log(bd);
      return bd;
    }
  };

  return (
    <div id="view-one">
      <Typography variant="h5" component="h2" align="center">
        Detecting Anomalies to Assist Prediction of Fraudulent Transactions
      </Typography>
      <div className="section">
        <Typography>
          {madiText}
        </Typography>
      </div>
      <div id="controls" className="section">
        <div id="threshhold" className="box">
          <Typography variant="h6" component="h3">
            <b>Threshold</b>
          </Typography>
          <Typography>{threshholdText}</Typography>
          <Slider
            id="threshold-slider"
            value={threshold}
            onChange={changeThreshold}
            valueLabelDisplay="auto"
            min={0}
            max={1}
            step={0.01}
            marks={marks}
          />
        </div>
        <div id="summary" className="box">
          <Typography variant="h6" component="h3">
            <b>Threshold Summary</b>
          </Typography>
          <ul>
            <li>
              <Typography>
                <strong>Total Points: </strong>
                {data.length}
              </Typography>
            </li>
            <li>
              <Typography>
                <strong>Anomalous Points Above threshhold: </strong>
                {currentData && currentData.length}
              </Typography>
            </li>
            <li>
              <Typography color="error">
                <strong>Anomalous Score: </strong>
                {currentData &&
                  parseInt((currentData.length / data.length) * 1000) / 10 +
                    "%"}
              </Typography>
            </li>
          </ul>
        </div>
      </div>
      <div id="scatter-cont" className="section box">
        <Typography variant="h6" component="h3">
          <b>Anomalous Likelihood by Point</b>
        </Typography>
        <div id="scatter-filters">
          <FormControl variant="outlined">
            <InputLabel>Filter By</InputLabel>
            <Select
              onChange={changeFilter}
              value={currentVariable}
              label="Filter By"
            >
              <MenuItem value={1}>V1</MenuItem>
              <MenuItem value={2}>V2</MenuItem>
              <MenuItem value={3}>V3</MenuItem>
              <MenuItem value={4}>V4</MenuItem>
            </Select>
          </FormControl>
        </div>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            title: {
              text: `Anomalous Likelihood by V${currentVariable}`
            },
            chart: {
              type: "scatter",
              zoomType: "xy"
            },
            xAxis: {
              title: {
                enabled: true,
                text: `V${currentVariable}`
              },
              startOnTick: true,
              endOnTick: true,
              showLastLabel: true
            },
            yAxis: {
              title: {
                text: "Likely Hood Percentage"
              }
            },
            plotOptions: {
              scatter: {
                marker: {
                  radius: 5,
                  states: {
                    hover: {
                      enabled: true,
                      lineColor: "rgb(100,100,100)"
                    }
                  }
                },
                states: {
                  hover: {
                    marker: {
                      enabled: false
                    }
                  }
                }
              },
              series: {
                cursor: "pointer",
                point: {
                  events: {
                    click: changePoint
                  }
                }
              }
            },
            series: [
              {
                name: "Anomalous Point",
                color: "rgba(223, 83, 83, .5)",
                data: currentData
              }
            ],
            credits: {
              text: "Powered by MADI by Google"
            }
          }}
        />
      </div>
      <div id="point-details" className="section box">
        <Typography variant="h6" component="h3">
          <b>Point Details</b>
        </Typography>
        <Typography>
          Clicking on an individual point in the Anomalous Likelihood cluster
          will show the breakdown of attributes that contribute to this point.
          Percentages are allotted to these attributes to help you understand
          what attributes contributed most to the resulting anomalous score.
          <br />
          <br />
          Try clicking on an attribute in the Variable Breakdown to reveal more
          insights!
        </Typography>
        {
          <div id="breakdown-cont" className={currentPoint ? "visible" : ""}>
            <Typography component="h4">
              <b>Point Breakdown</b>
            </Typography>
            <div id="breakdown">
              {currentPoint &&
                Object.entries(getPointDetails()).map(([key, value], index) => (
                  <div
                    className="breakdown-variable"
                    key={key === "Others" ? "Others" : index}
                    style={{
                      flexBasis: value,
                      backgroundColor:
                        key === "Others"
                          ? "lightgray"
                          : [
                              "#9DD1C7",
                              "#BDBAD7",
                              "#EB8777",
                              "#89B1D0",
                              "#BCDC78"
                            ][index % 5]
                    }}
                  >
                    {key}
                  </div>
                ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
}
