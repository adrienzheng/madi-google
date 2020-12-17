import React from "react";
import { SwitchTransition, CSSTransition } from "react-transition-group"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography
} from "@material-ui/core";

import { Feedback, Info } from '@material-ui/icons';

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
  const [currentData, setData] = React.useState(null);
  const [currentPoint, setPoint] = React.useState(null);
  const [currentPointVariable, setPointVariable] = React.useState(null);
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
              y: parseInt((1 - point["class_prob_observed"])*1000)/1000
            })
          } else {
            chartData.push({
              id: index,
              x: point[`${currentVariable}_observed`],
              y: parseInt((1 - point["class_prob_observed"])*1000)/1000
            })
          }
        }
      })
      setCategories(categories)
      setData(chartData)
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
    setPointVariable(null)
  };

  const changePointVariable = variable => {
    if (variable !== "Others") setPointVariable(variable)
    if(currentPointVariable === variable) setPointVariable(null)
  }

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
      })
      bd["Others"] = `${parseInt(others * 10) / 10}%`
      return bd
    }
  };

  const vname = {
    "TransactionAmt": "Transaction Amount",
    "TransactionDT": "Transaction Time Delta",
    "P_emaildomain": "Email Domain (Purchaser)",
    "R_emaildomain": "Email Domain (Receiver)",
    "card4": "Card Company",
    "card6": "Payment Type",
    "dist1": "Distance",
    "addr1": "Billing Region",
    "DeviceType": "Device Type",
    "Others": "Others"
  }

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
            step={0.1}
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
                2:1
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
              <MenuItem value={"TransactionAmt"}>Transaction Amount($)</MenuItem>
              <MenuItem value={"TransactionDT"}>Transaction Time Delta(Second)</MenuItem>
              <MenuItem value={"P_emaildomain"}>Email Domain (Purchaser)</MenuItem>
              <MenuItem value={"R_emaildomain"}>Email Domain (Recipient)</MenuItem>
              <MenuItem value={"card4"}>Card Company</MenuItem>
              <MenuItem value={"card6"}>Payment Type</MenuItem>
              <MenuItem value={"dist1"}>Distance(Miles)</MenuItem>
              <MenuItem value={"addr1"}>Billing Region</MenuItem>
              <MenuItem value={"DeviceType"}>Device Type</MenuItem>
            </Select>
          </FormControl>
        </div>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            title: {
              text: undefined
            },
            chart: {
              type: "scatter",
              zoomType: "xy"
            },
            legend: {
              enabled: false
            },
            tooltip: {
              headerFormat:
                `<span style="font-size:10px">${vname[currentVariable]}: {point.key}</span>`,
              pointFormat:
                `<table><tbody>
                  <tr><td>Anomalous Likelihood: {point.y}</td></tr>
                </tbody>`,
              footerFormat: "</table>",
              shared: true,
              useHTML: true
            },
            xAxis: {
              title: {
                enabled: true,
                text: `${vname[currentVariable]}`
              },
              categories: categories.length>0 ? categories : false,
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
                },
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
                color: "rgba(216, 67, 21, .5)",
                data: currentData
              }
            ],
            credits: {
              text: "Powered by MADI by Google"
            }
          }}
        />
        <div className="note"><Info color="primary" fontSize="small"/>Brush over the scatterplot to view only points in that selection.</div>
        <div className="note"><Info color="primary" fontSize="small"/>Clicking on an individual point in the Anomalous Likelihood cluster will show the breakdown of attributes that contribute to this point.</div>
      </div>
      <div id="point-details" className="section box">
        <Typography variant="h6" component="h3">
          <b>Point Details</b>
        </Typography>
        <SwitchTransition><CSSTransition
          key={currentPoint}
          classNames="fade"
          addEndListener={(node, done) => {
            node.addEventListener("transitionend", done, false);
          }}
        >
          {!currentPoint ? <div id="no-point-message" className="fade-transition-cont">
            <Feedback color="disabled" style = {{fontSize: 64}}/>
            <div>Nothing to see here ... <br /> Please click on an individual point in the graph above <br/> to see the breakdown of attributes that contribute to this point.</div>
          </div> : <div className="fade-transition-cont">
            <div id="breakdown-cont">
              <Typography component="h4">
                <b>Point Breakdown for Point #{("0000"+currentPoint).slice(-5)}</b>
              </Typography>
              <div id="breakdown">
                {Object.entries(getPointDetails()).map(([key, value], index) => (
                  <div
                    id = {Math.random()}
                    className="breakdown-variable"
                    key={key === "Others" ? "Others" : index}
                    onClick = {() => changePointVariable(key)}
                    style={{
                      flexBasis: value,
                      cursor: key !== "Others" && "pointer",
                      backgroundColor: currentPointVariable ? (
                        key === currentPointVariable ? "#90caf9" : "lightgray"
                      ):(key === "Others" ? (
                        "lightgray"
                      ):([
                          "#ef9a9a",
                          "#ce93d8",
                          "#9fa8da",
                          "#81d4fa",
                          "#80cbc4",
                          "#c5e1a5",
                          "#ffe082"
                      ][index % 7]))
                    }}
                  >
                    <div><b>{vname[key]}</b></div> 
                    <div>{value}</div>
                  </div>
                ))}
              </div>
              <div className="note"><Info color="primary" fontSize="small"/>Percentages are allotted to these attributes to help you understand what attributes contributed most to the resulting anomaly score. Variables with a percentage attribution lower than 0.5% and variables that are not included in the filters are aggregated into the “Others” category.</div>
              <div className="note"><Info color="primary" fontSize="small"/>Clicking on a variable will highlight the information relevant to it. To deselect, simply click on the variable again.</div>
            </div>
            <div id="detail-cont">
              <div id="risk-level">
                <Typography component="h4"><b>Risk Level</b></Typography>
                <table><tbody>
                  <tr><td>Threshold False Positive Rate:</td><td>2:1</td></tr>
                  <tr><td>Anomalous Likelihood:</td><td>{parseInt((1-data[currentPoint]["class_prob_observed"])*1000)/10+"%"}</td></tr>
                </tbody></table>
              </div>
              <div id="transaction-info">
                <Typography component="h4"><b>Transaction Information</b></Typography>
                <table><tbody>
                  <tr className={currentPointVariable === "card6" && "current"}><td>Payment Type:</td><td>{data[currentPoint]["card6_observed"]}</td></tr>
                  <tr className={currentPointVariable === "card4" && "current"}><td>Card Company:</td><td>{data[currentPoint]["card4_observed"]}</td></tr>
                  <tr className={currentPointVariable === "TransactionDT" && "current"}><td>Transaction Time Delta:</td><td>{data[currentPoint]["TransactionDT_observed"]} seconds</td></tr>
                  <tr className={currentPointVariable === "TransactionAmt" && "current"}><td>Transaction Amount:</td><td>${data[currentPoint]["TransactionAmt_observed"]}</td></tr>
                  <tr className={currentPointVariable === "addr1" && "current"}><td>Billing Region:</td><td>{data[currentPoint]["addr1_observed"] > 0 ? data[currentPoint]["addr1_observed"] : "N/A"}</td></tr>
                  <tr className={currentPointVariable === "dist1" && "current"}><td>Distance:</td><td>{data[currentPoint]["dist1_observed"] > 0 ? data[currentPoint]["dist1_observed"] + " miles" : "N/A"} </td></tr>
                </tbody></table>
              </div>
              <div id="device-info">
                <Typography component="h4"><b>Device and Contact Information</b></Typography>
                <table><tbody>
                  <tr className={currentPointVariable === "DeviceType" && "current"}><td>Device Type:</td><td>{data[currentPoint]["DeviceType_observed"]}</td></tr>
                  <tr className={currentPointVariable === "P_emaildomain" && "current"}><td>Purchaser's Email Domain:</td><td>{data[currentPoint]["P_emaildomain_observed"]}</td></tr>
                  <tr className={currentPointVariable === "R_emaildomain" && "current"}><td>Recipient's Email Domain:</td><td>{data[currentPoint]["R_emaildomain_observed"]}</td></tr>
                </tbody></table>
              </div>
            </div>
          </div>}
        </CSSTransition></SwitchTransition>
      </div>
    </div>
  );
}
