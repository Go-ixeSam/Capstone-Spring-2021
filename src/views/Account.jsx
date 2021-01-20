import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import EnhancedTable from "../components/SuperTable/AdvanceTable";
import { useSelector, useDispatch } from "react-redux";
import { getAdvanceData, getMaterialHeader } from "../redux/Selector/Selectors";
import { CardNoFooter } from "../components/Card/Card";
import { Col, Form, Grid, Row } from "react-bootstrap";
import * as variable from "../variables/Variables"

export default function StickyHeadTable() {
  let materialBody = useSelector((state) => getAdvanceData(state));
  let materialHeader = useSelector((state) => getMaterialHeader(state));
  return (
    <React.Fragment>
      <div className="content">
        <Grid fluid style={{ margin: 0, padding: 0 }}>
          <CardNoFooter
            titlet="Account list"
            content={
              <Row>
                <Col xs={12}>
                  <EnhancedTable
                    headCells={materialHeader}
                    bodyData={materialBody}
                    notShowing={[variable.islock]}
                  />
                </Col>
              </Row>
            }
          />
        </Grid>
      </div>
    </React.Fragment>
  );
}
