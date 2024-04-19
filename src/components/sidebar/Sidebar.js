import { useState } from "react";
import SidebarHeader from "./header/SidebarHeader";
import Notifications from "./notifications/Notifications";
import Search from "./search/Search";
import Conversations from "./conversations/Conversations";
import SearchResults from "./search/SearchResults";

function Sidebar({ onlineUsers }) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="relative w-[400px] h-full select-none shrink-0 ">
      <SidebarHeader />
      <Notifications />
      <Search
        searchLength={searchResults.length}
        setSearchResults={setSearchResults}
        onSetSearchInput={setSearchInput}
      />

      {searchResults.length > 0 ? (
        <SearchResults
          searchResults={searchResults}
          searchInput={searchInput}
        />
      ) : (
        <Conversations onlineUsers={onlineUsers} />
      )}
    </div>
  );
}

export default Sidebar;
