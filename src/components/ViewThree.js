import React from 'react'
import {
  Typography
} from "@material-ui/core";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highcharts3d from 'highcharts/highcharts-3d';

import "../styles/ViewThree.scss";

import {
  nsnn,
  nsrf,
  iso,
  ocsvm
} from '../auc'

import {
  aboutMadiText,
  aucGraph
} from "../static";

highcharts3d(Highcharts);

export default function ViewThree() {

  const madiOptions = {
    chart: {
      type: 'area',
      height: "100%",
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
        name: "NS-NN",
        data: nsnn
      },{
        name: "NS-RF",
        data: nsrf
      }
    ],
    credits: {
      text: "Powered by MADI by Google"
    }
  }

  const othersOptions = {
    chart: {
      type: 'area',
      height: "100%",
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
        name: "ISO",
        data: iso
      },{
        name: "OC-SVM",
        data: ocsvm
      }
    ],
    credits: {
      text: "Powered by MADI by Google"
    }
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
      <div className="section" id="auc-explanation">
        <div className="box">
          <Typography variant="h6" component="h3">
            <b>What is an AUC-ROC Curve?</b>
          </Typography>
          <Typography>The ROC curve shows the ratio between True Positive and False Positive rates at different classification thresholds. These thresholds are what is used in the AD Breakdown to adjust for the level of risk a user is willing to experience when looking at potentially anomalous transactions. AUC stands for Area Under the Curve, and represents the overall accuracy of an anomaly detection method at all thresholds.</Typography>
          {aucGraph}
        </div>
        <div className="box">
          <Typography variant="h6" component="h3">
            <b>How Can MADI be applied to the Transaction Fraud Space?</b>
          </Typography>
          <Typography>
            Machine learning has become a hot topic in the fraud detection industry as companies are switching from rule-based approaches to ML-based solutions. One major benefit that comes with using ML approaches is the ability for real-time processing of account behavior to determine whether a transaction might be fraudulent.
            <br/><br/>
            MADI’s advantage as a novel anomaly detection method is its interpretability.
          </Typography>
        </div>
      </div>
      <div className="section box">
        <Typography variant="h6" component="h3">
          <b>AUC - ROC Curve of MADI vs. Other Anomaly Detection Methods on IEEE-CIS Fraud Detection Dataset</b>
        </Typography>
        <div id ="auc-cont">
          <div className="auc-wrapper">
            <div className="auc-text">
              <Typography component="h3" variant="h6">MADI</Typography>
              <Typography>
                MADI uses two main approches: NS-NN (negative sampling neural networks) and NS-RF (negative sampling random forest).
              </Typography>
              <table>
                <tbody>
                  <tr><td></td><td>NS-NN</td><td>NS-RF</td></tr>
                  <tr><td>AUC Score</td><td>0.732</td><td>0.6482</td></tr>
                </tbody>
              </table>
            </div>
            <HighchartsReact 
              highcharts = {Highcharts}
              options={madiOptions}
            />
          </div>
          <div className="auc-wrapper">
            <div className="auc-text">
              <Typography component="h3" variant="h6">Others</Typography>
              <Typography>
                Here, we are comparing MADI's performances to those of two other popular methods, ISO and OC-SVM (One-Class Support Vector Machine).
              </Typography>
              <table>
                <tbody>
                  <tr><td></td><td>ISO</td><td>OC-SVM</td></tr>
                  <tr><td>AUC Score</td><td>0.6488</td><td>0.6447</td></tr>
                </tbody>
              </table>
            </div>
            <HighchartsReact 
              highcharts = {Highcharts}
              options={othersOptions}
            />    
          </div>
        </div>
      </div>
    </div>
  )
}