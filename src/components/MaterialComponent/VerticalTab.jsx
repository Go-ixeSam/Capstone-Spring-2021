import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PerfectScrollbar from "react-perfect-scrollbar";

import PostUsedForProfessionalWork from "components/PostItem/Post";
import {
  getReportedListByAccountId,
  getDateListByAccountId,
} from "redux/Selector/Selectors";
import { useSelector } from "react-redux";
import { getDates, removeDuplicateDate } from "util/Helper";
import * as variable from "variables/Variables";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 300,
    // fontSize:14
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  // ! trả về 1 danh sách những ngày đăng ko trùng nhau theo account ID
  const reportedListDateOnly = useSelector((state) =>
    getDateListByAccountId(state)
  );
  const reportedList = useSelector((state) =>
    getReportedListByAccountId(state)
  );
  console.log("full lít", reportedList);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {reportedListDateOnly.map((tab, index) => {
          console.log("tab", tab);
          return <Tab label={<p style={{fontSize:14}}>{tab}</p>} {...a11yProps(index)} />;
        })}
      </Tabs>
      {reportedListDateOnly.map((tab, index) => {
        let reportListDetail = [];
        reportedList.posts.map((date) => {
          if (tab == date[variable.createDate]) {
            reportListDetail.push(date);
          }
        });
        return (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            <PerfectScrollbar style={{ height: "100%", width: "100%" }}>
              {reportListDetail.map((obj) => {
                return (
                  <TabPanel value={value} index={index}>
                    <PostUsedForProfessionalWork />
                  </TabPanel>
                );
              })}
            </PerfectScrollbar>
          </div>
        );
      })}
    </div>
  );
}
