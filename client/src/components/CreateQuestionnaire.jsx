import { Calendar } from "lucide-react";
import React, { useState, useEffect } from "react";
import Title from "./formElements/Title";
import Paragraph from "./formElements/Paragraph";
import DateField from "./formElements/DateField";
import NumberField from "./formElements/NumberField";
import ShortAnswer from "./formElements/ShortAnswer";
import LongAnswer from "./formElements/LongAnswer";
import Options from "./formElements/Options";
import MultipleChoice from "./formElements/MultipleChoice";
import DropDownList from "./formElements/DropDownList";
import Rating from "./formElements/Rating";
import LinearScale from "./formElements/LinearScale";
import { useFormContext } from "./FormContext";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Component Mapping
const componentMap = {
  title: Title,
  paragraph: Paragraph,
  dateField: DateField,
  numberField: NumberField,
  shortAnswer: ShortAnswer,
  longAnswer: LongAnswer,
  options: Options,
  multipleChoice: MultipleChoice,
  dropDownList: DropDownList,
  rating: Rating,
  linearScale: LinearScale,
};

const DraggableComponent = ({ component, index, moveComponent, isPreview }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: "FORM_ELEMENT",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveComponent(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "FORM_ELEMENT",
    item: { type: component.type, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const Component = componentMap[component.type];
  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className=" space-y-4 w-full flex flex-col items-center cursor-pointer">
      <Component id={component.id} isPreview={isPreview}/>
    </div>
  );
};

const CreateQuestionnaire = () => {
  const [selectedButton, setSelectedButton] = useState("myPreConsultation");
  const [selectedComponent, setSelectedComponent] = useState("title");
  const [components, setComponents] = useState([]);
  const [isPreview, setIsPreview] = useState(false);
  const { formData, addComponent, resetFormData } = useFormContext();

  useEffect(() => {
    // When formData changes, update components state.
    setComponents(formData);
  }, [formData]);

  console.log("component", components);

  const handleSave = async () => {
    // Prepare the form data dynamically based on form components
    const formattedFields = components.map(
      ({ id, title, type, isRequired, options }) => {
        let fieldData = {
          label: title || "", // Ensure the label is provided
          type: type, // Field type
          required: isRequired || false, // If the field is required
          options: [], // Initialize options as an empty array
        };

        switch (type) {
          case "options":
          case "multipleChoice":
          case "dropDownList":
            fieldData.options = options || []; // Handle multiple choice or group options
            break;
          case "rating":
            // Rating will have a specific structure for options (if available)
            fieldData.options = options || [{ number: "5", icon: "⭐" }];
            break;
          case "numberField":
            // For number type, we can add options as an empty array (no specific options needed based on your info)
            fieldData.options = options || [];
            break;
          case "title":
          case "paragraph":
          case "shortAnswer":
          case "longAnswer":
            // For title and paragraph, no special handling needed for options
            fieldData.options = [];
            break;
          default:
            break;
        }

        return fieldData;
      }
    );

    const formDataToSend = {
      title: "data", // Form title
      description: "hello", // Form description
      fields: formattedFields, // Dynamically formatted fields
    };

    try {
      const response = await fetch("http://localhost:5000/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataToSend), // Send form data as JSON
      });

      const data = await response.json();
      setComponents([]);
      setIsPreview(false); // Optionally reset preview state
      resetFormData();
      console.log("Form Saved:", data); // Log saved form data
    } catch (error) {
      console.error("Error saving form:", error); // Handle any errors
    }
  };

  const moveComponent = (fromIndex, toIndex) => {
    const updatedComponents = [...components];
    const [movedItem] = updatedComponents.splice(fromIndex, 1);
    updatedComponents.splice(toIndex, 0, movedItem);
    setComponents(updatedComponents);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full flex flex-col my-5">
        <div className="flex flex-col gap-y-4 w-full items-center">
          <div className="flex items-center w-[77%] gap-1">
            <span className="font-semibold text-base">Creation Date:</span>
            <span className="text-red-600 size-4"> *</span>
            <div className="flex px-4 py-3 justify-between w-[30%] border border-[#0000004D] rounded-xl">
              <span className="text-[#0000004D]">Select Date</span>
              <Calendar className="text-[#0000004D]" />
            </div>
          </div>
          <div className="flex items-center w-[77%] gap-1">
            <span className="font-semibold text-base">Description</span>
            <span className="text-red-600 size-4"> *</span>
            <input
              className="flex-1 text-[#0000004D] px-4 py-3 justify-between border border-[#0000004D] rounded-xl"
              placeholder="Write here..."
            />
          </div>
          <div className="flex items-center w-[77%] gap-1">
            <button
              className={`rounded-lg p-2 font-semibold transition-colors duration-300 hover:shadow-lg ${
                selectedButton === "myPreConsultation"
                  ? "bg-[#04A118] text-white"
                  : "bg-transparent border border-[#0000004D] text-[#0000004D]"
              }`}
              onClick={() => {
                setSelectedButton("myPreConsultation");
                setIsPreview(false);
              }}
            >
              <span className="font-semibold">
                Pre-consultation Questionnaire
              </span>
            </button>
            <button
              className={`rounded-lg p-2 font-semibold transition-colors duration-300 hover:shadow-lg ${
                selectedButton === "preview"
                  ? "bg-[#04A118] text-white"
                  : "bg-transparent border border-[#0000004D] text-[#0000004D]"
              }`}
              onClick={() => {
                setIsPreview(true);
                setSelectedButton("preview");
              }}
            >
              <span className="font-semibold">Preview</span>
            </button>
          </div>

          <div className="flex w-[77%] justify-between">
            {components?.length === 0 ? (
              <div className="w-[70%] h-[628px] rounded-xl border border-[#00000004D] flex flex-col justify-center items-center">
                <div className="gap-y-4 w-[50%] flex flex-col justify-center items-center text-center">
                  <img
                    src="./empty.png"
                    alt="empty"
                    className="w-[225px] h-[150px]"
                  />
                  <span className="font-semibold text-xl">
                    Drag the fields from the right here
                  </span>
                  <span className="text-[#808080] font-normal text-base">
                    You can build a personalized questionnaire according to your
                    public
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-[70%] min-h-[628px] h-auto rounded-xl border border-[#00000004D] flex flex-col items-center py-5 gap-y-[14px]">
               {components.map((component, index) => (
                <DraggableComponent
                  key={component.id}
                  component={component}
                  index={index}
                  moveComponent={moveComponent}
                  isPreview={isPreview}
                />
              ))}
              </div>
            )}
            <div className="w-[28%] h-[628px] rounded-xl flex flex-col gap-y-[10px]">
              <button
                className={`w-full h-[48px] rounded-xl flex items-center px-4 gap-4 cursor-pointer ${
                  selectedComponent === "title"
                    ? "bg-gradient-to-r from-[#006838] to-[#96CF24]"
                    : "border border-[#0000004D]"
                } `}
                onClick={() => {
                  addComponent("title");
                  setSelectedComponent("title");
                }}
              >
                <img
                  src={
                    selectedComponent === "title"
                      ? "./TitleWhite.png"
                      : "./Title.png"
                  }
                  alt="title"
                  className="size-5"
                />
                <span
                  className={`text-base font-medium ${
                    selectedComponent === "title" ? "text-white" : "text-black"
                  }`}
                >
                  Title
                </span>
              </button>
              <button
                className={`w-full h-[48px] rounded-xl flex items-center px-4 gap-4 cursor-pointer ${
                  selectedComponent === "paragraph"
                    ? "bg-gradient-to-r from-[#006838] to-[#96CF24]"
                    : "border border-[#0000004D]"
                } `}
                onClick={() => {
                  addComponent("paragraph");
                  setSelectedComponent("paragraph");
                }}
              >
                <img
                  src={
                    selectedComponent === "paragraph"
                      ? "./ParagraphWhite.png"
                      : "./Paragraph.png"
                  }
                  alt="paragraph"
                  className="size-5"
                />
                <span
                  className={`text-base font-medium ${
                    selectedComponent === "paragraph"
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  Paragraph
                </span>
              </button>
              <button
                className={`w-full h-[48px] rounded-xl flex items-center px-4 gap-4 cursor-pointer ${
                  selectedComponent === "dateField"
                    ? "bg-gradient-to-r from-[#006838] to-[#96CF24]"
                    : "border border-[#0000004D]"
                } `}
                onClick={() => {
                  addComponent("dateField");
                  setSelectedComponent("dateField");
                }}
              >
                <img
                  src={
                    selectedComponent === "dateField"
                      ? "./DateWhite.png"
                      : "./Date.png"
                  }
                  alt="date and time"
                  className="size-5"
                />
                <span
                  className={`text-base font-medium ${
                    selectedComponent === "dateField"
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  Date field
                </span>
              </button>
              <button
                className={`w-full h-[48px] rounded-xl flex items-center px-4 gap-4 cursor-pointer ${
                  selectedComponent === "numberField"
                    ? "bg-gradient-to-r from-[#006838] to-[#96CF24]"
                    : "border border-[#0000004D]"
                } `}
                onClick={() => {
                  addComponent("numberField");
                  setSelectedComponent("numberField");
                }}
              >
                <img
                  src={
                    selectedComponent === "numberField"
                      ? "./NumberWhite.png"
                      : "./Number.png"
                  }
                  alt="number"
                  className="size-5"
                />
                <span
                  className={`text-base font-medium ${
                    selectedComponent === "numberField"
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  Number field
                </span>
              </button>
              <button
                className={`w-full h-[48px] rounded-xl flex items-center px-4 gap-4 cursor-pointer ${
                  selectedComponent === "shortAnswer"
                    ? "bg-gradient-to-r from-[#006838] to-[#96CF24]"
                    : "border border-[#0000004D]"
                } `}
                onClick={() => {
                  addComponent("shortAnswer");
                  setSelectedComponent("shortAnswer");
                }}
              >
                <img
                  src={
                    selectedComponent === "shortAnswer"
                      ? "./ShortAnswerWhite.png"
                      : "./ShortAnswer.png"
                  }
                  alt="Short Answer"
                  className="size-5"
                />
                <span
                  className={`text-base font-medium ${
                    selectedComponent === "shortAnswer"
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  Short answer
                </span>
              </button>
              <button
                className={`w-full h-[48px] rounded-xl flex items-center px-4 gap-4 cursor-pointer ${
                  selectedComponent === "longAnswer"
                    ? "bg-gradient-to-r from-[#006838] to-[#96CF24]"
                    : "border border-[#0000004D]"
                } `}
                onClick={() => {
                  addComponent("longAnswer");
                  setSelectedComponent("longAnswer");
                }}
              >
                <img
                  src={
                    selectedComponent === "longAnswer"
                      ? "./LongAnswerWhite.png"
                      : "./LongAnswer.png"
                  }
                  alt="Long Answer"
                  className="size-5"
                />
                <span
                  className={`text-base font-medium ${
                    selectedComponent === "longAnswer"
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  Long answer
                </span>
              </button>
              <button
                className={`w-full h-[48px] rounded-xl flex items-center px-4 gap-4 cursor-pointer ${
                  selectedComponent === "options"
                    ? "bg-gradient-to-r from-[#006838] to-[#96CF24]"
                    : "border border-[#0000004D]"
                } `}
                onClick={() => {
                  addComponent("options");
                  setSelectedComponent("options");
                }}
              >
                <img
                  src={
                    selectedComponent === "options"
                      ? "./OptionsWhite.png"
                      : "./Options.png"
                  }
                  alt="Group of Options"
                  className="size-5"
                />
                <span
                  className={`text-base font-medium ${
                    selectedComponent === "options"
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  Group of options
                </span>
              </button>
              <button
                className={`w-full h-[48px] rounded-xl flex items-center px-4 gap-4 cursor-pointer ${
                  selectedComponent === "multipleChoice"
                    ? "bg-gradient-to-r from-[#006838] to-[#96CF24]"
                    : "border border-[#0000004D]"
                } `}
                onClick={() => {
                  addComponent("multipleChoice");
                  setSelectedComponent("multipleChoice");
                }}
              >
                <img
                  src={
                    selectedComponent === "multipleChoice"
                      ? "./MultipleChoiceWhite.png"
                      : "./MultipleChoice.png"
                  }
                  alt="Multiple Choice"
                  className="size-5"
                />
                <span
                  className={`text-base font-medium ${
                    selectedComponent === "multipleChoice"
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  Multiple choice
                </span>
              </button>
              <button
                className={`w-full h-[48px] rounded-xl flex items-center px-4 gap-4 cursor-pointer ${
                  selectedComponent === "dropDownList"
                    ? "bg-gradient-to-r from-[#006838] to-[#96CF24]"
                    : "border border-[#0000004D]"
                } `}
                onClick={() => {
                  addComponent("dropDownList");
                  setSelectedComponent("dropDownList");
                }}
              >
                <img
                  src={
                    selectedComponent === "dropDownList"
                      ? "./DropdownListWhite.png"
                      : "./DropdownList.png"
                  }
                  alt="Dropdown List"
                  className="size-5"
                />
                <span
                  className={`text-base font-medium ${
                    selectedComponent === "dropDownList"
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  Dropdown list
                </span>
              </button>
              <button
                className={`w-full h-[48px] rounded-xl flex items-center px-4 gap-4 cursor-pointer ${
                  selectedComponent === "linearScale"
                    ? "bg-gradient-to-r from-[#006838] to-[#96CF24]"
                    : "border border-[#0000004D]"
                } `}
                onClick={() => {
                  addComponent("linearScale");
                  setSelectedComponent("linearScale");
                }}
              >
                <img
                  src={
                    selectedComponent === "linearScale"
                      ? "./LinearScaleWhite.png"
                      : "./LinearScale.png"
                  }
                  alt="Linear Scale"
                  className="size-5"
                />
                <span
                  className={`text-base font-medium ${
                    selectedComponent === "linearScale"
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  Linear Scale
                </span>
              </button>
              <button
                className={`w-full h-[48px] rounded-xl flex items-center px-4 gap-4 cursor-pointer ${
                  selectedComponent === "rating"
                    ? "bg-gradient-to-r from-[#006838] to-[#96CF24]"
                    : "border border-[#0000004D]"
                } `}
                onClick={() => {
                  addComponent("rating");
                  setSelectedComponent("rating");
                }}
              >
                <img
                  src={
                    selectedComponent === "rating"
                      ? "./RatingsWhite.png"
                      : "./Ratings.png"
                  }
                  alt="Ratings"
                  className="size-5"
                />
                <span
                  className={`text-base font-medium ${
                    selectedComponent === "rating" ? "text-white" : "text-black"
                  }`}
                >
                  Rating
                </span>
              </button>
            </div>
          </div>

          <button
            className="bg-gradient-to-r from-[#006838] to-[#96CF24] w-[77%] rounded-xl h-[50px] text-center outline-none hover:shadow-md"
            onClick={handleSave}
          >
            <span className="text-white font-semibold text-base">Save</span>
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default CreateQuestionnaire;
