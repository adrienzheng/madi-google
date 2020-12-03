import React from "react";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import Highcharts, { setOptions } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { data } from "../data";
import "../styles/ViewTwo.scss";
export default function ViewTwo() {
  const [currentVariable, setVariable] = React.useState(1);
  const [currentData, setCurrentData] = React.useState(null);
  const [currentPoint, setPoint] = React.useState(null);
  const [threshold, setThreshold] = React.useState(0.5);

  React.useEffect(() => {
    let timeout = setTimeout(() => {
      let chartData = [];

      var datanew = data.filter(function(d) {
        return 1 - d["class_prob"] >= 0.5;
      });
      var lowest = Number.POSITIVE_INFINITY;
      var highest = Number.NEGATIVE_INFINITY;
      var tmp;
      for (var i = datanew.length - 1; i >= 0; i--) {
        tmp = datanew[i].V1_value;
        if (tmp < lowest) lowest = tmp;
        if (tmp > highest) highest = tmp;
      }
      // console.log(highest, lowest);
      var maxmin = highest - lowest;
      var skips = maxmin / 10;

      var lowest2 = skips * 2 + lowest;
      var lowest3 = skips * 3 + lowest;
      var lowest4 = skips * 4 + lowest;
      var lowest5 = skips * 5 + lowest;
      var lowest6 = skips * 6 + lowest;
      var lowest7 = skips * 7 + lowest;
      var lowest8 = skips * 8 + lowest;
      var lowest9 = skips * 9 + lowest;
      var lowest10 = skips * 10 + lowest;
      // console.log(skips);
      var total = 0;
      datanew.forEach((point, index) => {
        // console.log("hello");

        if (lowest <= point["V1_value"] && point["V1_value"] <= lowest2) {
          console.log(lowest, point["V1_value"], lowest2);
          var localmax = lowest2;
          var bucketname = "bucket1";
          total = total + 1;
          // console.log(localmax, bucketname, lowest);

          var idbuck = chartData.findIndex(d => d.x == bucketname);
          // here you can check specific property for an object whether it exist in your array or not

          idbuck === -1
            ? chartData.push({ x: bucketname, y: 1 })
            : (chartData[chartData.findIndex(d => d.x == bucketname)].y += 1);
        }
        if (lowest2 <= point["V1_value"] && point["V1_value"] <= lowest3) {
          console.log(lowest2, point["V1_value"], lowest3);
          var localmax = lowest3;
          var bucketname = "bucket2";
          total = total + 1;
          // console.log(localmax, bucketname, lowest);

          var idbuck = chartData.findIndex(d => d.x == bucketname);
          // here you can check specific property for an object whether it exist in your array or not

          idbuck === -1
            ? chartData.push({ x: bucketname, y: 1 })
            : (chartData[chartData.findIndex(d => d.x == bucketname)].y += 1);
        }

        if (lowest3 <= point["V1_value"] && point["V1_value"] <= lowest4) {
          console.log(lowest3, point["V1_value"], lowest4);
          var localmax = lowest4;
          var bucketname = "bucket3";
          total = total + 1;
          // console.log(localmax, bucketname, lowest);

          var idbuck = chartData.findIndex(d => d.x == bucketname);

          idbuck === -1
            ? chartData.push({ x: bucketname, y: 1 })
            : // this right here is wrong
              (chartData[chartData.findIndex(d => d.x == bucketname)].y += 1);
        }
        if (lowest4 <= point["V1_value"] && point["V1_value"] <= 3000) {
          console.log(lowest4, point["V1_value"], lowest5);
          var localmax = lowest5;
          var bucketname = "bucket4";
          total = total + 1;
          // console.log(localmax, bucketname, lowest);

          var idbuck = chartData.findIndex(d => d.x == bucketname);

          idbuck === -1
            ? chartData.push({ x: bucketname, y: 1 })
            : // this right here is wrong
              (chartData[chartData.findIndex(d => d.x == bucketname)].y += 1);
        }
      });

      setCurrentData(chartData);
      console.log(currentData, chartData);
    }, 200);
    return () => clearTimeout(timeout);
  }, [currentVariable, threshold]);

  return (
    <div id="view-two">
      <div className="box">
        <Typography variant="h6" component="h3">
          <b>Common Attributes</b>
        </Typography>{" "}
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
              categories: ["credit", "debit"],
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
                data: [500, 300]
              }
            ]
          }}
        />
      </div>

      <div className="box">
        <Typography variant="h6" component="h3">
          <b>Variable Breakdown Over Time</b>
        </Typography>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {
              type: "area"
            },
            title: {
              text: undefined
            },
            subtitle: {},
            xAxis: {
              categories: [
                "Month 1",
                "Month 2",
                "Month 3",
                "Month 4",
                "Month 5",
                "Month 6"
              ],
              tickmarkPlacement: "on",
              title: {
                enabled: false
              }
            },
            yAxis: {
              labels: {
                format: "{value}%"
              },
              title: {
                enabled: false
              }
            },
            tooltip: {
              pointFormat:
                '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f})<br/>',
              split: true
            },
            plotOptions: {
              area: {
                stacking: "percent",
                lineColor: "#ffffff",
                lineWidth: 1,
                marker: {
                  lineWidth: 1,
                  lineColor: "#ffffff"
                },
                accessibility: {
                  pointDescriptionFormatter: function(point) {
                    function round(x) {
                      return Math.round(x * 100) / 100;
                    }
                    return (
                      point.index +
                      1 +
                      ", " +
                      point.category +
                      ", " +
                      point.y +
                      " millions, " +
                      round(point.percentage) +
                      "%, " +
                      point.series.name
                    );
                  }
                }
              }
            },
            series: [
              {
                name: "Amount",
                data: [502, 635, 809, 947, 1402, 3634]
              },
              {
                name: "Payment Type",
                data: [106, 107, 111, 133, 221, 767]
              },
              {
                name: "Payment Category",
                data: [163, 203, 276, 408, 547, 729]
              },
              {
                name: "Distance",
                data: [18, 31, 54, 156, 339, 818]
              }
            ]
          }}
        />
      </div>
    </div>
  );
}
