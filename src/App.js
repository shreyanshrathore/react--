import { useState, useRef } from "react";
import "./App.css";
var data = require("./MOCK_DATA.json");

export default function App() {
  const [value, setValue] = useState("");
  const [lastValue, setLastValue] = useState("");
  const [pinnedTerms, setPinnedTerms] = useState([]);
  const inputRef = useRef(null);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onKeyDown = (event) => {
    if (event.keyCode === 8 && value === "") {
      if (lastValue !== "") {
        setValue(lastValue);
        setLastValue("");
      }
      event.preventDefault();
    }
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    setLastValue(searchTerm);
    // our api to fetch the search result
    console.log("search ", searchTerm);

    // add the search term to pinned terms
    setPinnedTerms((prevTerms) => [...prevTerms, searchTerm]);
  };

  return (
    <div className="App">
      <h1>Search Country</h1>



      <div className="all-container">

        <div className="pinned-terms">
          {pinnedTerms.map((term) => (
            <div
              key={term}
              className="pinned-term"
              onClick={() => {
                setValue(term);
                setLastValue(term);
                inputRef.current.focus();
              }}
            >
              <div className="btn-mod">

              <span>{term}</span>
              <button
                className="btn-x"
                onClick={() =>
                  setPinnedTerms((prevTerms) =>
                    prevTerms.filter((prevTerm) => prevTerm !== term)
                  )
                }
              >
                X 
              </button>
              </div>
            </div>
          ))}
        </div>




        <div className="search-container">
          <div className="search-inner">
            <input
              type="text"
              value={value}
              onChange={onChange}
              onKeyDown={onKeyDown}
              ref={inputRef}
            />
            <button onClick={() => onSearch(value)}> Search </button>
          </div>
          <div className="dropdown">
            {data
              .filter((item) => {
                const searchTerm = value.toLowerCase();
                const fullName = item.Name.toLowerCase();
                const code_name = item.Code.toLowerCase();

                return (
                  searchTerm &&
                  fullName.startsWith(searchTerm) &&
                  fullName !== searchTerm ||
                  searchTerm === code_name
                );
              })
              .slice(0, 10)
              .map((item) => (
                <div
                  onClick={() => onSearch(item.Name)}
                  className="dropdown-row"
                  key={item.Name}
                >
                  {item.Name}
                </div>
              ))}
          </div>
        </div>
      </div>


    </div>
  );
}
