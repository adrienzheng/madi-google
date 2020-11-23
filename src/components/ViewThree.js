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

import { aboutMadiText } from "../static";

highcharts3d(Highcharts);

export default function ViewThree() {

  const options = {
    chart: {
      type: 'area',
    },
    title: {
      text: 'a 3D Scatter Chart'
    },
    yAxis: {
      min: 0,
      max: 1
    },
    xAxis: {
      min: 0,
      max: 1,
    },
    series: [
      {
        data: [
          [0, 0, 1]
          [.1, .1, 1],
          [.2, .7, 1],
          [.3, .8, 1],
          [.4, .85, 1],
          [.5, .88, 1],
          [.6, .9, 1],
          [.7, .91, 1],
          [.8, .915, 1],
          [.9, .912, 1],
          [1, 1, 1]
        ]
      }, {
        data: [
          [.1, .1, 2],
          [.2, .2, 2],
          [.3, .3, 2],
          [.4, .4, 2],
          [.5, .5, 2],
          [.6, .6, 2],
          [.7, .7, 2],
          [.8, .8, 2],
          [.9, .9, 2],
          [1, 1, 2]
        ]
      }, {
        data: [
          [.1, .1, 3],
          [.2, .2, 3],
          [.3, .3, 3],
          [.4, .4, 3],
          [.5, .5, 3],
          [.6, .6, 3],
          [.7, .7, 3],
          [.8, .8, 3],
          [.9, .9, 3],
          [1, 1, 3]
        ]
      }
    ]
  }

  return (
    <div id="view-three">
      <Typography variant="h5" component="h2" align="center">
        About Madi
      </Typography>
      <div className="section box" id="about-madi-text">
        <Typography variant="h6" component="h3">
          <b>Multidimensional multimodal Anomaly Detection with Interpretation (MADI)</b>
        </Typography>
        {aboutMadiText.map(paragraph => 
          <Typography>{paragraph}</Typography>  
        )}
      </div>
      <div className="section box" id="auc-cont">
        <Typography variant="h6" component="h3">
          <b>MADI's Performance</b>
        </Typography>
        <HighchartsReact 
          highcharts = {Highcharts}
          options={options}
        />
      </div>
    </div>
  )
}