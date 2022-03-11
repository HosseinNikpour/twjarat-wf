import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Organization from "highcharts/modules/organization";
import React, { useEffect, useState } from "react";
import Sankey from "highcharts/modules/sankey";

import { getItems } from "../api/index";

Sankey(Highcharts);

Organization(Highcharts);

const ReportDashboard = (/*props*/) => {
  const [, /*obj*/ setObj] = useState({});
  const [, /*contractor_options*/ setContractor_options] = useState([]);

  const getData = () => {
    Promise.all([getItems("/request"), getItems("/baseInfo")]).then(
      (response) => {
        let c = response[1].data
          .filter((a) => a.group_id === 13)
          .map((a) => {
            return { key: a.id, label: a.title, value: a.id };
          });
        let data = response[0].data;
        let dt1 = [],
          dt2 = [],
          dt3 = [];
        c.forEach((e) => {
          dt1.push(
            data.filter((a) => a.contractor_id === e.key && a.req_type_id === 1)
              .length,
          );
          dt2.push(
            data.filter((a) => a.contractor_id === e.key && a.req_type_id === 2)
              .length,
          );
          dt3.push(
            data.filter((a) => a.contractor_id === e.key && a.req_type_id === 3)
              .length,
          );
        });
        setObj({ dt1, dt2, dt3 });
        setContractor_options(c);
      },
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const options1 = {
    chart: {
      height: 700,
      width: 800,
      inverted: false,
    },

    title: {
      text: "تهیه وضعیت فعلی نواحی ، مناطق و شعب -سال 1400",
      style: { fontFamily: "BYekan", fontSize: "23px" },
    },

    series: [
      {
        type: "organization",
        name: "",
        keys: ["from", "to"],
        data: [
          ["11", "21"],
          ["11", "22"],
          ["11", "23"],
          ["11", "24"],
          ["11", "25"],
          ["11", "26"],
          ["11", "27"],
          // ['11', '28'],
          // ['11', '29'],
          // ['11', '30'],
        ],
        levels: [
          {
            level: 0,
            // color: 'silver',
            dataLabels: {
              color: "black",
              fontFamily: "Byekan",
            },
            height: 200,
            width: 200,
          },
          {
            level: 1,
            // color: 'silver',
            dataLabels: {
              color: "black",
            },
            height: 25,
            // }, {
            //     level: 3,
            // }, {
            //     level: 4,
            // }, {
            //     level: 5,
            // }, {
            //     level: 6,
            // }, {
            //     level: 7,
            // }, {
            //     level: 8,
            // }, {
            //     level: 9,
            // }, {
            //     level: 10,
            // }, {
            //     level: 11,
          },
        ],
        nodes: [
          {
            id: "11",
            title: "مدیر امور استان های شمال کشور",
            name: "  ",
            color: "#aaaaf7",
            height: 70,
          },

          {
            id: "21",
            title: " آذربایجان شرقی",
            name: "استان",
            color: "#f8f995",
            height: 70,
          },
          {
            id: "22",
            height: 70,
            title: "استان آذربایجان غربی",
            color: "#f8f995",
          },
          {
            id: "23",
            height: 70,
            title: "استان اردبیل",
            //column: 3,
            color: "#10c910",
          },
          {
            id: "24",
            title: "گیلان",
            height: 70,
            // column:4,
            color: "#f8f995",
          },
          {
            id: "25",
            title: "مازندران",
            height: 70,
            color: "#10c910",
          },
          {
            id: "26",
            title: "استان آذربایجان شرقی",
            height: 70,
            color: "#f8f995",
          },
          {
            id: "27",
            title: "استان آذربایجان غربی",
            height: 70,
            color: "#f8f995",
          },
        ],
        colorByPoint: true,
        dataLabels: {
          color: "white",
          nodeFormatter: function () {
            // Call the default renderer
            const html = Highcharts.defaultOptions.plotOptions.organization
              .dataLabels.nodeFormatter.call(
                this,
              );

            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(html, "text/html");
            htmlDoc.querySelectorAll("h4")[0].remove();
            //  debugger;
            let newHtml = htmlDoc.documentElement.innerHTML;
            // Do some modification
            newHtml = newHtml.replace(
              '<p style="',
              '<p style="font-family: BYekan; font-size:20px',
            );
            return newHtml;
          },
        },
        borderColor: "white",
        nodeWidth: 200,
        nodeHeight: 700,
      },
    ],
    tooltip: {
      enabled: false,
    },
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ paddingTop: "60px" }}>
        <div className="col">
          <div
            className="card-body"
            style={{
              marginTop: "-50px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <HighchartsReact highcharts={Highcharts} options={options1} />
          </div>
        </div>
        {/* <div className="col">
                <div className='card-body' style={{ marginTop: '-50px' }}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options2}
                    />
                </div>
            </div> */}
      </div>
    </div>
  );
};

export default ReportDashboard;
