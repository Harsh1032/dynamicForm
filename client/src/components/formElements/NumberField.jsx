import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "../FormContext";

const NumberField = ({ id, isPreview }) => {
  const { updateComponent, formData, removeComponent, duplicateComponent } =
    useFormContext();
  const componentData = formData.find((item) => item.id === id) || {}; // Get component state from context
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Number Field");
  const [tempTitle, setTempTitle] = useState("Number Field"); // For temporary title during edit
  const [isRequired, setIsRequired] = useState(false);
  const [tempIsRequired, setTempIsRequired] = useState(false); // Temporary required state (used in edit)
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(3);

  const handleOpenChange = () => {
    if (open) {
      updateComponent(id, { title: tempTitle, isRequired: tempIsRequired, options: [{ "minValue": minValue, "maxValue": maxValue}]});
    }
    setOpen(!open);
  };

  return (
    <>
      {isPreview ? (
        <>
          <div className="w-[93%] h-[118px] rounded-xl border border-[#0000004D] px-4 flex items-center">
            <div className="flex flex-col gap-y-4 w-full">
              <span className="font-medium text-xl">
                {componentData.title || "Number Field"}
                {componentData.isRequired && (
                  <span className="text-red-500">*</span>
                )}
              </span>
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="3"
                max={maxValue}
                min={minValue}
                className="flex-1 px-4 py-3 justify-between border border-[#0000004D] rounded-xl appearance-none"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-[93%] h-[118px] rounded-xl border border-[#0000004D] px-4 pt-2 pb-5">
            <div className="flex gap-x-4 items-center">
              <span className="font-medium text-xl">
                {componentData.title || "Number Field"}
                {componentData.isRequired && (
                  <span className="text-red-500">*</span>
                )}
              </span>
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="3"
                max={maxValue}
                min={minValue}
                className="flex px-4 py-3 justify-between w-[50%] border border-[#0000004D] rounded-xl appearance-none"
              />
            </div>
            <hr className="text-[#D9D9D9] w-full mt-2" />
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
                onClick={handleOpenChange}
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
              <input
                className="w-[95%] p-2 rounded-lg border border-[#0000004D] placeholder:text-[#0000004D]"
                placeholder="Title"
                value={tempTitle} // Use tempTitle for input field
                onChange={(e) => setTempTitle(e.target.value)} // Update tempTitle on input change
              />
              <div className="flex gap-x-4 items-center w-[95%]">
                <span className="font-medium text-xl"> Maximum:</span>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={maxValue}
                  onChange={(e) => setMaxValue(e.target.value)}
                  placeholder="3"
                  className="flex-1 px-4 py-3 justify-between w-[50%] border border-[#0000004D] rounded-xl"
                />
              </div>
              <div className="flex gap-x-4 items-center w-[95%]">
                <span className="font-medium text-xl">Minimum:</span>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={minValue}
                  onChange={(e) => setMinValue(e.target.value)}
                  placeholder="1"
                  className="flex-1 px-4 py-3 justify-between w-[50%] border border-[#0000004D] rounded-xl"
                />
              </div>
              <div className="flex items-center w-[95%] gap-x-2">
                <input
                  type="checkbox"
                  className="border border-[#808080] rounded-md size-4"
                  checked={tempIsRequired} // Use temporary state
                  onChange={() => setTempIsRequired(!tempIsRequired)}
                />

                <span className="text-base font-normal">Required</span>
              </div>
              <span
                className="text-[#018E01] mx-auto text-lg font-normal underline cursor-pointer"
                onClick={handleOpenChange}
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

export default NumberField;
