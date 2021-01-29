import React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getALL } from "redux/index";
import { CardNoFooter } from "../components/Card/Card";
import EnhancedTable from "../components/SuperTable/AdvanceTable";
import { getAdvanceData, getMaterialHeader } from "../redux/Selector/Selectors";
import * as variable from "../variables/Variables";

export default function StickyHeadTable() {
  let materialBody = useSelector((state) => getAdvanceData(state));
  let materialHeader = useSelector((state) => getMaterialHeader(state));
  let dispatch = useDispatch();
  React.useEffect(() => {
    const fetchPostList = async () => {
      // * Bắt try catch ở đây là để tránh lỗi crash ứng dụng lỡ như trong quá trình dispatch đến getAll bị lỗi
      try {
        const response = await dispatch(getALL());
        console.log("result= ", response);

        // * Nếu có sử dụng gì ở local này thì ta cứ lấy response ra mà dùng
      } catch (errpr) {
        console.log("Failed to fetch product list: ", errpr);
      }
    };
    fetchPostList();
    // dispatch(getALL
    //   ())
  }, []);
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
                    actionbuttonlist={["lock"]}
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
