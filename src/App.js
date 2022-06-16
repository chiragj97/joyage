import logo from "./logo.svg";
import "./App.css";
import data from "./data.json";
import { useEffect, useState } from "react";
import Moment from "moment";

function App() {
  const [result, setResult] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  console.log("Data", data);

  useEffect(() => {
    dateSeperator(data.data);
  }, []);

  const sortDates = (data) => {
    console.log("dd", data);
    let sorted = data.sort((a, b) => {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.date) - new Date(a.date);
    });
    return sorted;
  };

  const dateSeperator = (records) => {
    console.log("rec", records);
    const sortedDates = sortDates(records);
    console.log("sorted", sortedDates);
    let groupKey = 0;
    let groups = sortedDates.reduce((r, o) => {
      let m = Moment(o.date).format("YYYY-MM-DD").split("-")[1];
      r[m]
        ? r[m].data.push(o)
        : (r[m] = { group: String(groupKey++), data: [o] });
      return r;
    }, {});

    let result = Object.keys(groups).map((k) => {
      return groups[k];
    });

    console.log("result", result);
    setResult(result);
    // return result;
  };

  return (
    <div className="App">
      <h1>Date Seggregation</h1>
      <div style={{ display: "flex" }}>
        {result.map((item) => (
          <div
            style={{
              border: "1px solid grey",
              width: "50%",
              cursor: "pointer",
            }}
          >
            {item.data.map((i, index) => (
              <div onClick={() => setSelectedData(i)} key={index}>
                <p>{new Date(i.date).toDateString()}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <h2>Selected Record</h2>
        <p>Activity: {selectedData["activity"]}</p>
        <p>Comlince: {selectedData["comlince"]}</p>
        <p>Comlince Type: {selectedData["comlince_type"]}</p>
        <p>Date: {new Date(selectedData["date"]).toDateString()}</p>
        <p>State: {selectedData["state"]}</p>
      </div>
    </div>
  );
}

export default App;
