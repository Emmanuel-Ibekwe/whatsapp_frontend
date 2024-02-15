import { useState } from "react";
import SidebarHeader from "./header/SidebarHeader";
import Notifications from "./notifications/Notifications";
import Search from "./search/Search";
import Conversations from "./conversations/Conversations";

function Sidebar() {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="w-[400px] h-full select-none fixed top-0 left-0">
      <SidebarHeader />
      <Notifications />
      <Search searchLength={searchResults.length} />
      <Conversations />
    </div>
  );
}

export default Sidebar;
