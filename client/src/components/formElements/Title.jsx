import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "../FormContext";

const Title = ({ id,  isPreview }) => {
  const {updateComponent, formData, removeComponent, duplicateComponent} = useFormContext();
  const componentData = formData.find((item) => item.id === id) || {}; // Get component state from context
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("Title");
  const [tempTitle, setTempTitle] = useState("Title"); // For temporary title during edit
  const [selectedHeading, setSelectedHeading] = useState("H1"); // State for selected heading
  const handleOpenChange = () => {
    if (open) {
      // If the user is closing, update the title only if the temp title has changed
      setTitle(tempTitle || "Title"); // If nothing is entered, default to 'Title'
      updateComponent(id, { title: tempTitle });
    }
    setOpen(!open);
  };

  const handleHeadingChange = (e) => {
    setSelectedHeading(e.target.value); // Update heading based on select value // Update heading based on select value
    updateComponent(id, { selectedHeading: e.target.value });
  };

  // Render the title with the selected heading
  const renderTitle = () => {
    switch (selectedHeading) {
      case "H1":
        return <h1 className="font-medium text-2xl">{title}</h1>; // H1 with a larger font size
      case "H2":
        return <h2 className="font-medium text-xl">{title}</h2>; // H2 with a slightly smaller font size
      case "H3":
        return <h3 className="font-medium text-lg">{title}</h3>; // H3 with a medium font size
      case "H4":
        return <h4 className="font-medium text-base">{title}</h4>; // H4 with a smaller font size
      case "H5":
        return <h5 className="font-medium text-sm">{title}</h5>; // H5 with a small font size
      default:
        return <h2 className="font-medium text-xl">{title}</h2>; // Default to H1
    }
  };

  return (
    <>
      {isPreview ? (
        <div className="w-[93%] min-h-[67px] h-auto rounded-xl border border-[#0000004D] px-4 py-5">
          {renderTitle()}
        </div>
      ) : (
        <>
          <div className="w-[93%] min-h-[118px] h-auto rounded-xl border border-[#0000004D] px-4 py-5">
            {renderTitle()}
            <hr className="text-[#D9D9D9] w-full mt-4 relative" />
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
              <select
                className="w-[95%] px-2 py-2 rounded-lg border border-[#0000004D] appearance-none"
                value={selectedHeading}
                onChange={handleHeadingChange}
              >
                <option className="text-base font-normal text-black">H1</option>
                <option className="text-base font-normal text-black">H2</option>
                <option className="text-base font-normal text-black">H3</option>
                <option className="text-base font-normal text-black">H4</option>
                <option className="text-base font-normal text-black">H5</option>
              </select>
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

export default Title;
