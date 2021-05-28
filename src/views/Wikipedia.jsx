import React from "react";
import { isTemplateMiddleOrTemplateTail } from "typescript";
import useForceUpdate from "use-force-update";
import "./Wiki.css";
import { wikiVegetableSearch } from "redux/index";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  getWikiResult,
  getVegetableAPIloadingTime,
} from "redux/Selector/Selectors";
import LoadingSpinner, {
  SwitchSpinner,
} from "components/LoadingSpinner/LoadingSpinner";
import { useHistory, useLocation } from "react-router-dom";
import White from "views/White"

function Wikipedia() {
  const [wikiSearchReturnValues, setWikiSearchReturnValues] = React.useState(
    []
  );
  const [wikiSearchTerms, setWikiSearchTerms] = React.useState("");
  const forceUpdate = useForceUpdate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => getVegetableAPIloadingTime(state));
  const location = useLocation();
  const history = useHistory();
  console.log("history= ", history);

  const useWikiSearchEngine = (e) => {
    e.preventDefault();
    setWikiSearchReturnValues([]);
    let vegetableList = {};
    const search = async () => {
      const result = await dispatch(wikiVegetableSearch(wikiSearchTerms));
      console.log("result= ", result);
      if (!result.error) {
        vegetableList = await result.payload.data;
      } else {
        vegetableList = [];
      }
      const tmp = [];
      for (let key in vegetableList) {
        tmp.push({
          title: vegetableList[key].title,
          image: vegetableList[key].image,
        });
      }
      console.log("leak wiki= ", tmp);
      setWikiSearchReturnValues(tmp);
    };
    search();
  };
  const changeWikiSearchTerms = (e) => {
    console.log("value search= ", e.target.value);
    setWikiSearchTerms(e.target.value);
  };

  let wikiSearchResults = [];
  for (var key in wikiSearchReturnValues) {
    wikiSearchResults.push(
      <div className="searchResultDiv" key={key}>
        <img src={wikiSearchReturnValues[key].image} alt="" />
        <Link to="/admin/white">
          <h3>{wikiSearchReturnValues[key].title}</h3>
        </Link>
      </div>
    );
  }
  console.log(wikiSearchResults);
  const totheNew = () => {};
  const goBack=()=>{
    history.goBack()
  }
  return (
    <div className="App">
      <h1>Wikipedia Search Engine</h1>
      <button onClick={goBack}>
          Search
        </button>
      <form action="">
        <input
          type="text"
          value={wikiSearchTerms || ""}
          onChange={changeWikiSearchTerms}
          placeholder="Search Wikipedia Articles"
        />
        <button type="submit" onClick={useWikiSearchEngine}>
          Search
        </button>
      </form>
      <SwitchSpinner show={loading} size={50} />
      {setWikiSearchReturnValues.length != 0 ? (
        wikiSearchResults
      ) : (
        <p>Không có kết quả</p>
      )}
    </div>
  );
}

export default Wikipedia;
