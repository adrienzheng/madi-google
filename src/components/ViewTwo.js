import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "../styles/ViewTwo.scss";
import {
  Typography
} from "@material-ui/core";
// To see how the data for the following three graphs was calculated see the python notebook in the common_attributes_processing folder.
export default function ViewTwo() {
  return (
    <div id="view-two">
      <div className="box" id="firstbox">
        <Typography variant="h6" component="h3">
          <b>Common Attributes</b>
        </Typography>{" "}
        <div className="chart">
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: "column"
              },
              title: {
                text: "Card Type"
              },
              subtitle: {
                text:
                  "The following graph displays the number of transactions with an anomlous score of .9 and above categorized by card type"
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
                  '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
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
                  showInLegend: false,
                  data: [475, 289]
                }
              ],
              credits: {
                text: "Powered by MADI by Google"
              }
            }}
          />
        </div>
        <div className="chart">
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: "column"
              },
              title: {
                text: "Card Company"
              },
              subtitle: {
                text:
                  "The following graph displays the number of transactions with an anomlous score of .9 and above categorized by card company"
              },
              xAxis: {
                categories: [
                  "visa",
                  "mastercard",
                  "discover",
                  "american express",
                  "N/A"
                ],
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
                  '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
                  showInLegend: false,
                  data: [475, 195, 18, 75, 689]
                }
              ],
              credits: {
                text: "Powered by MADI by Google"
              }
            }}
          />
        </div>
        <div className="third_chart">
          <HighchartsReact
            highcharts={Highcharts}
            options={{
              chart: {
                type: "column"
              },
              title: {
                text: "Transaction Amount"
              },
              subtitle: {
                text:
                  "The following graph displays the number of transactions with an anomlous score of .9 and above categorized by transaction amount ranges "
              },
              xAxis: {
                categories: [
                  "$0.9-$359.3",
                  "$359.3-$717.7",
                  "$717.7-$1076.1",
                  "$1076.1-$1434.5",
                  "$1434.5-$1792.9",
                  "$1792.9-$2151.3",
                  "$2151.3-$2509.7",
                  "$2509.7-$2868.1",
                  "$2868.1-$3226.5",
                  "$3226.5-$3585.0"
                ],
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
                  '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
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
                  showInLegend: false,
                  data: [736, 15, 9, 1, 0, 1, 1, 0, 0, 0]
                }
              ],
              credits: {
                text: "Powered by MADI by Google"
              }
            }}
          />
        </div>
      </div>

      <div className="box">
        <Typography variant="h6" component="h3">
          <b>Variable Attribution Breakdown Over Time</b>
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
            subtitle: {
              text:
                "The following graph looks at a few important variables and analyzes how each one's average attribution compared to the other variables changes over the 6 months."
            },
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
              },
              max:100   
            },
            tooltip: {
              pointFormat:
                '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b><br/>',
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
                data: [9.47847992165306, 8.892342285608288, 11.172604852300399, 10.82255389465399, 10.520063653046844, 12.631826945650579]
              },
              {
                name: "Distance",
                data: [9.685988794325255, 7.827058486901929, 8.479563353569075, 5.394761712144199, 5.8079744687847406, 8.06114242418737]
              },
              {
                name: "Card Company",
                data: [9.174964221169294, 6.824978447067832, 5.465936210974663, 5.789581339833777, 5.230852930963079, 5.785808383690028]
              },
              {
                name: "Card Type",
                data: [4.033313954005467, 2.6659388925502965, 3.613780492048545, 3.731836206004322, 3.3828661712358556, 3.1615128942561377]
              },
              {
                name: "Purchaser Email",
                data: [8.468690844106973, 7.3665873771344135, 6.632211320025376, 8.579962751430484, 7.381908071591761, 8.09150144509896]
              },
              {
                name: "Recipient Email",
                data: [5.967264525188856, 1.5874346464137368, 1.530694004633926, 2.0360176639360246, 1.452327444479896, 1.9628103161716821]
              },
              {
                name: "Address",
                data: [11.200584799677195, 10.759108224041611, 10.157087416634916, 15.638615865303553, 13.27740337991816, 13.88356843930202]
              },
              {
                name: "Date",
                data: [110.1909006632289, 92.93705763585166, 85.69672355310593, 88.94625420002036, 54.74927730703565, 54.5026728270658]
              },
              {
                name: "Device Type",
                data: [5.961578615638098, 1.2102751369751874, 1.409385526370309, 1.716201535178708, 1.3084923413614054, 1.669151829844176]
              },
            ],
            credits: {
              text: "Powered by MADI by Google"
            }
          }}
        />
      </div>
    </div>
  );
}
