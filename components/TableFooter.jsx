import React, { useEffect } from "react";



const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div className="">
      {range.map((el, index) => (
        <button
          key={index}
          className={`mt-4 mr-2 border border-black p-3 text-[.8rem] rounded-md bg-[#0f0fd8] ${
            page === el ? 'border border-black p-3 text-[1rem] bg-[#0f0fd8] text-[white]' : 'hover:bg-[#2828eb]'
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;