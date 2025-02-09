import { Pencil, Calendar as CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useFormContext } from "../FormContext";

const DateField = ({ id, isPreview }) => {
  const { updateComponent, formData, removeComponent, duplicateComponent } = useFormContext();
  const componentData = formData.find((item) => item.id === id) || {}; // Get component state from context

  const [open, setOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [value, onChange] = useState(new Date());
  const [title, setTitle] = useState("Date Field");
  const [tempTitle, setTempTitle] = useState("Date Field"); // For temporary title during edit
  const [isRequired, setIsRequired] = useState(false);
  const [tempIsRequired, setTempIsRequired] = useState(false); // Temporary required state (used in edit)

  const handleOpenChange = () => {
    if (open) {
      // If the user is closing, update the title only if the temp title has changed
      setTitle(tempTitle || "Date Field"); // If nothing is entered, default to 'Title'
      setIsRequired(tempIsRequired); // Apply the required state after closing
      updateComponent(id, { title: tempTitle, isRequired: tempIsRequired });
    }
    setOpen(!open);
  };

  return (
    <>
      {isPreview ? (
        <>
          <div className="w-[93%] min-h-[88px] h-auto flex items-center rounded-xl border border-[#0000004D] px-4">
            <div className="flex gap-x-4 items-center w-full ">
              <span className="font-medium text-xl">
              {componentData.title || "Date Field"}:
              {componentData.isRequired && (
                <span className="text-red-500">*</span>
              )}
              </span>
              <div
                className="flex px-4 py-3 justify-between w-[50%] border border-[#0000004D] rounded-xl cursor-pointer"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <span className="text-[#0000004D]">
                  {value ? value.toDateString() : "Select Date"}
                </span>
                <CalendarIcon className="text-black size-5" />
              </div>
            </div>
            {/* Conditional rendering of Calendar */}
            {showCalendar && (
              <div className="absolute mt-[22%] ml-[5%]">
                <Calendar
                  onChange={(date) => {
                    onChange(date);
                    setShowCalendar(false); // Close calendar after selecting
                  }}
                  value={value}
                  className="relative"
                />
              </div>
            )}
          </div>{" "}
        </>
      ) : (
        <>
          <div className="w-[93%] h-[118px] rounded-xl border border-[#0000004D] px-4 pt-2 pb-5">
            <div className="flex gap-x-4 items-center">
              <span className="font-medium text-xl">
              {componentData.title || "Date Field"}:
              {componentData.isRequired && (
                <span className="text-red-500">*</span>
              )}
              </span>
              <div
                className="flex px-4 py-3 justify-between w-[50%] border border-[#0000004D] rounded-xl cursor-pointer"
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <span className="text-[#0000004D]">
                  {value ? value.toDateString() : "Select Date"}
                </span>
                <CalendarIcon className="text-black size-5" />
              </div>
            </div>
            {/* Conditional rendering of Calendar */}
            {showCalendar && (
              <div className="absolute ml-[5%]">
                <Calendar
                  onChange={(date) => {
                    onChange(date);
                    setShowCalendar(false); // Close calendar after selecting
                  }}
                  value={value}
                  className="relative"
                />
              </div>
            )}
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

export default DateField;
