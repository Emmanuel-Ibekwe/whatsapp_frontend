import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { ReturnIcon, ValidIcon } from "../../../../svg";
import UnderlineInput from "./UnderlineInput";
import MultipleSelect from "./MultipleSelect";
import { createGroupConversation } from "../../../../store/chatSlice";

export default function CreateGroup({ setShowCreateGroup }) {
  const { user } = useSelector(state => state.user);
  const { status } = useSelector(state => state.chat);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const createGroupHandler = async () => {
    if (status !== "loading") {
      let users = [];
      selectedUsers.forEach(user => {
        users.push(user.value);
      });
      let values = {
        name,
        users,
        token: user.token
      };
      let newConvo = await dispatch(createGroupConversation(values));
      setShowCreateGroup(false);
    }
  };

  const handleSearch = async e => {
    if (e.target.value) {
      setSearchResults([]);

      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_ENDPOINT}/user?search=${e.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        );

        if (data.length > 0) {
          let tempArray = [];
          data.forEach(user => {
            let temp = {
              value: user._id,
              label: user.name,
              picture: user.picture
            };
            tempArray.push(temp);
          });
          setSearchResults(tempArray);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setSearchResults([]);
    }
  };
  return (
    <div className="createGroupAnimation w-full flex0030 h-full z-50 ml-2 absolute top-0 left-0 dark:bg-dark_bg_2">
      <div className="mt-5">
        {/* Return/Close button */}
        <button className="btn" onClick={() => setShowCreateGroup(false)}>
          <ReturnIcon className="fill-white" />
        </button>
        {/* Group name input */}
        <UnderlineInput name={name} onSetName={setName} />
        {/* Multiple select */}
        <MultipleSelect
          selectedUsers={selectedUsers}
          searchResults={searchResults}
          setSelectedUsers={setSelectedUsers}
          handleSearch={handleSearch}
        />
        {/* Create group button */}
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2">
          {status === "loading" ? (
            <button className="btn bg-green_1 scale-150 hover:bg-green-500">
              <ClipLoader color="#e9edef" size={25} />
            </button>
          ) : (
            <button
              onClick={createGroupHandler}
              className="btn bg-green_1 scale-150 hover:bg-green-500"
            >
              <ValidIcon className="fill-white mt-2 h-full" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
