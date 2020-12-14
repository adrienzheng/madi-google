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
import Boost from 'highcharts/modules/boost';

import "../styles/ViewOne.scss";

import { threshholdText, madiText } from "../static";

import { data } from "../data";

Boost(Highcharts);

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
  const [currentVariable, setVariable] = React.useState("TransactionAmt");
  const [currentData, setCurrentData] = React.useState(null);
  const [currentPoint, setPoint] = React.useState(null);
  const [threshold, setThreshold] = React.useState(0.5);
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    let timeout = setTimeout(() => {
      let chartData = []
      let categories = []
      let cat_map = {}
      data.forEach((point, index) => {
        if (1 - point["class_prob_observed"] >= threshold) {
          if(["P_emaildomain", "R_emaildomain", "card4", "card6", "DeviceType", "addr1"].includes(currentVariable)) {          
            let x
            if(cat_map[point[`${currentVariable}_observed`]] !== undefined) {
              x = cat_map[point[`${currentVariable}_observed`]]              
            } else {
              x = categories.length
              categories.push(point[`${currentVariable}_observed`])
              cat_map[point[`${currentVariable}_observed`]] = x
            }
            chartData.push({
              id: index,
              x: x,
              y: 1 - point["class_prob_observed"]
            })
          } else {
            chartData.push({
              id: index,
              x: point[`${currentVariable}_observed`],
              y: 1 - point["class_prob_observed"]
            })
          }
        }
      })

      setCurrentData(chartData)
      setCategories(categories)
    }, 500);
    return () => clearTimeout(timeout)
  }, [currentVariable, threshold])

  const changeFilter = event => {
    setVariable(event.target.value)
  };

  const changeThreshold = (event, newValue) => {
    setThreshold(newValue)
  };

  const changePoint = event => {
    setPoint(event.point.id)
  };

  const getPointDetails = () => {
    if (currentPoint) {
      let p = data[currentPoint]
      let bd = {};
      let others = 100;
      Object.keys(p).forEach(key => {
        if (key.indexOf("attr") > -1) {
          if (p[key] > 0.005) {
            let percentage = parseInt(p[key] * 1000) / 10;
            bd[key.slice(0, key.lastIndexOf("_"))] = `${percentage}%`
            others -= percentage
          }
        }
      });
      bd["Others"] = `${parseInt(others * 10) / 10}%`
      console.log(bd)
      return bd
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
                <strong>False Positive Rate: </strong>
                {"2:1"}
              </Typography>
            </li>
            <li>
              <Typography>
                <strong>Total Points: </strong>
                {data.length}
              </Typography>
            </li>
            <li>
              <Typography>
                <strong>Anomalous Points Above Threshold: </strong>
                {currentData && currentData.length}
              </Typography>
            </li>
            <li>
              <Typography color="error">
                <strong>Percentage of Anomalous Points in Dataset: </strong>
                {currentData &&
                  parseInt((currentData.length / data.length) * 1000) / 10 +
                    "% Anomalous"}
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
              <MenuItem value={"TransactionAmt"}>Transaction Amount ($)</MenuItem>
              <MenuItem value={"TransactionDT"}>Transaction Date (Relative)</MenuItem>
              <MenuItem value={"P_emaildomain"}>Email Domain (Purchaser)</MenuItem>
              <MenuItem value={"R_emaildomain"}>Email Domain (Recipient)</MenuItem>
              <MenuItem value={"card4"}>Card Company</MenuItem>
              <MenuItem value={"card6"}>Card Type</MenuItem>
              <MenuItem value={"dist1"}>Distance</MenuItem>
              <MenuItem value={"addr1"}>Address</MenuItem>
              <MenuItem value={"DeviceType"}>Device Type</MenuItem>
            </Select>
          </FormControl>
        </div>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            title: {
              text: `Anomalous Likelihood by ${currentVariable}`
            },
            chart: {
              type: "scatter",
              zoomType: "xy"
            },
            xAxis: {
              title: {
                enabled: true,
                text: `${currentVariable}`
              },
              categories: categories.length>0 ? categories : undefined,
              startOnTick: true,
              endOnTick: true,
              showLastLabel: true
            },
            yAxis: {
              title: {
                text: "Likelihood Percentage"
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
                boostThreshold: 1000,
                turboThreshold: 5000,
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
          what attributes contributed most to the resulting anomaly score.
        </Typography>

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
                  <div>{key}</div> 
                  <div>{value}</div>
                </div>
              ))}
          </div>
        </div>
        <div id="detail-cont" className={currentPoint ? "visible" : ""}>
          <div id="risk-level">
            <Typography component="h4"><b>Rist Level</b></Typography>
            <table>
              <tr><td>Threshold False Positive Rate:</td><td>2:1</td></tr>
              <tr><td>Anomalous Likelihood:</td><td>{currentPoint && parseInt(data[currentPoint]["class_prob_observed"]*1000)/10+"%"}</td></tr>
              <tr><td>Recommended action:</td><td>Decline the transaction</td></tr>
            </table>
          </div>
          <div id="transaction-info">
            <Typography component="h4"><b>Transaction Information</b></Typography>
            <table>
              <tr><td>Payment Type:</td><td>{currentPoint && data[currentPoint]["card6_observed"]}</td></tr>
              <tr><td>Card Company:</td><td>{currentPoint && data[currentPoint]["card4_observed"]}</td></tr>
              <tr><td>Relative Date of Transaction:</td><td>{currentPoint && data[currentPoint]["TransactionDT_observed"]}</td></tr>
              <tr><td>Transaction Amount:</td><td>${currentPoint && data[currentPoint]["TransactionAmt_observed"]}</td></tr>
              <tr><td>Billing Address:</td><td>{currentPoint && data[currentPoint]["addr1_observed"]}</td></tr>
            </table>
          </div>
          <div id="device-info">
            <Typography component="h4"><b>Device and Contact Information</b></Typography>
            <table>
              <tr><td>Device Type:</td><td>{currentPoint && data[currentPoint]["DeviceType_observed"]}</td></tr>
              <tr><td>Purchaser's Email Domain:</td><td>{currentPoint && data[currentPoint]["P_emaildomain_observed"]}</td></tr>
              <tr><td>Recipient's Email Domain:</td><td>{currentPoint && data[currentPoint]["R_emaildomain_observed"]}</td></tr>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
