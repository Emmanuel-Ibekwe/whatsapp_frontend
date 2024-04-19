import { useSelector } from "react-redux";
import { useState } from "react";
import { CommunityIcon, StoryIcon, ChatIcon, DotsIcon } from "../../../svg";
import Menu from "./Menu";
import CreateGroup from "./createGroup/CreateGroup";

function SidebarHeader() {
  const { user } = useSelector(state => state.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  return (
    <>
      {/* SideBar header */}
      <div className="h-[60px] dark:bg-dark_bg_2 flex items-center p16">
        <div className="w-full flex items-center justify-between ">
          <button className="btn">
            <img
              src={user.picture}
              alt="profile pic"
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          <ul className="flex items-center gap-x-2.5">
            <li>
              <button className="btn">
                <CommunityIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
            <li>
              <button className="btn">
                <StoryIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
            <li>
              <button className="btn">
                <ChatIcon className="dark:fill-dark_svg_1" />
              </button>
            </li>
            <li className="relative">
              <button
                className={`btn ${showMenu ? "bg-dark_hover_1" : ""}`}
                onClick={() => setShowMenu(prev => !prev)}
              >
                <DotsIcon className="dark:fill-dark_svg_1" />
              </button>
              {showMenu && (
                <Menu
                  setShowCreateGroup={setShowCreateGroup}
                  setShowMenu={setShowMenu}
                />
              )}
            </li>
          </ul>
        </div>
      </div>
      {/* Create Group */}
      {showCreateGroup && (
        <CreateGroup setShowCreateGroup={setShowCreateGroup} />
      )}
    </>
  );
}

export default SidebarHeader;
