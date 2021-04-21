import * as variable from "variables/Variables";
import { getDates, removeDuplicateDate } from "util/Helper";
import { createVegetableData } from "util/ContructorCreation";
export function getList(state) {
  return state.contract.listTestSelectorstSelector;
}

export function getTrip(state) {
  return state.trip.tripData;
}
export function getVegetableAPIloadingTime(state) {
  return state.post.loading;
}

export function getAdvanceData(state) {
  return state.account.accountData;
}

export function getSystemConfigLoading(state) {
  return state.systemConfig.loading;
}

export function getAdvanceSelectedData(state) {
  return state.trip.advanceTableDataSelected;
}

export function getAdvanceDataByNameSearch(advanceTableData, searchValue) {
  return advanceTableData.filter((record) =>
    record.Dessert.includes(searchValue)
  );
}

export function getUserRole(state) {
  return state.user.roles.text;
}
export function getModalVisible(state) {
  return state.post.userPostVisible;
}
export function getToken(state) {
  return state.login.token;
}
export function getAllVegetable(state) {
  // return state.post.getAllVegetableUnapprovedCurrent
  console.log(state.post.getAllVegetableUnapprovedCurrent);
  const datas = state.post.getAllVegetableUnapprovedCurrent;
  const tableBodyData = [];
  let image = "";
  if (Object.keys(datas).length!==0) {
    datas.map((data) => {
      if (data.images) {
        if (data.images.length > 0) {
          if (data.images[0].url) {
            image = data.images[0].url;
          }
        }
      }
      tableBodyData.push(
        createVegetableData(
          data.name,
          data.idDescription,
          data.feature,
          data.description,
          image
        )
      );
    });
  }
  return tableBodyData;
}
export function getTokenExpiredTime(state) {
  return state.login.expiresTime;
}
/**
 * * Hàm sẽ trả về 1 mảng chứa những ngày tạo bài đã loại bỏ trùng nhau từ account id
 */
export function getDateListByAccountId(state) {
  let object = { accountID: "", posts: [] };
  state.post.reportedPosts.map((obj) => {
    if (obj.accountID == state.post.selectedAccountId) {
      object = { ...obj, accountID: obj.accountID, posts: obj.posts };
    }
  });
  return removeDuplicateDate(getDates(object.posts));
}
/**
 * * Hàm sẽ trả về cái object mà có account id giống với selected ID
 */
export function getReportedListByAccountId(state) {
  let object = { accountID: "", posts: [] };
  state.post.reportedPosts.map((obj) => {
    if (obj.accountID == state.post.selectedAccountId) {
      object = obj;
      console.log("obj ", object);
    }
  });
  return object;
}
export function getMaterialHeader(state) {
  return state.account.accountTableHeader;
}
export function getReportedPost(state) {
  return state.post.reportedPosts;
}

export function getPercentReport(state) {
  return state.systemConfig.systemConfigForm;
}

export function getPercent(state) {
  return state.systemConfig.percent;
}

export function getPercentResult(state) {
  return state.systemConfig.percentResult;
}

export function getPercentName(state) {
  return state.systemConfig.percentNames;
}

export function getSignInForm(state) {
  return state.login.signInForm;
}

export function getDashboardUpdate(state) {
  return state.dashboard.updateDashboard;
}

export function getFirebase(state) {
  return state.firebase;
}

export function getPostTableHeader(state) {
  return state.post.tableHeader;
}

export function getPostTableBodyData(state) {
  return state.post.advanceTableData;
}
export function getLoadingStatus(state) {
  return state.account.loading;
}
export function getSuccessStatus(state) {
  return state.account.success;
}
export function getFailStatus(state) {
  return state.account.fail;
}
/**
 * ! Tìm kiến trip dựa trên ID
 * @param {*} state
 * @param {*} id
 */
export function getTripDetailById(state) {
  const id = state.trip.tripSelectedID;
  return state.trip.tripData.tableBody.record.find(
    (obj) => obj.contractCode == id
  );
}
export function removeAdvanceRecord(state, selectedRecord) {
  let newArray = [];
  selectedRecord.map((selected) => {
    newArray = state.trip.advanceTableData.filter(
      (record) => record.name != selected
    );
  });
  return newArray;
}
