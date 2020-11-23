import React from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import Highcharts, { setOptions } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { data } from "../data";
export default function ViewTwo() {
  const [currentVariable, setVariable] = React.useState(1);
  const [currentData, setCurrentData] = React.useState(null);
  const [currentPoint, setPoint] = React.useState(null);
  const [threshold, setThreshold] = React.useState(0.5);

  React.useEffect(() => {
    let chartData = [];
    data.forEach((point, index) => {
      if (point["class_prob"] >= 0.5) {
        chartData.push({
          id: index,
          x: currentVariable,
          y: point["class_prob"]
        });
      }
    });
    setCurrentData(chartData);
    console.log(chartData);
  }, []);

  return (
    <div id="viewTwo">
      {" "}
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          chart: {
            type: "column"
          },
          title: {
            text: "Payment"
          },
          subtitle: {
            text:
              "Blurb about ___% that this feature overall contributes to anomolies"
          },
          xAxis: {
            categories: ["Debit", "Credit"],
            crosshair: true
          },
          yAxis: {
            min: 0,
            title: {
              text: "# of Anomalies"
            }
          },
          tooltip: {
            headerFormat:
              '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat:
              '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: "</table>",
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          series: [
            {
              data: [49.9, 71.5]
            }
          ]
        }}
      />
    </div>
  );
}
