import { Pencil, X } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "../FormContext";


const DropDownList = ({ id, isPreview }) => {
  const { updateComponent, formData, removeComponent, duplicateComponent } = useFormContext();
  const componentData = formData.find((item) => item.id === id) || {}; // Get component state from context
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("DropdownList");
  const [tempTitle, setTempTitle] = useState("Title"); // For temporary title during edit
  const [isRequired, setIsRequired] = useState(false);
  const [tempIsRequired, setTempIsRequired] = useState(false); // Temporary required state (used in edit)
  const [options, setOptions] = useState([]);
  const [tempOptions, setTempOptions] = useState([]);

  const handleEditClick = () => {
    setTempOptions(options.length > 0 ? [...options] : ["Option 1"]); // Ensure at least one option
    setTempIsRequired(isRequired);
    setOpen(true);
  };

  const handleSave = () => {
    setTitle(tempTitle);
    setOptions(tempOptions);
    setIsRequired(tempIsRequired);
    updateComponent(id, {
      title: tempTitle,
      isRequired: tempIsRequired,
      options: [tempOptions],
    });
    setOpen(false);
  };

  const handleAddOption = () => {
    setTempOptions([...tempOptions, `Option ${tempOptions.length + 1}`]);
  };

  const handleRemoveOption = (index) => {
    const newOptions = tempOptions.filter((_, i) => i !== index);
    setTempOptions(newOptions.length > 0 ? newOptions : ["Option 1"]);
    updateComponent(id, {
      title: tempTitle,
      isRequired: tempIsRequired,
      options: [newOptions],
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...tempOptions];
    newOptions[index] = value;
    setTempOptions(newOptions);
    updateComponent(id, {
      title: tempTitle,
      isRequired: tempIsRequired,
      options: [newOptions],
    });
  };

  return (
    <>
      {isPreview ? (
        <>
          <div className="w-[93%] min-h-[118px] h-auto rounded-xl border border-[#0000004D] px-4 py-5">
            <span className="font-medium text-xl">
              {title}
              {isRequired ? <span className="text-red-600"> *</span> : <></>}
            </span>
            {options.length > 0 && (
              <div className="mb-2 flex-1 w-full">
                <div className="flex gap-2 mt-2 w-full">
                  <select className=" w-full">
                    {options.map((option, index) => (
                      <option>
                        <span
                          key={index}
                          className="font-normal text-base text-black"
                        >
                          {option}
                        </span>
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="w-[93%] min-h-[118px] h-auto rounded-xl border border-[#0000004D] px-4 py-5">
            <span className="font-medium text-xl">
              {title}
              {isRequired ? <span className="text-red-600"> *</span> : <></>}
            </span>
            {options.length > 0 && (
              <div className="mb-2 flex-1 w-full">
                <div className="flex gap-2 mt-2 w-full">
                  <select className=" w-full">
                    {options.map((option, index) => (
                      <option>
                        <span
                          key={index}
                          className="font-normal text-base text-black"
                        >
                          {option}
                        </span>
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
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
              <div className="w-[95%]">
                {tempOptions.map((option, index) => (
                  <div key={index} className="flex mt-5 w-full items-center">
                    <div className="w-[95%] h-auto rounded-xl border border-[#0000004D] gap-x-2 px-4 py-2 flex items-center">
                      <input type="checkbox" className="size-4" />
                      <input
                        type="text"
                        className="outline-none text-lg"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                      />
                    </div>
                    {index !== 0 && (
                      <button
                        onClick={() => handleRemoveOption(index)}
                        className="ml-2 rounded-full bg-red-500 flex items-center justify-center size-5"
                      >
                        <X className="size-3 text-white" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between w-[95%] gap-x-2">
                <div className="flex items-center gap-x-2">
                  <input
                    type="checkbox"
                    className="border border-[#808080] rounded-md size-4"
                    checked={tempIsRequired}
                    onChange={() => setTempIsRequired(!tempIsRequired)}
                  />
                  <span className="text-base font-normal">Required</span>
                </div>
                <button
                  onClick={handleAddOption}
                  className="bg-[#04A118] text-white py-[6px] px-2 rounded-lg hover:shadow-lg text-base font-semibold"
                >
                  Add Option
                </button>
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

export default DropDownList;
