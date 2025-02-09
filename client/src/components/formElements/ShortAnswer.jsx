import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "../FormContext";

const ShortAnswer = ({ id, isPreview }) => {
  const { updateComponent, formData, removeComponent, duplicateComponent } =
    useFormContext();
  const componentData = formData.find((item) => item.id === id) || {}; // Get component state from context
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Short Answer");
  const [tempTitle, setTempTitle] = useState("Short Answer"); // For temporary title during edit
  const [isRequired, setIsRequired] = useState(false);
  const [tempIsRequired, setTempIsRequired] = useState(false); // Temporary required state (used in edit)

  const handleOpenChange = () => {
    if (open) {
      updateComponent(id, { title: tempTitle, isRequired: tempIsRequired });
    }
    setOpen(!open);
  };
  return (
    <>
      {isPreview ? (
        <>
          <div className="w-[93%] min-h-[118px] h-auto rounded-xl border border-[#0000004D] px-4 py-5 space-y-4">
            <span className="font-medium text-xl">
              {componentData.title || "Short Answer"}
              {componentData.isRequired && (
                <span className="text-red-500">*</span>
              )}
            </span>
            <textarea className="w-[95%] h-[62px] p-2 rounded-lg border border-[#0000004D] placeholder:text-[#0000004D] resize-none" />
          </div>
        </>
      ) : (
        <>
          <div className="w-[93%] h-[118px] rounded-xl border border-[#0000004D] px-4 py-5">
            <span className="font-medium text-xl">
              {componentData.title || "Short Answer"}
              {componentData.isRequired && (
                <span className="text-red-500">*</span>
              )}
            </span>
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

export default ShortAnswer;
