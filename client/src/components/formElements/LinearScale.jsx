import { Circle, Pencil, X } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "../FormContext";

const LinearScale = ({ id, isPreview }) => {
  const { updateComponent, formData, removeComponent, duplicateComponent } =
    useFormContext();
  const componentData = formData.find((item) => item.id === id) || {}; // Get component state from context
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(" Linear Scale:");
  const [tempTitle, setTempTitle] = useState("Title"); // For temporary title during edit
  const [isRequired, setIsRequired] = useState(false);
  const [tempIsRequired, setTempIsRequired] = useState(false); 
  const [bookmark, setBookmark] = useState("");
  const [bookmark2, setBookmark2] = useState("");
  const [tempOptions, setTempOptions] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);
  const [tempOptions2, setTempOptions2] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);
  const [selectedNumber, setSelectedNumber] = useState(tempOptions[0] || "0");
  
  const [selectedNumber2, setSelectedNumber2] = useState(tempOptions2[4] || "5");

  const numbers = Array.from({ length: selectedNumber2 }, (_, i) => i + 1);

  const handleEditClick = () => {
    setTempIsRequired(isRequired);
    setOpen(true);
  };

  const handleSave = () => {
    setTitle(tempTitle);
    setIsRequired(tempIsRequired);
    updateComponent(id, {
      title: tempTitle,
      isRequired: tempIsRequired,
      options: [{"selectedNumber":selectedNumber, "selectedNumber2": selectedNumber2, "bookmark1": bookmark, "bookmark2": bookmark2 }],
    });
    setOpen(false);
  };

  return (
    <>
      {isPreview ? (
        <>
          <div className="w-[93%] min-h-[118px] h-auto rounded-xl px-4 py-5 flex items-center">
            <div className="flex flex-col w-full">
              <span className="font-medium text-xl">
                {title}
                {isRequired ? <span className="text-red-600"> *</span> : <></>}
              </span>
              {!open && (
                <div className="flex w-full mt-2 mb-3">
                <div className="flex w-full justify-start gap-4 ">
                  {numbers.map((num) => (
                    <div key={num} className="flex flex-col items-center flex-1">
                      <span className="text-base font-medium">{num}</span>
                      <span className="text-2xl mt-4">
                        <Circle className="size-5" />
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              )}
              <span className="font-normal text-base mt-2">
                {bookmark}
              </span>
              <span className="font-normal text-base mt-2">
                {bookmark2}
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-[93%] min-h-[118px] h-auto rounded-xl border border-[#0000004D] px-4 py-5">
            <div className="flex w-full flex-wrap items-start gap-2">
              <span className="font-medium text-xl break-words w-full">
                {title}
                {isRequired ? <span className="text-red-600"> *</span> : null}
              </span>
              {!open && (
                <div className="flex flex-wrap items-center space-x-2 w-full sm:w-auto">
                  <select
                    className="w-[20%] min-w-[100px] p-2 outline-none cursor-not-allowed rounded-[14px] border border-[#0000004D]"
                    disabled
                  >
                    <option>{selectedNumber}</option>
                  </select>
                  <span className="text-base font-semibold">To</span>
                  <select
                    className="w-[20%] min-w-[100px] p-2 outline-none cursor-not-allowed rounded-[14px] border border-[#0000004D]"
                    disabled
                  >
                    <option>{selectedNumber2}</option>
                  </select>
                </div>
              )}
            </div>
            <hr className="text-[#D9D9D9] w-full mt-4" />
            <div className="flex gap-x-5 items-center mt-3 w-full">
              <button
                className="flex gap-x-3 items-center"
                onClick={() => removeComponent(id)}
              >
                <img
                  src="./Delete.png"
                  alt="delete"
                  className="text-black size-5"
                />
                <span className="text-base text-black font-medium">Delete</span>
              </button>
              <button
                className="flex gap-x-3 items-center"
                onClick={handleEditClick}
              >
                <Pencil
                  src="./Edit.png"
                  alt="edit"
                  className={` ${
                    open ? " text-[#04A118]" : "text-black"
                  } size-5`}
                />
                <span
                  className={`text-base ${
                    open ? " text-[#04A118]" : "text-black"
                  }  font-medium`}
                >
                  Edit
                </span>
              </button>
              <button
                className="flex gap-x-3 items-center"
                onClick={() => duplicateComponent(id)}
              >
                <img
                  src="./Duplicate.png"
                  alt="duplicate"
                  className="text-black size-5"
                />
                <span className="text-base text-black font-medium">
                  Duplicate
                </span>
              </button>
            </div>
          </div>

          {open && (
            <div className="w-[93%] h-auto rounded-xl border border-[#0000004D] px-4 py-5 gap-y-4 items-center flex flex-col">
              <div className="flex gap-x-4 items-center w-[95%]">
                <span className="font-medium text-xl"> Title:</span>
                <input
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  className="flex-1 px-4 py-3 justify-between w-[50%] border border-[#0000004D] rounded-xl"
                />
              </div>
              <div className=" flex space-x-5 items-center w-[95%]">
                <select
                  className="border border-[#0000004D] rounded-[14px] w-[45%] bg-transparent"
                  value={selectedNumber}
                  onChange={(e) => setSelectedNumber(e.target.value)}
                >
                  {tempOptions?.map((option, index) => (
                    <option>
                      <option
                        key={index}
                        className="font-normal text-base text-black"
                      >
                        {option}
                      </option>
                    </option>
                  ))}
                </select>
                <span className="text-base font-semibold">to</span>
                <select
                  className="border border-[#0000004D] rounded-[14px] w-[45%] bg-transparent"
                  value={selectedNumber2}
                  onChange={(e) => setSelectedNumber2(e.target.value)}
                >
                  {tempOptions2?.map((option, index) => (
                    <option>
                      <option
                        key={index}
                        className="font-normal text-base text-black"
                      >
                        {option}
                      </option>
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-x-4 items-center w-[95%]">
              <span className="font-semibold text-base">{selectedNumber}:</span>
                <input
                  type="text"
                  value={bookmark}
                  onChange={(e) => setBookmark(e.target.value)}
                  placeholder="Bookmark (Optional)"
                  className="flex-1 px-4 py-3 justify-between w-[50%] border border-[#0000004D] rounded-xl"
                />
              </div>
              <div className="flex gap-x-4 items-center w-[95%]">
                <span className="font-semibold text-base">{selectedNumber2}:</span>
                <input
                  type="text"
                  value={bookmark2}
                  onChange={(e) => setBookmark2(e.target.value)}
                  placeholder="Bookmark (Optional)"
                  className="flex-1 px-4 py-3 justify-between w-[50%] border border-[#0000004D] rounded-xl"
                />
              </div>

              <div className="flex items-center w-[95%] gap-x-2">
                <input
                  type="checkbox"
                  className="border border-[#808080] rounded-md size-4"
                  checked={tempIsRequired}
                  onChange={() => setTempIsRequired(!tempIsRequired)}
                />
                <span className="text-base font-normal">Required</span>
              </div>
              <span
                className="text-[#018E01] mx-auto text-lg font-normal underline cursor-pointer"
                onClick={handleSave}
              >
                Close
              </span>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default LinearScale;
