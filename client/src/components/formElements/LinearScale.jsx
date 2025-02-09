import { Pencil, X } from "lucide-react";
import React, { useState } from "react";

const LinearScale = ({ id, onDelete, onDuplicate, isPreview }) => {
 const [open, setOpen] = useState(false);
   const [title, setTitle] = useState(" Linear Scale");
   const [tempTitle, setTempTitle] = useState("Linear Scale"); // For temporary title during edit
   const [isRequired, setIsRequired] = useState(false);
   const [tempIsRequired, setTempIsRequired] = useState(false); // Temporary required state (used in edit)
   const [options, setOptions] = useState([]);
   const [tempOptions, setTempOptions] = useState([
     1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
   ]);
   const [selectedNumber, setSelectedNumber] = useState(tempOptions[4] || "5");
   const [selectedIcon, setSelectedIcon] = useState("⭐");
 
   const [finalNumber, setFinalNumber] = useState(selectedNumber);
   const [finalIcon, setFinalIcon] = useState(selectedIcon);
 
   const numbers = Array.from({ length: selectedNumber }, (_, i) => i + 1);
 
   const handleEditClick = () => {
     setTempIsRequired(isRequired);
     setOpen(true);
   };
 
   const handleSave = () => {
     setTitle(tempTitle);
     setIsRequired(tempIsRequired);
 
     // Save selected values to final states
     setFinalNumber(selectedNumber);
     setFinalIcon(selectedIcon);
 
     setOpen(false);
   };
 
   return (
     <>
       {isPreview ? (
         <>
           {/* <div className="w-[93%] min-h-[118px] h-auto rounded-xl border border-[#0000004D] px-4 py-5 flex items-center">
             <div className="flex  flex-col w-full space-x-4">
               <span className="font-medium text-xl">
                 {title}
                 {isRequired ? <span className="text-red-600"> *</span> : <></>}
               </span>
               {!open && (
                 <div className="flex space-x-4 mt-2">
                   <div className="flex space-x-4">
                     {numbers.map((num) => (
                       <div key={num} className="flex flex-col items-center">
                         <span className="text-2xl font-medium">{num}</span>
                         <span className="text-2xl">{selectedIcon}</span>
                       </div>
                     ))}
                   </div>
                 </div>
               )}
             </div>
           </div> */}
         </>
       ) : (
         <>
           <div className="w-[93%] min-h-[118px] h-auto rounded-xl border border-[#0000004D] px-4 py-5">
             <div className="flex w-full items-center space-x-4">
               <span className="font-medium text-xl">
                 {title}
                 {isRequired ? <span className="text-red-600"> *</span> : <></>}
               </span>
               {!open && (
                 <div className="flex-1 space-x-4 mt-2">
                   <select
                     className="w-[20%] p-2 outline-none cursor-not-allowed rounded-[14px] border border-[#0000004D]"
                     disabled
                   >
                     <option>{finalNumber}</option>
                   </select>
                   <span className="text-base font-semibold">To</span>
                   <select
                     className="w-[20%] p-2 outline-none cursor-not-allowed rounded-[14px] border border-[#0000004D]"
                     disabled
                   >
                     <option>{finalIcon}</option>
                   </select>
                 </div>
               )}
             </div>
             <hr className="text-[#D9D9D9] w-full mt-4" />
             <div className="flex gap-x-5 items-center mt-3 w-full">
               <button
                 className="flex gap-x-3 items-center"
                 onClick={() => onDelete(id)}
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
                 onClick={() => onDuplicate(id)}
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
                   className="border border-gray-400 rounded-lg w-[45%] bg-white"
                   value={selectedIcon}
                   onChange={(e) => setSelectedIcon(e.target.value)}
                 >
                   <option className="star">⭐ </option>
                   <option className="heart">❤️ </option>
                   <option className="text-blue-500">👍 </option>
                 </select>
               </div>
               <div className="flex space-x-4 text-center">
                 {numbers.map((num) => (
                   <div key={num} className="flex flex-col items-center">
                     <span className="text-2xl font-medium">{num}</span>
                     <span className="text-2xl">{selectedIcon}</span>
                   </div>
                 ))}
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
 
export default LinearScale