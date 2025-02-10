import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import CreateQuestionnaire from "./CreateQuestionnaire";
import { FormProvider } from "./FormContext";
import { useNavigate } from "react-router-dom";

const FormDashboard = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleViewForm = (id) => {
    navigate(`/view-form/${id}`); // Navigate to the ViewForm page
  };

  const getAllForms = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/forms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch forms");
      }

      const data = await response.json();
      setForms(data); // Store the fetched forms in state
    } catch (err) {
      setError(err.message); // Handle any error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllForms(); // Fetch all forms when the component mounts
  }, []); // Empty

  console.log("Form",forms)

  const [showCreateForm, setShowCreateForm] = useState(true);
  const [selectedButton, setSelectedButton] = useState("myPreConsultation");
  const itemsPerPage = 13;
  const [currentPage, setCurrentPage] = useState(1);

  // Extract the labels from all forms and their fields
  const formLabels = forms.flatMap((form) =>
    form.Fields
      ? form.Fields
          .filter((field) => field.type === "title") // Get only title fields
          .map((field) => ({ id: form.id, label: field.label })) // Use `id` instead of `_id`
      : []
  );
  
  const totalPages = Math.ceil(formLabels.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = formLabels.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleShowCreateForm = () => {
    setShowCreateForm(false);
  };

  console.log(currentItems);

  return (
    <div className="w-full mt-5 flex flex-col">
      {showCreateForm ? (
        <>
          <div className="flex justify-center items-center gap-4 mt-5">
            <button
              className={`rounded-lg p-2 font-semibold transition-colors duration-300 hover:shadow-lg ${
                selectedButton === "myPreConsultation"
                  ? "bg-[#04A118] text-white"
                  : "bg-transparent border border-[#0000004D] text-black"
              }`}
              onClick={() => setSelectedButton("myPreConsultation")}
            >
              <span className="font-semibold">
                My Pre-consultation Questionnaires
              </span>
            </button>
            <button
              className={`rounded-lg p-2 font-semibold transition-colors duration-300 hover:shadow-lg ${
                selectedButton === "academnutri"
                  ? "bg-[#04A118] text-white"
                  : "bg-transparent border border-[#0000004D] text-black"
              }`}
              onClick={() => setSelectedButton("academnutri")}
            >
              <span className="font-semibold">
                Acadenutri Pre-consultation Questionnaires
              </span>
            </button>
          </div>
          <div className="flex flex-col w-full items-center mt-5 mb-5">
            <div className="flex w-full justify-center gap-4 ">
              <div className="flex w-[45%]">
                <input
                  placeholder="Search by name"
                  className="border border-gray-300 rounded-l-2xl lg:p-4 p-2 h-12 w-[90%] outline-none"
                />
                <button className="bg-gradient-to-r from-[#006838] to-[#96CF24] text-white rounded-r-2xl flex items-center justify-center h-12 px-4 w-[10%]">
                  <Search className="w-5 h-5" />
                </button>
              </div>
              <button
                className="bg-gradient-to-r from-[#006838] to-[#96CF24] px-4 py-3 rounded-2xl w-[30%]"
                onClick={handleShowCreateForm}
              >
                <span className="font-semibold text-base text-white">
                  Add New Pre-consultation Questionnaire
                </span>
              </button>
            </div>
            <div className="w-[77%] rounded-2xl h-[537px] border border-[#0000004D] mt-5">
              {currentItems.map((item, index) => (
                <div key={index} className="h-[41px] w-full">
                  <div
                    className={`w-full py-[10px] pl-5 pr-[10px] h-full cursor-pointer ${
                      index % 2 !== 0 ? "bg-[#F9F9F9]" : "bg-transparent"
                    }`}
                    onClick={() => handleViewForm(item.id)} // Navigate to form view
                  >
                    <span className="text-black text-sm">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex w-full justify-center mt-5 gap-2">
              <button
                className="px-4 py-1 border border-[#4637374d] rounded-lg hover:shadow-lg"
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
              >
                First
              </button>
              <button
                className="px-4 py-1 border border-[#0000004D] rounded-lg hover:shadow-lg"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`px-3 py-1 border rounded-lg hover:shadow-lg ${
                    currentPage === i + 1
                      ? "bg-gradient-to-r from-[#006838] to-[#96CF24] text-white"
                      : "border-[#0000004D] text-[#808080]"
                  }`}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-4 py-1 border border-[#0000004D] rounded-lg hover:shadow-lg"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
              <button
                className="px-4 py-1 border border-[#0000004D] rounded-lg hover:shadow-lg"
                onClick={() => paginate(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <FormProvider>
            <CreateQuestionnaire />
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default FormDashboard;
