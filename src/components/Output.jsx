import React from "react";
import { useFormContext } from "./context/FormContext";
import OutPutIcon from "./icons/OutPutIcon";
import DotIcon from "./icons/DotIcon";

export const Output = () => {
  const { response } = useFormContext();

  return (
    <div className="rounded-lg shadow-lg min-w-[300px]">
      <div className="flex justify-between py-2.5 px-4 items-center text-black font-semibold text-sm">
        <div className="flex justify-center items-center gap-3">
          <OutPutIcon />
          OUTPUT
        </div>
        <DotIcon />
      </div>

      <div className="px-4 py-2.5 bg-[#EEF4FF] text-[#666666] font-medium text-sm">
        {"Wait For The Response"}
      </div>
      <div className="px-4 pt-2.5 pb-4 flex items-start flex-col">
        <label className="pb-2 text-[#000000] text-sm ">Output Response</label>
        <textarea
          value={response}
          readOnly
          className="w-full min-h-[150px] border-[1px] rounded-[4px] border-solid border-[#666666] px-3 py-1 text-sm font-normal focus:outline-none"
          placeholder="Output response will be shown here"
          required
        />
      </div>
      <div className="pt-2 px-4 pb-6 text-xs text-[#666666] flex justify-start font-medium items-start">
        LLM Engine
      </div>
    </div>
  );
};
