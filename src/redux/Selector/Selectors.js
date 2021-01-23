export function getList(state) {
  return state.contract.listTestSelectorstSelector;
}

export function getTrip(state) {
  return state.trip.tripData;
}

export function getAdvanceData(state) {
  return state.trip.advanceTableData;
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

export function getMaterialHeader(state) {
  return state.trip.materialHeader;
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
