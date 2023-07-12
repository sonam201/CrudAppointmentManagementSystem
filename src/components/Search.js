import { MdArrowDropDown, MdDone } from "react-icons/md";
import { useState } from "react";

const DropDown = ({
  toogle,
  sortBy,
  onOrderByChange,
  orderBy,
  onSortByChange,
}) => {
  if (!toogle) {
    return null;
  }
  return (
    <div className="w-[30%]  text-start px-2 ml-[90px]  mt-3 border-2">
      <div className="flex justify-between">
        <h1 onClick={() => onSortByChange("petName")}>Pet Name</h1>
        {sortBy === "petName" && <MdDone className="mt-1" />}
      </div>
      <div className="flex justify-between">
        <h1 onClick={() => onSortByChange("ownerName")}>Owner Name</h1>
        {sortBy === "ownerName" && <MdDone className="mt-1" />}
      </div>
      <div className="flex justify-between">
        <h1 onClick={() => onSortByChange("aptDate")}>Date</h1>
        {sortBy === "aptDate" && <MdDone className="mt-1" />}
      </div>
      <hr className="border-2" />
      <div className="flex justify-between">
        <h1 onClick={() => onOrderByChange("asc")}>ASC</h1>
        {orderBy === "asc" && <MdDone className="mt-1" />}
      </div>
      <div className="flex justify-between">
        <h1 onClick={() => onOrderByChange("desc")}>DSC</h1>
        {orderBy === "desc" && <MdDone className="mt-1" />}
      </div>
    </div>
  );
};

const Search = ({
  query,
  onQueryChange,
  sortBy,
  onSortByChange,
  orderBy,
  onOrderByChange,
}) => {
  let [toogleSort, setToogleSort] = useState(false);
  return (
    <div className="w-[50%] ml-[18%]">
      <div className="mt-5 text-start  flex gap-4">
        <input
          onChange={(event) => {
            onQueryChange(event.target.value);
          }}
          value={query}
          placeholder="🔍 Search"
          className="border-2 pr-4 rounded-xl outline-none"
        />
        <button
          className="flex bg-blue-300 rounded-md px-1"
          onClick={() => {
            setToogleSort(!toogleSort);
          }}
        >
          Sort By <MdArrowDropDown className="mt-1 " />
        </button>
      </div>
      <DropDown
        toogle={toogleSort}
        sortBy={sortBy}
        onSortByChange={(mySort) => onSortByChange(mySort)}
        orderBy={orderBy}
        onOrderByChange={(myOrder) => onOrderByChange(myOrder)}
      />
    </div>
  );
};
export default Search;
