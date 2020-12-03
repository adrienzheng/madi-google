import React from 'react'
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
import highcharts3d from 'highcharts/highcharts-3d';

import "../styles/ViewThree.scss";

import {
  aboutMadiText,
  aucText
} from "../static";

highcharts3d(Highcharts);

export default function ViewThree() {

  const options = {
    chart: {
      type: 'areaspline',
      height: 9/16 * 100 + "%",
    },
    title: {
      text: ''
    },
    yAxis: {
      min: 0,
      max: 1,
      title: {
        text: "True Positve Rate"
      }
    },
    xAxis: {
      min: 0,
      max: 1,
      title: {
        text: "False Positive Rate"
      }
    },
    series: [
      {
        name: "MADI",
        data: [
          {x: 0, y: 0},
          {x: 0.1, y: 0.5},
          {x: 0.2, y: 0.7},
          {x: 0.3, y: 0.8},
          {x: 0.4, y: 0.85},
          {x: 0.5, y: 0.88},
          {x: 0.6, y: 0.9},
          {x: 0.7, y: 0.91},
          {x: 0.8, y: 0.915},
          {x: 0.9, y: 0.92},
          {x: 1, y: 1}
        ]
      }
    ]
  }

  return (
    <div id="view-three">
      <Typography variant="h5" component="h2" align="center">
        MADI: Multidimensional, Multimodal Anomaly Detection with Interpretability
      </Typography>
      <div className="section box" id="about-madi-text">
        <Typography variant="h6" component="h3">
          <b>About</b>
        </Typography>
        {aboutMadiText.map(paragraph => 
          <Typography>{paragraph}</Typography>  
        )}
      </div>
      <div className="section box" id="auc-cont">
        <Typography variant="h6" component="h3">
          <b>AUC - ROC Curve of MADI on IEEE-CIS Fraud Detection Dataset</b>
        </Typography>
        <div id ="auc-wrapper">
          <div id="auc-box">
            <HighchartsReact 
              highcharts = {Highcharts}
              options={options}
            />
          </div>
          <div id="auc-description">
            {aucText.map(paragraph => 
              <Typography>{paragraph}</Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}