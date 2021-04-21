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
import React, { Component, useState } from "react";
import ChartistGraph from "react-chartist";
import crown from "assets/img/crown.png";
import { Grid, Row, Col } from "react-bootstrap";
import ChartistTooltip from "chartist-plugin-tooltips-updated";
import { Card, CardNoFooter } from "components/Card/Card.jsx";
import Chartist, { plugins } from "chartist";
import { StatsCard, MiniChartCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  // dataSales,
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
import { ShowPopUp, SuccessPopUp, LoadingPopUp } from "components/Modal/Modal";
import { FormControll } from "components/Formik/FormikControl";
import { MaterialButton } from "components/CustomButton/MaterialButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getDashboard,
  getTop10,
  getShareAndExchangeCompare,
} from "../redux/index";
import { getDashboardUpdate } from "redux/Selector/Selectors";
import { Box } from "@material-ui/core";
require("chartist-plugin-legend");

function Dashboard() {
  const dispatch = useDispatch();
  const [dataSales, setDataSales] = useState({});
  const [loading, setLoading] = useState(true);
  const [top10, setTop10] = useState([]);
  const [top10Account, setTop10Account] = useState([]);
  const [compare, setCompare] = useState({});
  React.useEffect(() => {
    try {
      const prepare = () => {
        dispatch(getDashboard()).then((response) => {
          const data = response.payload.data;
          console.log("dashboard nè ", data);
          const labels = [...data.labels, ""];
          const tmp = {
            labels: labels,
            series: data.series,
          };
          setDataSales(tmp);
        });
        dispatch(getTop10(2)).then((res) => {
          const tmp = res.payload.data;
          setTop10(tmp);
          console.log("danh sách 10 rau: ", res);
        });
        dispatch(getTop10(1)).then((res) => {
          const tmp = res.payload.data;
          setTop10Account(tmp);
          console.log("danh sách 10 người: ", res);
        });
        dispatch(getShareAndExchangeCompare()).then((res) => {
          setCompare(res.payload.data);
          console.log("share và exchage: ", res);
        });
        setLoading(false);
      };
      prepare();
    } catch (error) {
      console.log("Failed to fetch product list: ", error);
    }
  }, []);
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
  const size = 20;
  const number = {
    color: "white",
    background: "#63d8f1",
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 5,
  };
  const numberRed = {
    color: "white",
    background: "#fc727a",
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 5,
  };
  return (
    <div className="content">
      <LoadingPopUp visible={loading} length="200px" />
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
                  {/* <MaterialButton
                    variant="contained"
                    color="info"
                    size="large"
                    style={{ marginRight: 5 }}
                    // click={() => autoCloseSuccessModal()}
                  >
                    Cập nhật
                  </MaterialButton> */}
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
              id="chartHours"
              title="Hoạt động của người  dùng"
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
              legend={<div className="legend">{createLegend(legendSales)}</div>}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card
              id="chartActivity"
              title="2014 Sales"
              category="All products including Taxes"
              content={
                <div className="ct-chart">
                  <ChartistGraph
                    data={compare}
                    type="Bar"
                    options={optionsBar}
                    responsiveOptions={responsiveBar}
                  />
                </div>
              }
              legend={<div className="legend">{createLegend(legendBar)}</div>}
            />
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            <Card
              id="top10A"
              title="Top 10 rau "
              // category="All products including Taxes"
              content={
                <div>
                  {top10.map((item, index) => {
                    if (index == 0) {
                      return (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <img src={crown} height={size} width={size} />
                          <p style={number}>{index+1}</p>
                          <p style={{ marginLeft: 5 }}>{item.id}</p>
                          <p style={{ marginLeft: 5, fontWeight: "bold" }}>
                            {item.text}
                          </p>
                        </div>
                      );
                    } else {
                      return (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <Box height={size} width={size}></Box>
                          <p style={number}>{index+1}</p>
                          <p style={{ marginLeft: 5 }}>{item.id}</p>
                          <p style={{ marginLeft: 5, fontWeight: "bold" }}>
                            {item.text}
                          </p>
                        </div>
                      );
                    }
                  })}
                </div>
              }
            />
          </Col>
          <Col md={5}>
            <Card
              id="top10B"
              title="Top 10 tài khoản "
              // category="All products including Taxes"
              content={
                <div>
                  {top10Account.map((item, index) => {
                    if (index == 0) {
                      return (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <img src={crown} height={size} width={size} />
                          <p style={numberRed}>{index+1}</p>
                          <p style={{ marginLeft: 5 }}>{item.id}</p>
                          <p style={{ marginLeft: 5, fontWeight: "bold" }}>
                            {item.text}
                          </p>
                        </div>
                      );
                    } else {
                      return (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <Box height={size} width={size}></Box>
                          <p style={numberRed}>{index+1}</p>
                          <p style={{ marginLeft: 5 }}>{item.id}</p>
                          <p style={{ marginLeft: 5, fontWeight: "bold" }}>
                            {item.text}
                          </p>
                        </div>
                      );
                    }
                  })}
                </div>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default Dashboard;
