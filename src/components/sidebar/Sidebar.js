import { useState } from "react";
import SidebarHeader from "./header/SidebarHeader";
import Notifications from "./notifications/Notifications";
import Search from "./search/Search";
import Conversations from "./conversations/Conversations";
import SearchResults from "./search/SearchResults";

function Sidebar({ onlineUsers }) {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="w-[400px] h-full select-none shrink-0 ">
      <SidebarHeader />
      <Notifications />
      <Search
        searchLength={searchResults.length}
        setSearchResults={setSearchResults}
      />

      {searchResults.length > 0 ? (
        <SearchResults searchResults={searchResults} />
      ) : (
        <Conversations onlineUsers={onlineUsers} />
      )}
    </div>
  );
}

export default Sidebar;
