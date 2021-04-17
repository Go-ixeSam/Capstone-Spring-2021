/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import ChartistTooltip from "chartist-plugin-tooltips-updated";
import { Card, CardNoFooter } from "components/Card/Card.jsx";
import Chartist, { plugins } from "chartist";
import { StatsCard, MiniChartCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
} from "variables/Variables.jsx";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormControll } from "components/Formik/FormikControl";
import { MaterialButton } from "components/CustomButton/MaterialButton";
import { useDispatch, useSelector } from "react-redux";
import {getDashboard} from "../redux/index"
import { getDashboardUpdate } from "redux/Selector/Selectors";
require("chartist-plugin-legend");

function Dashboard() {
  const dispatch=useDispatch()
  React.useEffect(()=>{
      const getDashboardData= async ()=>{
        try {
          const response=dispatch(getDashboard())
          // console.table(response.data)
          console.log("dashboard nè ",response)
        } catch (error) {
        console.log("Failed to fetch product list: ", error);
        }
      }
      getDashboardData()
      
  },[])
  const updateButtonForm = useSelector((state) => getDashboardUpdate(state));
  const options = {
    plugins: [ChartistTooltip()],
  };
  console.log(updateButtonForm);
  const initialValues = {
    updateTime: "",
  };
  const onSubmit = (values) => {};
  const dropdownOptions = [
    { key: "Tháng này", value: "thismonth" },
    { key: "Hôm nay", value: "today" },
    { key: "7 ngày trước", value: "last7days" },
  ];
  function createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {(formik) => {
              return (
                <Form>
                  {updateButtonForm.map((item) => {
                    item.row.cols.map((col) => {
                      const {
                        name,
                        type,
                        placeholder,
                        labeltext,
                      } = col.elementConfig;
                      return (
                        <FormControll
                          control={"select"}
                          label={labeltext}
                          name={name}
                          options={dropdownOptions}
                        />
                      );
                    });
                  })}
                  <MaterialButton
                    variant="contained"
                    color="info"
                    size="large"
                    style={{ marginRight: 5 }}
                    // click={() => autoCloseSuccessModal()}
                  >
                    Cập nhật
                  </MaterialButton>
                </Form>
              );
            }}
          </Formik>
          {/* <Col lg={3} sm={6}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Hoạt động của người  dùng"
                category="24 Hours performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
              />
            </Col> */}
          {/* <Col lg={3} sm={6}>
              <MiniChartCard
                content={
                  <ChartistGraph
                    className={"ct-chart"}
                    data={dataSales}
                    type="Line"
                    options={optionsSales}
                    responsiveOptions={responsiveSales}
                  />
                }
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col> */}
          {/* <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Revenue"
                statsValue="$1,345"
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col> */}
          {/* <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="Errors"
                statsValue="23"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col> */}
          {/* <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="Followers"
                statsValue="+45"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col> */}
        </Row>
        <Row>
          <Col md={12}>
            <Card
              // statsIcon="fa fa-history"
              id="chartHours"
              title="Hoạt động của người  dùng"
              // category="24 Hours performance"
              // stats="Updated 3 minutes ago"
              content={
                <div className="ct-chart">
                  <ChartistGraph
                    data={dataSales}
                    type="Line"
                    options={optionsSales.plugins.push(ChartistTooltip())}
                    // options={options}
                    responsiveOptions={responsiveSales}
                    // plugins={options}
                  />
                </div>
              }
              legend={<div className="legend">{createLegend(legendSales)}</div>}
            />
          </Col>
          {/* <Col md={4}>
            <Card
              // statsIcon="fa fa-clock-o"
              title="Email Statistics"
              category="Last Campaign Performance"
              // stats="Campaign sent 2 days ago"
              content={
                <div
                  id="chartPreferences"
                  className="ct-chart ct-perfect-fourth"
                >
                  <ChartistGraph data={dataPie} type="Pie" />
                </div>
              }
              legend={<div className="legend">{createLegend(legendPie)}</div>}
            />
          </Col> */}
        </Row>

        <Row>
          <Col md={6}>
            <Card
              id="chartActivity"
              title="2014 Sales"
              category="All products including Taxes"
              // stats="Data information certified"
              // statsIcon="fa fa-check"
              content={
                <div className="ct-chart">
                  <ChartistGraph
                    data={dataBar}
                    type="Bar"
                    options={optionsBar}
                    responsiveOptions={responsiveBar}
                  />
                </div>
              }
              legend={<div className="legend">{createLegend(legendBar)}</div>}
            />
          </Col>

          {/* <Col md={6}>
              <Card
                title="Tasks"
                category="Backend development"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col> */}
        </Row>
      </Grid>
    </div>
  );
}

export default Dashboard;
