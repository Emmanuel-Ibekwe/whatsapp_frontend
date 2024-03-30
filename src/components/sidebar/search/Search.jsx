import { useState } from "react";
import { ReturnIcon, SearchIcon, FilterIcon } from "../../../svg";
import axios from "axios";
import { useSelector } from "react-redux";
import SearchResults from "./SearchResults";

function Search({ searchLength, setSearchResults, onSetSearchInput }) {
  const { user } = useSelector(state => state.user);
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleSearch = async e => {
    setInputValue(e.target.value);
    onSetSearchInput(e.target.value);
    if (e.target.value) {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/user?search=${e.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        );
        console.log(data);
        setSearchResults(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSearchResults([]);
    }
  };
  return (
    <div className="h-[49px] py-1.5">
      <div className="px-[10px]">
        <div className="flex items-center gap-x-2">
          <div className="w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
            {show || searchLength > 0 ? (
              <span
                className="w-8 flex items-center rotateAnimation cursor-pointer"
                onClick={() => {
                  setSearchResults([]);
                  setInputValue("");
                }}
              >
                <ReturnIcon className="fill-green_1 w-5" />
              </span>
            ) : (
              <span className="w-8 flex items-center">
                <SearchIcon className="dark:fill-dark_svg_2 w-5" />
              </span>
            )}
            <input
              type="text"
              className="input"
              placeholder="Search or start a new chat"
              onFocus={() => setShow(true)}
              onBlur={() => searchLength === 0 && setShow(false)}
              onChange={e => handleSearch(e)}
              value={inputValue}
            />
          </div>
          <button className="btn">
            <FilterIcon className="dark:fill-dark_svg_2" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
