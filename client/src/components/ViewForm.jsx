import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Assuming you're using React Router
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Calendar as CalendarIcon } from "lucide-react";
const ViewForm = () => {
  const { id } = useParams(); // Get form ID from URL
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/forms/${id}`);
        if (!response.ok) throw new Error("Failed to fetch form");

        const data = await response.json();
        setForm(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(form);

  return (
    <div className="w-full mt-5 flex flex-col">
      <MaxWidthWrapper>
        <div className="flex justify-center items-center gap-4">
          <img src="/user.png" alt="user image" className="size-12" />
          <span className="font-semibold text-2xl">John Doe</span>
        </div>

        <div className="mt-4 flex w-[50%] flex-col mx-auto min-h-[300px] py-5 h-auto border border-[#00000004D] mb-5 rounded-xl">
          {form.fields.map((field) => (
            <div key={field._id} className="p-3">
              {field.type === "title" && (
                <div className="w-[93%] min-h-[67px] h-auto mx-auto rounded-xl border border-[#0000004D] px-4 py-5">
                  {field.label}
                </div>
              )}
              {field.type === "paragraph" && (
                <div className="w-[93%] min-h-[118px] h-auto mx-auto rounded-xl border-0 py-5 space-y-4">
                  <span className="font-medium text-xl">
                    {field.label}
                    {field.isRequired ? (
                      <span className="text-red-600"> *</span>
                    ) : (
                      <></>
                    )}
                  </span>
                </div>
              )}
              {field.type === "dateField" && (
                <div className="w-[93%] min-h-[88px] h-auto flex items-center mx-auto rounded-xl border border-[#0000004D] px-4">
                  <div className="flex gap-x-4 items-center w-full ">
                    <span className="font-medium text-xl">
                      {field.label}:
                      {field.isRequired ? (
                        <span className="text-red-600"> *</span>
                      ) : (
                        <></>
                      )}
                    </span>
                    <div className="flex px-4 py-3 justify-between w-[50%] border border-[#0000004D] rounded-xl cursor-pointer">
                      <CalendarIcon className="text-black size-5 ml-auto" />
                    </div>
                  </div>
                </div>
              )}
              {field.type === "numberField" && (
                <div className="w-[93%] min-h-[88px] h-auto flex items-center mx-auto rounded-xl border border-[#0000004D] px-4">
                  <div className="flex gap-x-4 items-center w-full ">
                    <span className="font-medium text-xl">
                      {field.label}
                      {field.isRequired ? (
                        <span className="text-red-600"> *</span>
                      ) : (
                        <></>
                      )}
                    </span>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      placeholder="3"
                      max={field.options[0].maxValue}
                      min={field.options[0].minValue}
                      className="flex-1 px-4 py-3 justify-between border border-[#0000004D] rounded-xl appearance-none"
                    />
                  </div>
                </div>
              )}
              {field.type === "shortAnswer" && (
                <div className="w-[93%] min-h-[118px] h-auto rounded-xl mx-auto border border-[#0000004D] px-4 py-5 space-y-4">
                  <span className="font-medium text-xl">
                    {field.label}
                    {field.isRequired ? (
                      <span className="text-red-600"> *</span>
                    ) : (
                      <></>
                    )}
                  </span>
                  <textarea className="w-full h-[62px] p-2 rounded-lg border border-[#0000004D] placeholder:text-[#0000004D] resize-none" />
                </div>
              )}
              {field.type === "longAnswer" && (
                <div className="w-[93%] min-h-[118px] h-auto rounded-xl mx-auto border border-[#0000004D] px-4 py-5 space-y-4">
                  <div className="flex gap-x-4 items-center w-full ">
                    <span className="font-medium text-xl">
                      {field.label}
                      {field.isRequired ? (
                        <span className="text-red-600"> *</span>
                      ) : (
                        <></>
                      )}
                    </span>
                    <textarea className="w-full h-[62px] p-2 rounded-lg border border-[#0000004D] placeholder:text-[#0000004D] resize-none" />
                  </div>
                </div>
              )}
              {field.type === "options" && (
                <div className="w-[93%] min-h-[67px] h-auto mx-auto rounded-xl border border-[#0000004D] px-4 py-5 space-y-2 flex flex-col">
                  <span className="font-medium text-xl">
                    {field.label}
                    {field.isRequired ? (
                      <span className="text-red-600"> *</span>
                    ) : (
                      <></>
                    )}
                  </span>
                  {field.options.length > 0 && (
                    <div className="mb-2">
                      <div className="flex flex-col gap-2 mt-2 w-full space-y-2">
                        {field.options[0].map((option, index) => (
                          <div className="bg-[#F9F9F9] py-2 px-4 rounded-[10px] gap-2 min-w-[125px] w-auto flex items-center gap-x-2">
                            <input type="radio" className="size-4" />
                            <span
                              key={index}
                              className="font-normal text-base text-black"
                            >
                              {option}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}{" "}
                </div>
              )}
              {field.type === "multipleChoice" && (
                <div className="w-[93%] min-h-[67px] h-auto mx-auto rounded-xl border border-[#0000004D] px-4 py-5 space-y-2 flex flex-col">
                <span className="font-medium text-xl">
                  {field.label}
                  {field.isRequired ? (
                    <span className="text-red-600"> *</span>
                  ) : (
                    <></>
                  )}
                </span>
                {field.options.length > 0 && (
                  <div className="mb-2">
                    <div className="flex flex-col gap-2 mt-2 w-full space-y-2">
                      {field.options[0].map((option, index) => (
                        <div className="bg-[#F9F9F9] py-2 px-4 rounded-[10px] gap-2 min-w-[125px] w-auto flex items-center gap-x-2">
                          <input type="checkbox" className="size-4" />
                          <span
                            key={index}
                            className="font-normal text-base text-black"
                          >
                            {option}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}{" "}
              </div>
              )}
              {field.type === "dropDownList" && (
                <div className="w-[93%] min-h-[67px] h-auto mx-auto rounded-xl border border-[#0000004D] px-4 py-5">
                  <span className="font-medium text-xl">
                    {field.label}
                    {field.isRequired ? (
                      <span className="text-red-600"> *</span>
                    ) : (
                      <></>
                    )}
                  </span>
                  {field.options.length > 0 && (
                    <div className="mb-2 flex-1 w-full">
                      <div className="flex gap-2 mt-2 w-full">
                        <select className=" w-full">
                          {field.options[0].map((option, index) => (
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
                  )}{" "}
                </div>
              )}
              {field.type === "linearScale" && (
                <div className="w-[93%] min-h-[118px] h-auto mx-auto rounded-xl border-0 py-5 space-y-4">
                  <span className="font-medium text-xl">
                    {field.label}
                    {field.isRequired}
                  </span>
                </div>
              )}
              {field.type === "rating" && (
                <div className="w-[93%] min-h-[88px] h-auto flex items-center mx-auto rounded-xl border border-[#0000004D] px-4">
                  <div className="flex gap-x-4 items-center w-full ">
                    <span className="font-medium text-xl">
                      {field.label}:
                      {field.isRequired ? (
                        <span className="text-red-600"> *</span>
                      ) : (
                        <></>
                      )}
                    </span>
                    {console.log(field)}
                    <div className="flex space-x-4 mt-2">
                      {field.options.map((option, index) => (
                        <div
                          key={index}
                          className={`flex flex-col items-center cursor-pointer }`}
                        >
                          <span className="text-2xl font-medium">
                            {option.number}
                          </span>
                          <span className="text-2xl">{option.icon}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default ViewForm;
