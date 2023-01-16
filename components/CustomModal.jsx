import React, { useState } from "react";
import { TiTimes } from "react-icons/ti";

function CustomModal({ Show, setShow, loading, title, body, onConfirm }) {
  const ConfirmHandler = async () => {
    var data = await onConfirm();

    handleClose();
  };

  const handleClose = () => setShow(false);

  return (
    <>
      {Show && (
        <div className="absolute bg-[white] w-[300px] h-[200px] rounded p-2 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="flex items-center justify-between">
            <div className="text-[1.2rem]">{title}</div>
            <div
              onClick={handleClose}
              className="rounded-md p-2 hover:bg-slate-300"
            >
              <TiTimes />
            </div>
          </div>
          <div className="mt-5 mb-[2.3rem] text-[.95rem]">{body}</div>
          <div className="flex items-center justify-start gap-3 mr-1">
            <button onClick={ConfirmHandler} className="primary-button">
              {loading ? "صبر کنید" : "تایید"}
            </button>
            <button onClick={handleClose} className="">
              انصراف
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CustomModal;
